var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beacon');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var realtimeLogSchema = mongoose.Schema({
	type: String,
	srcIpAddress: Number,
    destIpAddress: Number,
    requestMethod: String,
    requestUrl: String,
    contentType: String
});

var realtimeLog = mongoose.model('realtimeLog', realtimeLogSchema);

exports.realtimeLog = realtimeLog;