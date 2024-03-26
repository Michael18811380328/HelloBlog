# -*- coding: utf-8 -*-
from seaserv import ccnet_api


def main():
    if not ccnet_api.get_emailuser('mike'):
        ccnet_api.add_emailuser('mike', '!', 0, 1)
    if not ccnet_api.get_emailuser('test@mike.com'):
        ccnet_api.add_emailuser('test@mike.com', 'testtest', 0, 1)
    if not ccnet_api.get_emailuser('admin@mike.com'):
        ccnet_api.add_emailuser('admin@mike.com', 'adminadmin', 1, 1)
    return


if __name__ == '__main__':
    main()
