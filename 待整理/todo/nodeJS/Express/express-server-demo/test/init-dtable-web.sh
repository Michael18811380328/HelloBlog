#!/bin/bash
: ${PYTHON=python3}

: ${SEAHUB_TEST_USERNAME="test@seafiletest.com"}
: ${SEAHUB_TEST_PASSWORD="testtest"}
: ${SEAHUB_READ_ONLY_TEST_USERNAME="for-read-only@seafiletest.com"}
: ${SEAHUB_READ_ONLY_TEST_PASSWORD="testtest"}
: ${SEAHUB_TEST_ADMIN_USERNAME="admin@seafiletest.com"}
: ${SEAHUB_TEST_ADMIN_PASSWORD="adminadmin"}

export SEAHUB_TEST_USERNAME
export SEAHUB_TEST_PASSWORD
export SEAHUB_TEST_ADMIN_USERNAME
export SEAHUB_TEST_ADMIN_PASSWORD

set -e
if [[ ${TRAVIS} != "" ]]; then
    set -x
fi

set -x
SEAHUB_TESTSDIR=$(python -c "import os; print(os.path.dirname(os.path.realpath('$0')))")
SEAHUB_SRCDIR=$(dirname "${SEAHUB_TESTSDIR}")

export SEAHUB_LOG_DIR='/tmp/logs'
cd "$SEAHUB_SRCDIR"


###############################
# create database and two new users: an admin, and a normal user
###############################
git clone --depth=1 --branch=master https://e7b7266a7ef160af5e5201bd660c72c7ff497b3d@github.com/seafileltd/dtable-web /tmp/dtable-web/
pip install -r /tmp/dtable-web/requirements.txt
export PYTHONPATH="/usr/local/lib/python3.6/site-packages:/usr/local/lib/python3.6/dist-packages:/usr/lib/python3.6/site-packages:/usr/lib/python3.6/dist-packages:/tmp/dtable-web/thirdpart:${PYTHONPATH}"
export SEAFILE_CENTRAL_CONF_DIR="/tmp/dtable-web/"

cat >/tmp/dtable-web/dtable_web_settings.py <<EOF
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'dtable',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
FILE_SERVER_ROOT = 'http://127.0.0.1:8082'
DTABLE_PRIVATE_KEY = 'M@O8VWUb81YvmtWLHGB2I_V7di5-@0p(MF*GrE!sIws23F@C'

EOF

# init mysql
sudo service mysql start
echo "create database dtable" | mysql -uroot -proot
echo "use dtable; source /tmp/dtable-web/sql/mysql.sql;" | mysql -uroot -proot
$PYTHON /tmp/dtable-web/manage.py migrate --noinput --fake

# create normal user
$PYTHON -c "import os; import ccnet; ccnet_pipe_path = os.path.join ('${CCNET_CONF_DIR}', 'ccnet-rpc.sock'); ccnet_threaded_rpc = ccnet.CcnetThreadedRpcClient(ccnet_pipe_path); ccnet_threaded_rpc.add_emailuser('${SEAHUB_TEST_USERNAME}', '${SEAHUB_TEST_PASSWORD}', 0, 1);"
# create for-read-only user
$PYTHON -c "import os; import ccnet; ccnet_pipe_path = os.path.join ('${CCNET_CONF_DIR}', 'ccnet-rpc.sock'); ccnet_threaded_rpc = ccnet.CcnetThreadedRpcClient(ccnet_pipe_path); ccnet_threaded_rpc.add_emailuser('${SEAHUB_READ_ONLY_TEST_USERNAME}', '${SEAHUB_READ_ONLY_TEST_PASSWORD}', 0, 1);"
# create admin
$PYTHON -c "import os; import ccnet; ccnet_pipe_path = os.path.join ('${CCNET_CONF_DIR}', 'ccnet-rpc.sock'); ccnet_threaded_rpc = ccnet.CcnetThreadedRpcClient(ccnet_pipe_path); ccnet_threaded_rpc.add_emailuser('${SEAHUB_TEST_ADMIN_USERNAME}', '${SEAHUB_TEST_ADMIN_PASSWORD}', 1, 1);"

$PYTHON /tmp/dtable-web/manage.py runserver 127.0.0.1:8000 &
sleep 10
