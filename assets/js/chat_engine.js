class chatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail

        this.socket = io.connect('http://100.26.57.57:5001');
        
        if(this.userEmail){
            this.connectionHandler();
        };
    };

    connectionHandler(){
        let self = this;

        this.socket.on('connect', function(){
            console.log('Connection Established using sockets...')

            self.socket.emit('join_room',{
                user_email : self.userEmail,
                chatroom: 'codial'
            });

            self.socket.on('user_joined', function(data){
                console.log('user joined', data)
            });

        });

        $('#send-message').click(function(){
            let mssg = $('#chat-message-input').val();

            if(mssg != ''){
                self.socket.emit('send_message', {
                    message: mssg,
                    user_email: self.userEmail,
                    chatroom: 'codial'
                });
            };
        });

        self.socket.on('recieve-message', function(data){
            console.log('message received', data.message);

            let newMessage = $('<li>');

            let messageType = 'other-response';
            if(data.user_email == self.userEmail){
                messageType = 'self-response'
            }

            newMessage.append($('<span>',{
                'html': data.message
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
    }; /* connection handler closing */
}; /* Class Closing */