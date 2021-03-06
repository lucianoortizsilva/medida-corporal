const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
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
 var mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

 const host = process.env.DB_HOST || 'localhost';
 const port_db = process.env.DB_PORT || 27017;
 const username = process.env.DB_USERNAME || '';
 const password = process.env.DB_PASSWORD || '';
 const db_name = process.env.DB_NAME || 'db_medida_corporal';

 var uri = null;
 var db = null;
 
 if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
    uri = 'mongodb://' + username + ':' + password + '@' + host + ':' + port_db + '/' + db_name;
 } else {
    uri = 'mongodb://' + host + ':' + port_db + '/' + db_name;
 }
 
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        db = mongoose.connection;
        console.log("Conexão com mongo DB ok!");
    }).catch((err) => {
        console.log("ERRO ao se conectar com Mongo DB: ", err);
});

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

app.get('/medida-corporal/medidas/:email', (req, res) => {   
    findAllMedidas(req, res);    
});

app.get('/medida-corporal/medidas/:email/atual', (req, res) => { 
    buscarUltimaMedidaRealizada(req, res);    
});

app.get('/medida-corporal/usuarios/:email', (req, res) => { 
    buscarUsuarioPorEmail(req, res);    
});

app.delete('/medida-corporal/medidas/:id', (req, res) => {   
    deleteMedida(req, res);    
});

app.post('/medida-corporal/usuarios', (req, res) => {     
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

app.post('/medida-corporal/medidas', (req, res) => {     
    insertMedida(req, res);
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
    var email = req.params.email;  
    db.collection('Medida')   
      .find({ 'usuario.email' : email})
      .sort({dtCriacao: -1})
      .maxTimeMS(5000)
      .toArray()
      .then(medidas => {
        if (medidas === undefined || medidas === null || medidas.length === 0) {
            res.status(404);
            res.type('application/json');
            res.send({ message : 'Não Encontrado!'});
        } else {
            res.status(200);
            res.type('application/json');
            res.send(medidas);
        }
    })
      .catch(err => {
        console.error(err);
        res.status(500);
        res.type('application/json');
        res.send({ message : 'Erro inesperado!'});
    }); 
}

async function insertMedida(req, res) {

    const email = req.body.usuario.email;
    const dtCriacao = req.body.dtCriacao;
    const query = { $and: [{ 'dtCriacao' : dtCriacao}, { "usuario.email" : email}]};    
    db.collection('Medida')
        .findOne(query)
        .then(result => {
            if(result) {
                res.status(409);
                res.type('application/json');
                res.send({ 'message' : 'Data Duplicada!'});
            } else {
                db.collection('Medida').insertOne(req.body);    
                res.status(201);
                res.type('application/json');
                res.send({'message' : 'Cadastro ok!'});
            }
    }).catch(err => {
        res.status(500);
        res.type('application/json');
        res.send({ message : 'Erro inesperado!'});
    });    
}

async function insertUsuario(req, res) {
    await db.collection('Usuario').insertOne(
        req.body
    );    
}

async function deleteMedida(req, res) {
        const id = req.params.id;
        db.collection('Medida').deleteOne({ '_id': ObjectID(id) })
            .then(result => {
                console.log('result: ', result);
                console.log('result.deletedCount: ', result.deletedCount);
                if(result.deletedCount === 1) {
                    res.status(200);
                    res.type('application/json');
                    res.send({ message : 'Excluído!'});
                } else {
                    res.type('application/json');
                    res.send({ message : 'Não Encontrado!'});
                    res.status(404);
                }
        }).catch(err => {
            res.status(500);
            res.type('application/json');
            res.send({ message : 'Erro inesperado!'});
        });    
}

async function buscarUsuarioPorEmail(req, res) {
    var email = req.params.email; 
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

server.listen(port, ()=> console.log('Aplicação rodando na porta: ', port));