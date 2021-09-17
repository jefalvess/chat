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
      <cv-text-input label="senha" v-model="senha">
      </cv-text-input>
    </div>

      <div v-if="erroMensagem !== false" class="bx--row">

      {{ erroMensagem }}

      </div> 

    <div class="bx--row">
          <cv-button
  
      @click="createUser()"

    >
        Login
    </cv-button>

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
    ...mapActions(['setModalEdit']),
    // Criar usuario / Login
    async createUser() {
      let payload = { usuario : this.usuario, senha: this.senha }; 
      let response = await axios.post('/api/login/user', payload  );

      if (response.data.status === false) { 
         this.erroMensagem = response.data.mensagem
      }

      if (response.data.status === true) {     
        this.proximaPagina(response.data.usuario)
      }

    },
    proximaPagina(){ 

      this.setModalEdit(this.usuario);
      this.$router.push('/chat');

    }
  }
};
</script>
