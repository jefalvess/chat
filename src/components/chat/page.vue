<template>
  <div class="bx--grid">
    <div class="bx--row">
      <div class="bx--col-lg-2">
        <cv-accordion ref="acc">
          <cv-accordion-item :open="true">
            <template slot="title">Conversas: </template>
            <template slot="content">
              <!-- Lista de usuario conectados -->
              <div
                class="bx--row"
                v-for="user in historicoComputed"
                v-bind:key="user.chatCom"
                style="height: 3.6rem"
              >
                <div class="bx--col--lg">
                  <img
                     v-on:click="createRoom(user.chatcom)"
     
                    style="width: 2rem; height: 2rem; border-radius: 50%; cursor: pointer"
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
                      style="padding-left: 1rem; cursor: pointer"
                    >
                      {{ user.chatcom }}
                    </p>
                  </div>

                  <div class="bx--row">
                    <p
                      v-if="user.chatcom !== modalEdit"
                      v-bind:id="user.chatcom"
                      v-on:click="createRoom(user.chatcom)"
                      style="
                        padding-left: 1rem;
                        cursor: pointer;
                        font-size: 10px;
                      "
                    >
                      {{ user.ultimaMensagem.substr(0, 17) }} ...
                    </p>
                  </div>
                </div>

                <div
                  v-if="listNotificationMensagem.indexOf(user.chatcom) !== -1"
                  class="bx--col--lg"
                  style="padding-top: 0.3rem; padding-left: 0.5rem"
                >
                  <ChatIco />
                </div>
              </div>
            </template>
          </cv-accordion-item>
        </cv-accordion>
      </div>
      <div class="bx--col">
        <div v-if="chatAberto !== ' ' " class="bx--row">
          <div style="border: 1px solid" class="bx--col">
            <!-- id / botao de eliminar  -->
            <div class="bx--row">
              <div
                style="width: 80%; padding-top: 0.5rem; padding-bottom: 0.5rem"
                lass="bx--col--lg"
              >
                ID CHAT : {{ listRoomComputed.room }} {{ chatAberto }}
              </div>
            </div>
            <!-- Mensagens -->
            <div
              class="bx--row"
              style="
                overflow: auto;
                flex-direction: column-reverse;
                height: 76vh;
              "
            >
              <div class="bx--col">
                <div class="bx--row" v-for="(message, index) in messages" v-bind:key="index" >

              
                  <div v-if="message.from !== modalEdit"  style="padding-left: 0.5rem" class="bx--col--lg">
                    <img style=" width: 2rem; height: 2rem; border-radius: 50%; margin-top: 1rem; " v-bind:src="'static/' + message.from + '.png'" />
                  </div>
                   
                  <div v-if="message.from !== modalEdit" style="background-color: white; min-height: 1rem; margin-left: 0.5rem; margin-top: 0.5rem; padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 25px; padding: 1rem; " class="bx--col--lg" >
                    <span class="message"> {{ message.message }} </span>
                  </div>

                  <messageLeft v-if="message.from === modalEdit" v-bind:message="message" />
                </div>
              </div>
            </div>
            <!-- Botao de enviar mensagem -->
            <div style="padding-top: 1rem" class="bx--row">
              <div
                style="width: 100%"
                class="chat-window"
                v-bind:id="listRoomComputed.room"
              >
                <div class="body"></div>
                <div class="footer">
                  <input
                    style="width: 90%; height: 2.5rem"
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
                    style="height: 2.5rem; width: 10%;"
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
const messageLeft = () => import('./messageLeft.vue');
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
      reconectar: '',
      historico: [],
      chatAberto: '',
      listNotificationMensagem: [],
      token: ''
    };
  },
  components: {
    ChatIco,
    messageLeft
  },
  computed: {
    ...mapGetters(['modalEdit', 'chamarChat']),
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
    ...mapActions(['setLoadingPage', 'setModalEdit']),
    // Criar sala de bate papo
    async createRoom(id) {
      console.log('ETAPA 3')
      if (this.chatAberto !== id || this.reconectar === this.chatAberto) {
        this.chatAberto = id;
        this.reconectar = false;

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
      if (this.mensagemParticular === '') {
        return '';
      }
      

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
    async mensagemAntiga() {
      console.log('ETAPA 4')
      let payload = { token: this.token, usuario: this.modalEdit };
      let response = await axios.post('/api/historico/mensagens', payload);

      if (response.data.status === true) {
        this.createRoom(response.data.data[0].chatcom);
        this.historico = response.data.data;
      }

    },
    async checarToken(){

      console.log('ETAPA 1')
      
      // Validar se existe token valido
      if (this.token !== null) { 

            let response = await axios.post('/api/token/user', {token : this.token} );
            if (response.data.status === true) {     
              await this.setModalEdit(response.data.usuario);
              await this.criarUsuario()
              await this.mensagemAntiga()
            }

      } else { 

        this.$router.push('/login');

      }
    },
    criarUsuario() {
      console.log('ETAPA 2')
        socket.emit('loggedin', { user_id: this.modalEdit });
        if (this.chamarChat !== ' ') { 
            this.createRoom(this.chamarChat);
        }
    },
  },
  mounted() {
    this.token = this.$cookies.get('token');
    this.checarToken();
   
    
  },
  created: function () {
    // criar chat
    socket.on('updateUserList', (response) => {
      // Tenho um chat aberto e vou me conectar a ele novamente
      if (
        this.reconectar !== false &&
        response[1].indexOf(this.reconectar) !== -1
      ) {

        this.createRoom(this.listRoomComputed.withUserId);
      }
      // Usuario que estou falando não esta mais online
      if (response[1].indexOf(this.listRoomComputed.withUserId) === -1) {
        // Guardar nome na lista para reconectar
        if (this.reconectar !== this.listRoomComputed.withUserId) {
          this.reconectar = this.listRoomComputed.withUserId;
          this.messages.push({
            room: this.listRoomComputed.room,
            message: 'Usuario esta Off-line',
            from: 'off',
          });
        }
      }

      this.setLoadingPage('');
    });

    // chat foi aberto em outro lugar
    socket.on('invite', (data) => {
      socket.emit('joinRoom', data);
    });

    // Onde chega as mensagens de outro remetente
    socket.on('message', async (msg) => {
      if (this.listRoomComputed.room === msg.room) {
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
