var socket = io('http://homestead.app:6001'),
    messages = new Vue({
        el: '#messages',

        data: {
            message: '',
            messages: [],
        },

        methods: {
            send: function() {
                var message = {
                    from_user: {
                        name: 'client',
                    },
                    from_user_id: 1,
                    to_user_id: 1,
                    message: this.message,
                };

                socket.emit('message:App\\Events\\MessageCreate', message);
                this.message = '';
            },

            add: function(message) {
                this.messages.push(message);
            }
        },

        created: function() {
            socket.on('message:App\\Events\\MessageCreated', function(data) {
                var message = data.message;

                this.add(message);
            }.bind(this));
        },
    });
