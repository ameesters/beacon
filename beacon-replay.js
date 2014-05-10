var ip = require('ip');
var model = require('./models');

model.realtimeLog.find({}, function(err, log){
    var count = log.length;

    for(var i = 0; i < count; ++i){
        count--;
        console.log(ip.fromLong(log[i].ipAddress) + log[i].request_url);
    }
});