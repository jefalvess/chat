const express = require('express');
const mongoDB = require('../mongodb/mongoDB.js');

const router = express.Router();
const path = require('path');

router.get('/mensagens/:id', async  (req, res) => {
  
  let room = req.params.id; 

  let response = await mongoDB.query({ room: room });
     
  return res.status(200).json(response);
});

      // Pagina principal
      router.get('/', (req, res) => {

        const viewPage = path.join(__dirname, '../../public/views', 'score.html');
        res.status(200).sendFile(viewPage);
    
      });

module.exports = router;
