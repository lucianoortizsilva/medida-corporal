const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;
bodyParser = require('body-parser');

/**
  * Path da aplicação angular em produção
  */
app.use(express.static(__dirname + '/dist/medida-corporal'));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * CORS
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

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

app.get('/medidas', (req, res) => {   
    findAllMedidas(req, res);    
});

app.get('/medidas/:codigo', (req, res) => { 
    findMedidas(req, res);    
});



async function findMedidas(req, res) {
    var codigo = req.params.codigo;  
    var collection = db.collection('Medida');   
    var cursor = collection.find({
        'codigo' : { $eq : Number(codigo) } 
    });       
    var medidas = new Array();    
    await cursor.forEach(function(result, err) {
        if (result !== null) {
            medidas.push(result);
        }
    });
    res.type('application/json');
    res.send(medidas);
}



async function findAllMedidas(req, res) {    
    var collection = db.collection('Medida');
    var cursor = collection.find({});
    var medidas = new Array();    
    await cursor.forEach(function(result, err) {
        if (result !== null) {
            medidas.push(result);
        }
    });
    res.status(200);
    res.type('application/json');
    res.send(medidas);
}



async function save(req, res) {
    await db.collection('Medida').insertMany([
        {
            dtCriacao: '2019-10-01T20:48:52.565Z',
            codigo: 1,
            descricao: 'Peso',
            valor: 83.3
        },          
        {
            dtCriacao: '2019-10-01T20:48:52.565Z',
            codigo: 2,
            descricao: 'Tórax',
            valor: 104
        },                  
        {
            dtCriacao: '2019-11-01T20:48:52.565Z',
            codigo: 1,
            descricao: 'Peso',
            valor: 82.3
        },          
        {
            dtCriacao: '2019-11-01T20:48:52.565Z',
            codigo: 2,
            descricao: 'Tórax',
            valor: 105
        },                  
        {
            dtCriacao: '2019-12-01T20:48:52.565Z',
            codigo: 1,
            descricao: 'Peso',
            valor: 81.3
        },          
        {
            dtCriacao: '2019-12-01T20:48:52.565Z',
            codigo: 2,
            descricao: 'Tórax',
            valor: 108
        },
        {
            dtCriacao: '2020-01-01T20:48:52.565Z',
            codigo: 1,
            descricao: 'Peso',
            valor: 80.1
        },          
        {
            dtCriacao: '2020-01-01T20:48:52.565Z',
            codigo: 2,
            descricao: 'Tórax',
            valor: 106.5
        },                                    
    ]);    
}

const server = http.createServer(app);

server.listen(port, ()=> console.log('Rodando... porta: ', port));