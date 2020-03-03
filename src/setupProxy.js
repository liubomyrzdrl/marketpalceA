const createProxy = require('http-proxy-middleware');


const proxy = createProxy({
   target: 'https://apiko-intensive-backend.herokuapp.com/',
   
    pathRewrite: {
        '^/ap': '',
    },
    changeOrigin: true,
});

const wsProxy = createProxy({
    target: 'https://apiko-intensive-backend.herokuapp.com/',
    
    // pathRewrite: {
    //     '^/socket.io': '',
    // },
    changeOrigin: true,
    ws: true,
});

module.exports = (app) => {   
    app.use('/ap', proxy);
    app.use('/socket.io', wsProxy);
};