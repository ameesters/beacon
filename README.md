[![Build Status](https://travis-ci.org/ameesters/beacon.svg?branch=master)](https://travis-ci.org/ameesters/beacon)

CLI Traffic analisis and mitigation tool.

I named this project _Beacon_ because:
> Classically, beacons were fires lit at well-known locations on hills or high places, used either as lighthouses for navigation at sea, or for signalling over land that enemy troops were approaching, in order to alert defenses. As signals, beacons are an ancient form of optical telegraphy, and were part of a relay league.

Plus, did i mention it rhymes with _Bacon_?

This project is in the discovery phase, making a inventory of features(feel free to suggest some in the issue tracker),
what npm modules to use, maybe even write our own if needed.

Right now we have the following dependencies:
 * node (tested on: 0.8.*, 0.10.*)
 * libpcap
 * node_pcap
 * mongodb
 * mongoose
 * ip

# Getting started:

Installing sources: For now you need to clone this repo, to `/usr/bin/`, like so:
`$ git clone https://github.com/ameesters/beacon.git /usr/bin/beacon/`

then we can install our npm dependencies:
    $ cd /usr/bin/beacon/
    $ npm install

then `mv` the file `beacon-collectord.service` to `/etc/systemd/system/`:

    $ mv /usr/bin/beacon/beacon-collectord.service /etc/systemd/system/

Then we need to make systemd know our new unit file like so:

    systemctl --system daemon-reload

And now we can finally enable and run our deamon:

    systemctl enable beacon-collectord.service
    systemctl start beacon-collectord.service