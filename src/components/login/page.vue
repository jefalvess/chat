<template>
  <div
    style="width: 50rem; margin-bottom: 7rem; margin-top: 7rem;"
    class="bx--grid"
  >
    <!-- Login -->
    <div class="bx--row">
      <cv-text-input label="User" v-model="usuario">
      </cv-text-input>
    </div>

      <div class="bx--row">
      <cv-text-input label="senha" type="password" v-model="senha">
      </cv-text-input>
    </div>

      <div v-if="erroMensagem !== false" class="bx--row">

      {{ erroMensagem }}

      </div> 

    <div style="margin-top: 1rem" class="bx--row">

     <div class="bx--col-lg-3">
          <cv-button
           @click="createUser()"

    >
        Login
    </cv-button>
    </div>

    <div class="bx--col">
    <cv-button
     kind="secondary"
  @click="criarUsuario()"
>
Create User
</cv-button>
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
    };
  },
  computed: {
    ...mapGetters(['modalEdit']),
  },
  methods: {
    ...mapActions(['setModalEdit', 'setCookieUserJson', 'setModalUser']),
    // Criar usuario / Login
    async createUser() {
      let payload = { usuario : this.usuario, senha: this.senha }; 
      let response = await axios.post('/api/login/user', payload  );

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
      this.setModalUser(data);
      this.$router.push('/timeline');
    },
    criarUsuario(){
        this.$router.push('/create');
    },
    async checarToken(){
      let cookie = this.$cookies.get("token")
      if (cookie !== null) { 
        let response = await axios.post('/api/token/user', {token : cookie} );
        if (response.data.status === true) {     
          this.proximaPagina(response.data)
        }
      }
    }
  },
  mounted () {
    this.checarToken()

  }
};
</script>
