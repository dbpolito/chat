var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var middleware = require('socketio-wildcard')();

var Redis = require('ioredis');
var redis = new Redis();
var pub = new Redis();

io.use(middleware);

app.listen(6001, function() {
    console.log('Server is running!');
});

function handler(req, res) {
    res.writeHead(200);
    res.end('');
}

io.on('connection', function(socket) {
    socket.on('*', function(message) {
        var channelEvent = message.data[0].split(':'),
            channel = channelEvent[0],
            event = channelEvent[1],
            data = {
                event: event,
                data: message.data[1],
            };

        pub.publish(channel, JSON.stringify(data));
    });
});

redis.psubscribe('*', function(err, count) {
    //
});

redis.on('pmessage', function(subscribed, channel, message) {
    message = JSON.parse(message);
    io.emit(channel + ':' + message.event, message.data);
    console.log('Emitted: ', channel + ':' + message.event, message.data);
});
