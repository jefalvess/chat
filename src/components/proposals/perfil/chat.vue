<template>
  <div
    class="bx--grid"
  >
    <div v-if="loadingPage.length === 1"> 
      <p style="font-size: 22px;">Nenhum usuario conectado  </p>
    </div> 

    <div v-else class="bx--row"> 
      <p style="font-size: 22px;">Usuario conectados agora  {{ modalEdit }} </p>
    </div> 
    <!-- Lista de usuario conectados -->
    <div class="bx--row" v-for="user in loadingPage" v-bind:key="user.socketId">
      <p
        v-if="user.user_id !== modalEdit"
        v-bind:id="user.user_id"
        v-on:click="createRoom(user.user_id)"
        style="padding: 0.5rem;"
      >
        {{ user.user_id }}
      </p>
    </div>
    <!-- Chat -->
    <div
      class="bx--row"
      v-bind:key="room"
      v-for="(room, id) in listRoomComputed"
      style="width: 17rem;border: 1px solid black;min-height: 17.5rem;max-height: 17.5rem; margin-top: 2rem;"
    >
      <div class="bx--col">
        <div class="bx--row">
          <div style="width: 85%;" lass="bx--col--lg">ID CHAT : {{ room }}</div>
          <div @click="minimizeChat(room, id)" class="bx--col" style="cursor: pointer" >
            x
          </div>
        </div>

        <!-- Chat -->
        <div
          class="bx--row"
          style="overflow: auto; flex-direction: column-reverse; min-height: 15rem; max-height: 15rem;"
        >
          <div class="bx--col">
            <div
              class="bx--row"
              v-for="(message, index) in messages"
              v-bind:key="index"
            >
              <div v-if="room === message.room">
                <div>
                  <span class="message"
                    >{{ message.from }}: {{ message.message }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Botao de enviar mensagem -->
        <div class="bx--row">
          <div class="chat-window" id="${room}">
            <div class="body"></div>
            <div class="footer">
              <input
                style="width: 14.7rem;"
                type="text"
                v-model="mensagemParticular[id]"
                class="messageText"
                v-on:keyup.enter="sendMessage(room, id)"
              />
              <button @click="sendMessage(room, id)">GO</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
// eslint-disable-next-line no-undef
const socket = io({ transports: ['websocket'] });
console.log('criar socket.io');

export default {
  name: 'chat',
  data() {
    return {
      messages: [],
      mensagemParticular: [],
      listRoom: [],
      chats: [],
      reconectar: []
    };
  },
  computed: {
    ...mapGetters(['loadingPage', 'modalEdit', 'cookieUserJson']),
    listRoomComputed: {
      get() {
        return this.listRoom;
      }
    }
  },
  methods: {
    ...mapActions(['setLoadingPage', 'setModalEdit']),
    // Criar sala de bate papo
    async createRoom(id) {
      console.log('Abri chat ');
      if (this.chats.indexOf(id) === -1) {
        this.chats.push(id);
        let loggedInUser = this.modalEdit;
        let room = '';
        if (this.modalEdit > id) {
          room = this.modalEdit + id;
        } else {
          room = id + this.modalEdit;
        }

        this.listRoom.push(room);
        this.mensagemParticular.push('');
        let payload = { token: this.cookieUserJson, room :  room }
        let response = await axios.post('/api/mensagens', payload );

        if (response.data.length > 0) {
          this.messages = this.messages.concat(response.data);
        }

        socket.emit('create', {
          room: room,
          userId: loggedInUser.userId,
          withUserId: id,
          user: this.modalEdit
        });
      }
    },
    sendMessage(room, index) {
      console.log('Enviar mensagem ');
      let loggedInUser = this.modalEdit;
      let message = this.mensagemParticular[index];
      this.mensagemParticular[index] = '';

      socket.emit('message', {
        room: room,
        message: message,
        from: loggedInUser
      });

      this.messages.push({
        room: room,
        message: message,
        from: loggedInUser
      });
    },
    minimizeChat(room, index) {
      this.listRoom.splice(index, 1);
      this.chats.splice(index, 1);
      this.messages = this.messages.filter(item => item.room !== room);
    },
    criarUsuario() {
      if (this.modalEdit !== '') {
        socket.emit('loggedin', { user_id: this.modalEdit });
      } 
      
    }
  },
  mounted() {
    this.criarUsuario();
  },
  created: function() {

    // criar chat
    socket.on('updateUserList', response => {
      console.log('atualiaçao de usuarios');

      // CHat que estava on e preciso reabrir conexao
      for (let i = 0; i < this.reconectar.length; i++) {
        // Se o chat aberto nao existir aqui
        if (response[1].indexOf(this.reconectar[i]) === 1) {
          console.log('preciso reconectar esse chat');

          let room = '';
          if (this.modalEdit > this.chats[i]) {
            room = this.modalEdit + this.chats[i];
          } else {
            room = this.chats[i] + this.modalEdit;
          }

          let index = this.chats.indexOf(this.reconectar[i]);
          this.minimizeChat(room, index);
          this.createRoom(this.reconectar[i]);
        }
      }

      // Avisar se alguem ficar of e eu tenho chat aberto;
      for (let i = 0; i < this.chats.length; i++) {
        // Se o chat aberto nao existir aqui
        if (response[1].indexOf(this.chats[i]) === -1) {
          let room = '';
          if (this.modalEdit > this.chats[i]) {
            room = this.modalEdit + this.chats[i];
          } else {
            room = this.chats[i] + this.modalEdit;
          }
    
          // Primeira noticaçao para o chat
          if (this.reconectar.indexOf(this.chats[i]) === -1 ) { 
            this.reconectar.push(this.chats[i]);
            this.messages.push({
              room: room,
              message: 'Usuario esta off',
              from: 'Automatica'
            });
          }
        }
      }

      this.setLoadingPage(response[0]);
    });

    // chat foi aberto em outro lugar
    socket.on('invite', data => {
      console.log('chat foi aberto');
      socket.emit('joinRoom', data);
    });

    // Onde chega as mensagens de outro remetente
    socket.on('message', async msg => {
      console.log('CHEGOU UMA MENSAGEM ');
      if (this.listRoom.indexOf(msg.room) === -1) {
        this.listRoom.push(msg.room);
        this.chats.push(msg.from);
        let payload = { token: this.cookieUserJson, room :  msg.room }
        let response = await axios.post('/api/mensagens', payload );
        if (response.data.length > 0) {
          this.messages = this.messages.concat(response.data);
        }

        this.messages[this.messages.length - 1] = delete this.messages[
          this.messages.length - 1
        ]['_id'];

        if (
          this.messages[this.messages.length - 1] !==
          { room: msg.room, message: msg.message, from: msg.from }
        ) {
          this.messages.push({
            room: msg.room,
            message: msg.message,
            from: msg.from
          });
        }
      } else {
        this.mensagemParticular.push('');

        this.messages.push({
          room: msg.room,
          message: msg.message,
          from: msg.from
        });
      }
    });
  }
};
</script>
