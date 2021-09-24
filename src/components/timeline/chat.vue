<template>
  <div class="bx--grid">
    <cv-accordion ref="acc">
      <cv-accordion-item>
        <template slot="title"
          >Usuarios conectados: {{ loadingPage.length - 1 }}
        </template>
        <template slot="content">
          <div class="bx--row" v-if="loadingPage.length === 1">
            <p style="padding-left: 1rem; cursor: pointer">
              Nenhum usuario conectado
            </p>
          </div>

          <!-- Lista de usuario conectados -->
          <div
            v-else
            class="bx--row"
            v-for="user in loadingPage"
            v-bind:key="user.socketId"
            v-on:click="createRoom(user.user_id)"
            style="cursor: pointer"
          >
            <div
              v-if="user.user_id !== modalEdit"
              v-bind:id="user.user_id"
              style="padding-left: 1rem"
              class="bx--col--lg"
            >
              <img
                style="width: 2rem; height: 2rem; border-radius: 50%"
                v-bind:src="'static/' + user.user_id + '.png'"
              />
            </div>

            <div
              v-if="user.user_id !== modalEdit"
              v-bind:id="user.user_id"
              style="padding-top: 0.3rem; padding-left: 0.5rem"
              class="bx--col--lg"
            >
              <p>
                {{ user.user_id }}
              </p>
            </div>

            <div
              v-if="listNotificationMensagem.indexOf(user.user_id) !== -1"
              class="bx--col--lg"
              style="padding-top: 0.3rem; padding-left: 0.5rem;"
            >
              <ChatIco />
            </div>
          </div>
        </template>
      </cv-accordion-item>
    </cv-accordion>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

// eslint-disable-next-line no-undef
const socket = io({ transports: ['websocket'] });
import ChatIco from '@carbon/icons-vue/es/chat/20';
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
      listNotificationMensagem: [],
    };
  },
  computed: {
    ...mapGetters(['loadingPage', 'modalEdit']),
    listRoomComputed: {
      get() {
        return this.listRoom;
      },
    },
  },
  components: {
    ChatIco,
  },
  methods: {
    ...mapActions(['setLoadingPage', 'setChamarChat']),
    // Criar sala de bate papo
    async createRoom(id) {
      this.setChamarChat(id);
      this.$router.push('/chat');
    },
    minimizeChat(room, index) {
      this.listRoom.splice(index, 1);
      this.chats.splice(index, 1);
      this.messages = this.messages.filter((item) => item.room !== room);
    },
    criarUsuario() {
      if (this.modalEdit !== '') {
        socket.emit('loggedin', { user_id: this.modalEdit });
      }
    }
  },
  mounted() {
    this.token = this.$cookies.get('token');
    this.criarUsuario();
  },
  created: function () {
    // criar chat
    socket.on('updateUserList', (response) => {
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
          if (this.reconectar.indexOf(this.chats[i]) === -1) {
            this.reconectar.push(this.chats[i]);
            this.messages.push({
              room: room,
              message: 'Usuario esta off',
              from: 'Automatica',
            });
          }
        }
      }

      this.setLoadingPage(response[0]);
    });

    // chat foi aberto em outro lugar
    socket.on('invite', (data) => {
      console.log('chat foi aberto');
      socket.emit('joinRoom', data);
    });

    // Onde chega as mensagens de outro remetente
    socket.on('message', async (msg) => {
      this.listNotificationMensagem.push(msg.from);
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
