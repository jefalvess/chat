const express = require('express');
const mongoDB = require('../mongodb/mongoDB.js');

const router = express.Router();

router.get('/mensagens/:id', async  (req, res) => {
  let room = req.params.id; 
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

  let novoDocument = {
    status: true, 
    usuario : req.body.usuario,
    senha : req.body.senha,
    data: new Date ()
  }

  let createUser = await mongoDB.insertDocument([ novoDocument])

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
        return res.status(200).json( { status: true, usuario: buscarUsuario[0].usuario } );
      }
  }

  return res.status(200).json( { status: false, mensagem: 'Usuario ou senha nao com erros' } );

});

module.exports = router;
