const mongoDB = require('./mongodb/mongoDB.js');

module.exports = function (app) {

  const http = require('http');
  const server = http.createServer(app);
  const { Server } = require("socket.io");
  const io = new Server(server);

  let clientSocketIds = [];
  // lista de usuario ativo
  let connectedUsers = [];

  const getSocketByUserId = userId => {
    let socket = '';
    for (let i = 0; i < clientSocketIds.length; i++) {
      if (clientSocketIds[i].userId == userId) {
        socket = clientSocketIds[i].socket;
        break;
      }
    }
    return socket;
  };

  /* socket function starts */
  io.on('connection', socket => {

    // Criar usuario e salvar na rede
    socket.on('loggedin', async function (user) {
      clientSocketIds.push({ socket: socket, userId: user.user_id });
      connectedUsers = await connectedUsers.filter(
        item => item.user_id != user.user_id
      );
      connectedUsers.push({ ...user, socketId: socket.id });

      let arrayFiltrado = connectedUsers.map(function (item) {
        return item.user_id;
      });

      io.emit('updateUserList', [connectedUsers, arrayFiltrado]);
    });

    // criar uma sala de bate papo
    socket.on('create', async function (data) {
      // create room { room: 'jeffjeferson', withUserId: 'jeferson' }
      socket.join(data.room);
      let withSocket = await getSocketByUserId(data.withUserId);
      socket.broadcast.to(withSocket.id).emit('invite', { room: data });
    });

    // Quando o chat é aberto
    socket.on('joinRoom', async function (data) {
      socket.join(data.room.room);
    });

    // Chegou mensagem e mandar de volta
    socket.on('message', async function (data) {

      data["order"] = Date.now();
      socket.broadcast.to(data.room).emit('message', data);
      
      // Salvar mensagem 
      mongoDB.insertDocument([data]);

      
      let response = await mongoDB.query({ room: data.room, usuario: data.from, type: 'chats', });

      if (response.length === 0) {

        mongoDB.insertDocument([
          { type: 'chats', room: data.room, usuario: data.from, chatcom: data.withUserId, ultimaMensagem: data.message, order: Date.now() },
          { type: 'chats', room: data.room, usuario: data.withUserId, chatcom: data.from, ultimaMensagem: data.message, order: Date.now() }
        ]);
      
      } else {

        let novoDocument = {
          order: Date.now(),
          ultimaMensagem: data.message
        } 

        let responseChatCom = await mongoDB.query({ room: data.room, usuario: data.withUserId, type: 'chats', });

        await mongoDB.updateDocument(response[0], novoDocument);
        await mongoDB.updateDocument(responseChatCom[0], novoDocument);

      }

    });

    // Quando alguem desconecta avisa todos os sockets
    socket.on('disconnect', async function () {
      connectedUsers = await connectedUsers.filter(
        item => item.socketId != socket.id
      );
      clientSocketIds = await clientSocketIds.filter(
        item => item.socket.id !== socket.id
      );

      let arrayFiltrado = connectedUsers.map(function (item) {
        return item.user_id;
      });

      io.emit('updateUserList', [connectedUsers, arrayFiltrado]);
    });
  });

  require('./routes')(app);

  server.listen(process.env.PORT, function () {
    console.log('server started port', process.env.PORT);
  });


};
