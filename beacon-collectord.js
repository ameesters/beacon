/**
 * Created by Alexander Meesters <a@m-id.me>
 *     iteration 1
 */

var pcap = require("pcap"),
    tcp_tracker = new pcap.TCP_tracker(),
    pcap_session = pcap.createSession("", "tcp");

var ip = require('ip');

var models = require('./models');

// some functions to make life easier:
function in_array(value, array) {
  return array.indexOf(value) > -1;
}


console.log("Listening on: " + pcap_session.device_name);

// what goes up:
tcp_tracker.on('http request complete', function(session, http){
    console.log(session.src + " > " + session.dst +": " + http.request.url);
});

// what goes down:
tcp_tracker.on('http response complete', function(session, http){

    var logThis = new models.realtimeLog({
        ipAddress: ip.toLong(session.src),
        request_method: http.request.method,
        request_url: http.request.url,
        content_type: http.response.headers['Content-Type']
    });

    logThis.save(function(err){
        if(err) return console.error(err);
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