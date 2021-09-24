<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-lg-2">
        <div style="padding-top: 2rem;padding-bottom: 2rem;" class="bx--row">
          <p style="padding-left: 1rem; cursor: pointer">Bate-papos</p>
        </div>

        <!-- Lista de usuario conectados -->
        <div
          class="bx--row"
          v-for="user in historicoComputed"
          v-bind:key="user.chatCom"
          style="height: 3.6rem;" 
        >
          <div
            style="padding-left: 1rem"
            class="bx--col--lg"
          >
            <img
              style="width: 2rem; height: 2rem; border-radius: 50%"
              v-bind:src="'static/' + user.chatcom + '.png'"
            />
          </div>

          <div
            style="padding-top: 0.3rem; padding-left: 0.5rem"
            class="bx--col--lg"
          >
            <div class="bx--row">
              <p
                v-if="user.chatcom !== modalEdit"
                v-bind:id="user.chatcom"
                v-on:click="createRoom(user.chatcom)"
                style="padding-left: 1rem; cursor: pointer; "
              >
                {{ user.chatcom }}
              </p>
            </div>

            <div class="bx--row">
            

               <p
                v-if="user.chatcom !== modalEdit"
                v-bind:id="user.chatcom"
                v-on:click="createRoom(user.chatcom)"
                style="padding-left: 1rem; cursor: pointer; font-size: 10px;"
              >
                   {{ user.ultimaMensagem }}
              </p>

            </div>
          </div>
        
           <div
              v-if="listNotificationMensagem.indexOf(user.chatcom) !== -1"
              class="bx--col--lg"
              style="padding-top: 0.3rem; padding-left: 0.5rem;"
            >
              <ChatIco />
            </div>

        </div>
      </div>
      <div class="bx--col">
        <div class="bx--row">
          <div  style="border: 1px solid;" class="bx--col">
            <!-- id / botao de eliminar  -->
            <div class="bx--row">
              <div
                style="width: 80%; padding-top: 0.5rem; padding-bottom: 0.5rem"
                lass="bx--col--lg"
              >
                ID CHAT : {{ listRoomComputed.room }}
              </div>
            </div>
            <!-- Mensagens -->
            <div
              class="bx--row"
              style="
                overflow: auto;
                flex-direction: column-reverse;
                height: 43.5rem;
              "
            >
              <div class="bx--col">
                <div
                  class="bx--row"
                  v-for="(message, index) in messages"
                  v-bind:key="index"
                >
                  <div class="bx--col--lg">
                    <img
                      style="width: 2rem; height: 2rem; border-radius: 50%"
                      v-bind:src="'static/' + message.from + '.png'"
                    />
                  </div>

                  <div
                    style="margin-left: 0.5rem; margin-top: 0.5rem"
                    class="bx--col--lg"
                  >
                    <span class="message"> {{ message.message }} </span>
                  </div>
                </div>
              </div>
            </div>
            <!-- Botao de enviar mensagem -->
            <div class="bx--row">
              <div style="width: 100%" class="chat-window" v-bind:id="listRoomComputed.room">
                <div class="body"></div>
                <div class="footer">
                  <input
                    style="width: 90%; height: 2rem;"
                    type="text"
                    v-model="mensagemParticular"
                    class="messageText"
                    v-on:keyup.enter="
                      sendMessage(
                        listRoomComputed.room,
                        listRoomComputed.withUserId
                      )
                    "
                  />
                  <button
                    style="height: 2rem"
                    @click="
                      sendMessage(
                        listRoomComputed.room,
                        listRoomComputed.withUserId
                      )
                    "
                  >
                    GO
                  </button>
                </div>
              </div>
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
import ChatIco from '@carbon/icons-vue/es/chat/20';
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
      reconectar: [],
      toke: '',
      historico: [],
      chatAberto: '',
      listNotificationMensagem: [] 
    };
  },
  components : {
    ChatIco
  },
  computed: {
    ...mapGetters(['loadingPage', 'modalEdit', 'chamarChat']),
    listRoomComputed: {
      get() {
        return this.listRoom;
      },
    },
    historicoComputed: {
      get() {
        return this.historico;
      },
    },
  },
  methods: {
    ...mapActions(['setLoadingPage']),
    // Criar sala de bate papo
    async createRoom(id) {
      if (this.chatAberto !== id) {
        console.log('Abri chat ');

        this.chatAberto = id;

        let loggedInUser = this.modalEdit;
        let room = '';

        if (this.modalEdit > id) {
          room = this.modalEdit + id;
        } else {
          room = id + this.modalEdit;
        }

        this.listRoom = { room: room, withUserId: id };
        this.mensagemParticular = '';

        let payload = { token: this.token, room: room };
        let response = await axios.post('/api/mensagens', payload);

        if (response.data.length > 0) {
          this.messages = response.data;
        }

        socket.emit('create', {
          room: room,
          userId: loggedInUser.userId,
          withUserId: id,
          user: this.modalEdit,
        });
      }
    },
    sendMessage(room, chatcom) {
      console.log('Enviar mensagem ');

      let loggedInUser = this.modalEdit;
      let message = this.mensagemParticular;
      this.mensagemParticular = '';

      socket.emit('message', {
        room: room,
        message: message,
        from: loggedInUser,
        withUserId: chatcom,
      });

      this.messages.push({
        room: room,
        message: message,
        from: loggedInUser,
      });
    },
    criarUsuario() {
      if (this.modalEdit !== '') {
        socket.emit('loggedin', { user_id: this.modalEdit });
      } else {
        this.$router.push('/login');
      }
    },
    async mensagemAntiga() {
      let payload = { token: this.token, usuario: this.modalEdit };
      let response = await axios.post('/api/historico/mensagens', payload);

      if (response.data.status === true) {
        this.historico = response.data.data;
      }
    },
  },
  mounted() {
    this.token = this.$cookies.get('token');
    this.criarUsuario();
    this.createRoom(this.chamarChat);
    this.mensagemAntiga();
  },
  created: function () {
    // criar chat
    socket.on('updateUserList', (response) => {
      console.log('atualiaçao de usuarios online', response);

      // // CHat que estava on e preciso reabrir conexao
      // for (let i = 0; i < this.reconectar.length; i++) {
      //   // Se o chat aberto nao existir aqui
      //   if (response[1].indexOf(this.reconectar[i]) === 1) {
      //     console.log('preciso reconectar esse chat');

      //     let room = '';
      //     if (this.modalEdit > this.chats[i]) {
      //       room = this.modalEdit + this.chats[i];
      //     } else {
      //       room = this.chats[i] + this.modalEdit;
      //     }

      //     let index = this.chats.indexOf(this.reconectar[i]);
      //     this.minimizeChat(room, index);
      //     this.createRoom(this.reconectar[i]);
      //   }
      // }

      // // Avisar se alguem ficar of e eu tenho chat aberto;
      // for (let i = 0; i < this.chats.length; i++) {
      //   // Se o chat aberto nao existir aqui
      //   if (response[1].indexOf(this.chats[i]) === -1) {
      //     let room = '';
      //     if (this.modalEdit > this.chats[i]) {
      //       room = this.modalEdit + this.chats[i];
      //     } else {
      //       room = this.chats[i] + this.modalEdit;
      //     }

      //     // Primeira noticaçao para o chat
      //     if (this.reconectar.indexOf(this.chats[i]) === -1 ) {
      //       this.reconectar.push(this.chats[i]);
      //       this.messages.push({
      //         room: room,
      //         message: 'Usuario esta off',
      //         from: 'Automatica'
      //       });
      //     }
      //   }
      // }

      this.setLoadingPage(response[0]);
    });

    // chat foi aberto em outro lugar
    socket.on('invite', (data) => {
      socket.emit('joinRoom', data);
    });

    // Onde chega as mensagens de outro remetente
    socket.on('message', async (msg) => {
      if (this.listRoom === msg.room) {
        this.messages.push({
          room: msg.room,
          message: msg.message,
          from: msg.from,
        });
      } else { 
        this.listNotificationMensagem.push(msg.from);
      }
    });
  },
};
</script>

<style>
#pop {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -100px;
  padding: 10px;
  width: 300px;
  height: 200px;
  border: 1px solid #d0d0d0;
}
</style>
