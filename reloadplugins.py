#!/usr/bin/env python

import time
import socket
import fcntl
import struct

from six.moves import urllib


def get_interface_ipaddress(network):
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    return socket.inet_ntoa(fcntl.ioctl(
        s.fileno(),
        0x8915,  # SIOCGIFADDR
        struct.pack("256s", network[:15])
    )[20:24])

print("Current IP: " + get_interface_ipaddress("wlan0"))


# to reload ola plugins with "localhost:9090/reload"
OLA_IP = get_interface_ipaddress("wlan0")
url = "http://" + OLA_IP + ":9090/reload"
resp = urllib.request.urlopen (url)

print ("OLA Plugins:", resp.read().decode())

resp.close()
exit (0)

