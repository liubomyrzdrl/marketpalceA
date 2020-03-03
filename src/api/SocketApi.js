import socket from 'socket.io-client/lib/index';

class  SocketApi  {
    socket = null;

    init(token) {
        this.socket = socket('http://localhost:3000/', {
            query: {
                token,
            },
            // transports: ['websocket'],
        });

     this.socket.on('connect', () => {
         console.log('Connected');
         console.log({ socket });
     })
   }

handleMessages (handler) {
    this.socket.on('message', (message) => {
        handler(message);
     })
   }
};



export default new SocketApi();