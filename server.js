const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

/**
 * 
 * https://developer.mongodb.com/quickstart/node-crud-tutorial
 * https://docs.mongodb.com/guides/server/drivers/
 * 
 */
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost';
var db = null;
MongoClient.connect(url, function(err, client) {
    db = client.db("db_medida_corporal");
});            

/**
 * 
 * Path da aplicação angular em produção
 * 
 */
//app.use(express.static(__dirname + '/dist/medida-corporal'));
//app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

/**
 * 
 * CORS
 * 
 */
app.use(function (req, res, next) {
    // Add permissão para um determinado domínio acessar esse servidor
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Add metodos permitidos para um determinado domínio acessar nesse servidor
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});



/**
 * 
 * inicio das API's 
 * 
 */
app.get('/medidas', (req, res) => {       
    findAllMedidas(req, res);    
});




async function findAllMedidas(req, res) {
    var collection = db.collection('Medida');
    var cursor = collection.find({});
    var medidas = new Array();    
    await cursor.forEach(function(result, err) {
        if (result !== null) {
            medidas.push(JSON.stringify(result));
        }
    });
    res.type('application/json');
    res.send({medidas});
}


const server = http.createServer(app);
server.listen(port, ()=> console.log('Rodando... porta: ', port));