const app = require('./app');
const http = require('http');
const port = process.env.PORT || 8000

const server = http.createServer(app);

server.listen(port, process.env.IP, () => {
    console.log(`App is running on port ${port}`)
})