# RaspberryPi_DMX-Light
Web-Interface for a DMX studio light driven by a RaspberryPi

The DMX-light is controlled by the [Open Lighting Architecture (OLA)](https://www.openlighting.org/). For the Web-Interface I am using the [jquery-wheelcolorpicker](https://github.com/fujaru/jquery-wheelcolorpicker) from [fujaru](https://github.com/fujaru). With that you can controll the brightness of the light. You can also create and save presets for later use.

<table align=center>
    <tr>
        <td>Desktop</td>
        <td>Mobile</td>
    </tr>
    <tr>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/desktop.png" width=480></td>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/mobile.png" width=250></td>
    </tr>
</table>


## Components
- [DMX-Licht](https://amzn.to/359NkA3)
- [DMX zu USB Adapter](https://amzn.to/31N9SEu)
- [RaspberryPi](https://amzn.to/3jB3ZjN)


## Setup
The setup for the DMX-light is pretty simple, because you only have to connect the USB plug of the adapter with the Raspberry-Pi and the DMX-cable with the lamp.

<table align=center>
    <tr>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/setup.png" width=480></td>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/entry.png" width=680></td>
    </tr>
</table>


## Configuration / Installation
As an operating system I have used [Raspbian](https://www.raspberrypi.org/downloads/raspbian/). You should also configure a static IP-Adress from you router for your Raspberry-Pi.

Installing the Open Lighting Architecture (OLA):
```shell
sudo apt-get install ola
```

### Autostart of OLA
Open the file "rc.local":
```shell
sudo nano /etc/rc.local
```

And add the following line at the end of the file before "exit":
```
su pi -c olad
```

<table align=center>
    <tr>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/etc-rc_local.png" width=480></td>
    </tr>
</table>

### Embedding the FTDI-adapter
Because I am using an FTDI-adapter I will have to add a rule inside of the file "10-local-rpi.rules".

```shell
cd /lib/udev/rules.d
sudo nano 10-local-rpi.rules
```

The rule that has to be added at the end of the file:
```
# udev rules for ftdi devices
SUBSYSTEM=="usb|usb_device", ACTION=="add", ATTRS{idVendor}=="0403", ATTRS{idProduct}=="6001", GROUP="plugdev"
```

After that you have to reboot the system (sudo reboot).

### Configuring OLA plugins
You can configure the OLA plugins with the OLA-Web-Interface at the port :9090 (e.g.: 192.168.0.128:9090). Once you are on the website you will have to go to the new UI (at the bottom of the site "New UI (Beta)"). Then turn on the "FTDI USB DMX" plugin and turn off the "Serial USB" and the "Enttec Open DMX" plugin.

<table align=center>
    <tr>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/plugins.png" width=480></td>
    </tr>
</table>

### Universe
Now you will have to setup a "universe", to control the lamp. This can be done via the old UI Web-Interface.
The command "ola_dev_info" can also show all connected devices.

<table align=center>
    <tr>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/addUniverse.png" width=480></td>
    </tr>
    <tr>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/addUniversePorts.png" width=480></td>
    </tr>
</table>


## Tests
Now you can enter the universe via the Web-Interface and go to the DMX-Console. There you can manually adjust all the available channels.

<table align=center>
    <tr>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/dmxConsole.png" width=480></td>
    </tr>
</table>

Or in the SSH console (e.g.: brightness(128), red(255), green(255), blue(200)):
```shell
ola_streaming_client  --universe 1  --dmx 128,255,255,200
```

If this test was successful, it should also be possible send a curl request via CMD (Windows).
```Dos
curl -d u=1 -d d=255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0 "http://192.168.0.128:9090/set_dmx"
```
<table align=center>
    <tr>
        <td><img src="https://richardkrikler.com/images/raspberryPiDmxLight/images/curlExample.png" width=480></td>
    </tr>
</table>


## My Web-Interface
Clone my repository into the folder "/var/www/html".
```shell
sudo git clone https://github.com/RichardKrikler/RaspberryPi_DMX-Light
```

Permissions for the file "presets.txt" (global read & write).
```shell
sudo chmod 06 /var/www/html/Presets/presets.txt
```

That's it. Now you can easily get to the Interface via the IP-Adress.
