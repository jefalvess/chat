const mongoDB = require('./mongodb/mongoDB.js');

module.exports = function(app) {

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
    console.log('conected');

    // Criar usuario e salvar na rede
    socket.on('loggedin', async function(user) {
      clientSocketIds.push({ socket: socket, userId: user.user_id });
      connectedUsers = await connectedUsers.filter(
        item => item.user_id != user.user_id
      );
      connectedUsers.push({ ...user, socketId: socket.id });

      let arrayFiltrado = connectedUsers.map(function(item) {
        return item.user_id;
      });

      io.emit('updateUserList', [connectedUsers, arrayFiltrado]);
    });

    // criar uma sala de bate papo
    socket.on('create', async function(data) {
      // create room { room: 'jeffjeferson', withUserId: 'jeferson' }
      socket.join(data.room);
      console.log('Usuario cria a sala');
      let withSocket = await getSocketByUserId(data.withUserId);
      console.log(data.withUserId);
      console.log(withSocket.id);
      socket.broadcast.to(withSocket.id).emit('invite', { room: data });
    });

    // Quando o chat é aberto
    socket.on('joinRoom', async function(data) {
      // join Rom { room: { room: 'jeffjeferson', withUserId: 'jeferson' } }
      console.log('Usuario conforma criaçao da sala');
      socket.join(data.room.room);
    });

    // Chegou mensagem e mandar de volta
    socket.on('message', function(data) {
      // message { room: 'jeffjeferson', message: 'cha private ', from: 'jeff' }
      console.log('Mensagem enviada com sucesso');
      mongoDB.insertDocument([data]);
      socket.broadcast.to(data.room).emit('message', data);
    });

    // Quando alguem desconecta avisa todos os sockets
    socket.on('disconnect', async function() {
      connectedUsers = await connectedUsers.filter(
        item => item.socketId != socket.id
      );
      clientSocketIds = await clientSocketIds.filter(
        item => item.socket.id !== socket.id
      );

      let arrayFiltrado = connectedUsers.map(function(item) {
        return item.user_id;
      });

      io.emit('updateUserList', [connectedUsers, arrayFiltrado]);
    });
  });

  require('./routes')(app);

  server.listen(3000, function() {
    console.log('server started port', 3000);
  });


};
