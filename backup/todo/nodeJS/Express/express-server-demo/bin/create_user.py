# -*- coding: utf-8 -*-
from seaserv import ccnet_api


def main():
    if not ccnet_api.get_emailuser('dtable@seafile'):
        ccnet_api.add_emailuser('dtable@seafile', '!', 0, 1)
    if not ccnet_api.get_emailuser('test@seafiletest.com'):
        ccnet_api.add_emailuser('test@seafiletest.com', 'testtest', 0, 1)
    if not ccnet_api.get_emailuser('admin@seafiletest.com'):
        ccnet_api.add_emailuser('admin@seafiletest.com', 'adminadmin', 1, 1)
    return


if __name__ == '__main__':
    main()
