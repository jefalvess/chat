<template>
  <div
    style="width: 50rem; margin-bottom: 7rem; margin-top: 7rem;"
    class="bx--grid"
  >
    <!-- Login -->
    <div class="bx--row">
      <cv-text-input label="Usuario " v-model="usuario">
      </cv-text-input>
    </div>

    <div class="bx--row">
      <cv-text-input label="Senha" type="password" v-model="senha">
      </cv-text-input>
    </div>

    <div class="bx--row">
      <cv-text-input label="Nome" v-model="nome">
      </cv-text-input>
    </div>

    <div style="margin-top: 1rem;" v-if="erroMensagem !== false" class="bx--row">
      {{ erroMensagem }}
    </div> 

    <div style="margin-top: 1rem" class="bx--row">
        <div class="bx--col-lg-4">
          <cv-button kind="secondary" @click="createUser()">
           Create User
          </cv-button>
        </div>
        <div class="bx--col">
          <cv-button  @click="login()" > Back </cv-button>
        </div> 
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  data() {
    return {
      usuario: '',
      senha: '', 
      erroMensagem: false,
      nome: ''
    };
  },
  computed: {
    ...mapGetters(['modalEdit',]),
  },
  methods: {
    ...mapActions(['setModalEdit', 'setCookieUserJson']),
    // Criar usuario / Login
    async createUser() {
      let payload = { usuario : this.usuario, senha: this.senha, nome : this.nome}; 
      let response = await axios.post('/api/create/user', payload  );

      if (response.data.status === false) { 
         this.erroMensagem = response.data.mensagem
      }

      if (response.data.status === true) {     
        this.proximaPagina(response.data)
      }

    },
    proximaPagina(data){ 
      this.$cookies.set("token", data.token , "8h")
      this.setCookieUserJson(data.token)
      this.setModalEdit(data.usuario);
      this.$router.push('/perfil');

    },
    login () { 
        this.$router.push('/login');
    }
  }
};
</script>
