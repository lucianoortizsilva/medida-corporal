const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(__dirname + '/dist/medida-corporal'));

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

/**
 * 
 * Endpoint Hello World
 * 
 */
app.get('/helloworld', (req, res) => {
    res.type('application/json');
    res.send('{peso: 82.2}');
});

const server = http.createServer(app);

server.listen(port, ()=> console.log('Rodando... porta: ', port));