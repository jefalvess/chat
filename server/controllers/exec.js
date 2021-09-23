const express = require('express');
const mongoDB = require('../mongodb/mongoDB.js');
const jwt = require('../jwt');
const { validateUserToken } = require("./authenticator.js");
const upload = require('./upload')
const ObjectID = require('mongodb').ObjectID;
const path = require('path')

const uploadMiddleware = upload.uploadMiddleware;

const router = express.Router();
const fs = require('fs');

// Criar novo token de acesso
router.post('/token/user', validateUserToken,  async  (req, res) => {
  let token = await jwt.sign(JSON.stringify({ usuario: req.user.usuario,  usuarioChat: true }));
  return res.status(200).json( { status: true, usuario: req.user.usuario, token: token } );
});

// Mensagens do chat
router.post('/mensagens', validateUserToken,  async  (req, res) => {
  let room = req.body.room; 
  let response = await mongoDB.query({ room: room });
  return res.status(200).json(response);
});



// Criar novo usuario
router.post('/create/user', async  (req, res) => {
  
  if (!req.body.usuario) { 
    return res.status(200).json( { status: false, mensagem: 'Usuario invalido' } );
  }

  if (!req.body.senha) { 
    return res.status(200).json( { status: false, mensagem: 'Senha invalida' } );
  }

  if (!req.body.nome) { 
    return res.status(200).json( { status: false, mensagem: 'Nome invalido' } );
  }

  let buscarUsuario = await mongoDB.query({ usuario: req.body.usuario, type : "perfil" });

  if ( buscarUsuario.length > 0 ) { 
      if (buscarUsuario[0].usuario === req.body.usuario ) { 
        return res.status(200).json( { status: false, mensagem: 'Usuario ja existe ' } );
      }
  }

  let token = await jwt.sign(JSON.stringify({ usuario: req.body.usuario,  usuarioChat: true } ));


  

  // File destination.txt will be created or overwritten by default.
  fs.copyFile(path.join(__dirname,'/../uploads/example.png'), path.join(__dirname,'/../uploads/' + req.body.usuario + ".png") , (err) => {
    if (err) throw err;
    console.log('source.txt was copied to destination.txt');
  });

  let novoDocument = { 
    data: new Date (),
    senha : req.body.senha,
    usuario : req.body.usuario,
    nome  : req.body.nome,
    trabalho : '',
    education :  '',
    estadoCivil :  '',
    email  : '',
    type: "perfil",
    status: true
  }

  await mongoDB.insertDocument([ novoDocument])

  novoDocument ['token'] = token; 

  return res.status(200).json(novoDocument);

});

// Tentar login
router.post('/login/user', async  (req, res) => {


  console.log(req.body.usuario)
  console.log(req.body.senha)

  if (!req.body.usuario) { 
    return res.status(200).json( { status: false, mensagem: 'Usuario com erro' } );
  }

  if (!req.body.senha) { 
    return res.status(200).json( { status: false, mensagem: 'Senha com erro' } );
  }
  
  // Validar senha do usuario 
  let buscarUsuario = await mongoDB.query({ usuario: req.body.usuario, type : "perfil" });
  if ( buscarUsuario.length > 0 ) { 
      if (buscarUsuario[0].usuario === req.body.usuario && buscarUsuario[0].senha === req.body.senha ) { 
        let token = await jwt.sign(JSON.stringify({ usuario: req.body.usuario, usuarioChat: true }));
        return res.status(200).json( { status: true, usuario: buscarUsuario[0].usuario, token: token } );
      }
  }

  return res.status(200).json( { status: false, mensagem: 'Usuario ou senha nao com erros' } );

});



// Salvar um post 
router.post('/create/timeline', validateUserToken,  async  (req, res) => {
  
  let novoDocument = {
    status: true, 
    usuario : req.user.usuario,
    data: new Date (),
    type : "post",
    texto: req.body.texto,
    order: Date.now()
  }

  mongoDB.insertDocument([ novoDocument ])

  return res.status(200).json( { status: true, mensagem: 'salvo com sucesso' } );

});

// Buscar posto daquele usuario 
router.post('/buscar/timeline', validateUserToken,  async  (req, res) => {
  
  let buscarTimeline = await mongoDB.query({ type : "post" });

  buscarTimeline.sort((a, b) => (a.order < b.order ? 1 : -1));

  return res.status(200).json( { status: true, timelineData: buscarTimeline } );

});

// Deletar um post
router.post('/delete/post',  validateUserToken,  async  (req, res) => {
  console.log(req.body.id)
  mongoDB.deleteDocument( { _id : ObjectID(req.body.id) }  );
  return res.status(200).json( { status: true, mensagem: 'deletado com sucesso ' } );

});




// Puxar infomaçoes do perfil
router.post('/perfil',  validateUserToken,  async (req, res) => {
  let perfil = await mongoDB.query({ usuario: req.user.usuario, type : "perfil" });
  return res.status(200).json( { status: true, perfil: perfil[0] } );
});

// Editar info do perfil 
router.post('/perfil/edit',  validateUserToken,  async  (req, res) => {

  let perfil = await mongoDB.query({ usuario: req.user.usuario, type : "perfil" });

  let novoDocument = { 
      nome  : req.body.perfil.nome,
      trabalho : req.body.perfil.trabalho,
      education :  req.body.perfil.education,
      estadoCivil :  req.body.perfil.estadoCivil,
      email  :  req.body.perfil.email
    }
  
  let response = await mongoDB.updateDocument(perfil[0], novoDocument);
  
  return res.status(200).json( { status: true, mensagem: response } );

});

// Editar foto de perfil 
router.post('/upload/file', uploadMiddleware, validateUserToken, async  (req, res) => {
  let uploadErrors = upload.uploadErrors;
  return res.status(200).json({ status: true } );
});


module.exports = router;
