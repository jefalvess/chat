const express = require('express');
const mongoDB = require('../mongodb/mongoDB.js');
const jwt = require('../jwt');
const { validateUserToken } = require("./authenticator.js");

const router = express.Router();

router.post('/token/user', validateUserToken,  async  (req, res) => {
  let token = await jwt.sign(JSON.stringify({ usuario: req.user.usuario, usuarioChat: true }));
  return res.status(200).json( { status: true, usuario: req.user.usuario, token: token } );

});

router.post('/mensagens', validateUserToken,  async  (req, res) => {
  console.log(req.body)
  let room = req.body.room; 
  let response = await mongoDB.query({ room: room });
  return res.status(200).json(response);
});


router.post('/create/user', async  (req, res) => {

  if (!req.body.usuario) { 
    return res.status(200).json( { status: false, mensagem: 'Usuario com erro' } );
  }

  if (!req.body.senha) { 
    return res.status(200).json( { status: false, mensagem: 'Senha com erro' } );
  }

  let buscarUsuario = await mongoDB.query({ usuario: req.body.usuario });

  if ( buscarUsuario.length > 0 ) { 
      if (buscarUsuario[0].usuario === req.body.usuario ) { 
        return res.status(200).json( { status: false, mensagem: 'Usuario ja existe ' } );

      }
  }

  let token = await jwt.sign(JSON.stringify({ usuario: req.body.usuario, usuarioChat: true } ));

  let novoDocument = {
    status: true, 
    usuario : req.body.usuario,
    senha : req.body.senha,
    data: new Date (),
  }

  await mongoDB.insertDocument([ novoDocument])

  novoDocument ['token'] = token; 

  return res.status(200).json(novoDocument);

});


router.post('/login/user', async  (req, res) => {

  if (!req.body.usuario) { 
    return res.status(200).json( { status: false, mensagem: 'Usuario com erro' } );
  }

  if (!req.body.senha) { 
    return res.status(200).json( { status: false, mensagem: 'Senha com erro' } );
  }
  
  // Validar senha do usuario 
  let buscarUsuario = await mongoDB.query({ usuario: req.body.usuario });
  if ( buscarUsuario.length > 0 ) { 
      if (buscarUsuario[0].usuario === req.body.usuario && buscarUsuario[0].senha === req.body.senha ) { 
        let token = await jwt.sign(JSON.stringify({ usuario: req.body.usuario, usuarioChat: true }));
        return res.status(200).json( { status: true, usuario: buscarUsuario[0].usuario, token: token } );
      }
  }

  return res.status(200).json( { status: false, mensagem: 'Usuario ou senha nao com erros' } );

});

module.exports = router;
