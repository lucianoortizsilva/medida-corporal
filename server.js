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
    res.setHeader('Access-Control-Allow-Origin', 'https://localhost:4200');
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

app.get('/medidas/:email/atual', (req, res) => { 
    buscarUltimaMedidaRealizada(req, res);    
});

app.get('/usuarios/:email', (req, res) => { 
    buscarUsuarioPorEmail(req, res);    
});

app.post('/usuarios', (req, res) => {     
    try {
        insertUsuario(req, res);
        res.status(201);
        res.type('application/json');
        res.send({'message' : 'Cadastro ok!'});
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});

app.post('/medidas', (req, res) => {     
    try {
        insertMedida(req, res);
        res.status(201);
        res.type('application/json');
        res.send({'message' : 'Cadastro ok!'});
    } catch (error) {
        res.status(500);
        res.send(error);
    }
});



async function buscarUltimaMedidaRealizada(req, res) {
    var email = req.params.email;  
    db.collection('Medida')   
      .find({ 'usuario.email' : email})
      .sort({dtCriacao: -1})
      .limit(1)
      .maxTimeMS(5000)
      .toArray()
      .then(medidas => {
        const medida = medidas[0];
        if (medida === undefined) {
            res.status(404);
            res.type('application/json');
            res.send({ message : 'Não encontrado!'});
        } else {
            res.status(200);
            res.type('application/json');
            res.send(medida);
        }
    })
      .catch(err => {
        console.error(err);
        res.status(500);
        res.type('application/json');
        res.send({ message : 'Erro inesperado!'});
    }); 
}



async function findAllMedidas(req, res) {    
    var collection = db.collection('Medida');
    var cursor = collection.find({}).sort( { dtCriacao: 1 } );
    var medidas = new Array();    
    await cursor.forEach(function(result, err) {
        if (result === null) {
            res.status(404);
            res.type('application/json');
            res.send({ message : 'Não encontrado!'});
        } else {
            medidas.push(result);
        }
    });
    res.status(200);
    res.type('application/json');
    res.send(medidas);
}

async function insertMedida(req, res) {
    await db.collection('Medida').insertOne(
        req.body
    );    
}

async function insertUsuario(req, res) {
    await db.collection('Usuario').insertOne(
        req.body
    );    
}

async function buscarUsuarioPorEmail(req, res) {
    var email = req.params.email; 
    console.log('Usuario pesquisado: ', email);
    db.collection('Usuario')   
      .find({ 'email' : email})
      .limit(1)
      .maxTimeMS(5000)
      .toArray()
      .then(usuarios => {
        const usuario = usuarios[0];
        if (usuario === undefined) {
            res.status(404);
            res.type('application/json');
            res.send({ message : 'Não encontrado!'});
        } else {
            res.status(200);
            res.type('application/json');
            res.send(usuario);
        }
    })
      .catch(err => {
        console.error(err);
        res.status(500);
        res.type('application/json');
        res.send({ message : 'Erro inesperado!'});
    }); 
}


const server = http.createServer(app);

server.listen(port, ()=> console.log('Rodando... porta: ', port));