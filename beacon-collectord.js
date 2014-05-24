#!/usr/bin/env node

/**
 * Created by Alexander Meesters <a@m-id.me>
 *     iteration 11
 */

var pcap = require("pcap"),
    tcp_tracker = new pcap.TCP_tracker(),
    pcap_session = pcap.createSession("", "tcp");

var ip = require('ip');
var models = require('./models');

console.log("Listening on: " + pcap_session.device_name);

// what goes up:
tcp_tracker.on('http request complete', function(session, http){

    var logThis = new models.realtimeLog({
        type: 'request',
        srcIpAddress: ip.toLong(session.src),
        destIpAddress: ip.toLong(session.dst),
        requestMethod: http.request.method,
        requestUrl: http.request.url,
        contentType: 'N/A'
    });

    console.log(session.src + " > " + session.dst +": " + http.request.url);
});

// what goes down:
tcp_tracker.on('http response complete', function(session, http){

    var logThis = new models.realtimeLog({
        type: 'response',
        srcIpAddress: ip.toLong(session.src),
        destIpAddress: ip.toLong(session.dst),
        requestMethod: http.request.method,
        requestUrl: http.request.url,
        contentType: http.response.headers['Content-Type']
    });

    logThis.save(function(err) {
        if(err) return console.log(err);
    });

    console.log(session.src + " < " + session.dst + ": " + http.request.url + ", " + http.response.headers['Content-Type']);

});

pcap_session.on('packet', function(raw_packet){
    var packet = pcap.decode.packet(raw_packet);
    tcp_tracker.track_packet(packet);
});

// Check for pcap dropped packets on an interval
setInterval(function () {
    var stats = pcap_session.stats();
    if (stats.ps_drop > 0) {
        console.log(ANSI("pcap dropped packets, need larger buffer or less work to do: " + util.inspect(stats), "bold"));
    }
}, 2000);