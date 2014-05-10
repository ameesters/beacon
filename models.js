var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beacon');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var realtimeLogSchema = mongoose.Schema({
    ipAddress: Number,
    request_method: String,
    request_url: String,
    content_type: String
});


var realtimeLog = mongoose.model('realtimeLog', realtimeLogSchema);

/*
* As a guideline, if the relationship between exports and module.exports seems like magic to you,
* ignore exports and only use module.exports.
*/
exports.realtimeLog = realtimeLog;