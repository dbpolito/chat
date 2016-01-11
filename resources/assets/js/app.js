var socket = io('http://homestead.app:6001');

console.log('started');

socket.on('connection', function(socket){
    console.log('connected');

});
socket.on('message:App\\Events\\MessageCreated', function(data) {
    var message = data.message;

    console.log('message:', message);
});
