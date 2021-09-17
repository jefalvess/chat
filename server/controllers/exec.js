const express = require('express');
const mongoDB = require('../mongodb/mongoDB.js');

const router = express.Router();

router.get('/mensagens/:id', async  (req, res) => {
  

  let room = req.params.id; 

  let response = await mongoDB.query({ room: room });
     


  return res.status(200).json(response);
});

module.exports = router;
