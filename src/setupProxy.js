const createProxy = require('http-proxy-middleware');


const proxy = createProxy({
   target: 'https://apiko-intensive-backend.herokuapp.com/',
   
    pathRewrite: {
        '^/ap': '',        
    },
    changeOrigin: true,
});
const proxyImage = createProxy({
    target: 'https://api.imgbb.com/1/upload/',
    
     pathRewrite: {
         '^/up': '',         
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
    app.use('/up', proxyImage);
    app.use('/socket.io', wsProxy);
};