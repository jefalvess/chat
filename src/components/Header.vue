<template>
  <div style="margin-bottom: 3.1rem" class="bx--row">
    <cv-header aria-label="Carbon header">
      <cv-header-name style="cursor: pointer" @click="redirect()" prefix="Porject">
        Jeff 
      </cv-header-name>
      <template   slot="header-global">
        <p style="cursor: pointer" @click="logoff()" class="confidential"> Sair </p>
      </template>
    </cv-header>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'header-page',
  computed: {
    ...mapGetters(['cookieUserJson'])
  },

  methods: {
    ...mapActions(['setCookieUserJson', 'setModalEdit' ]),
    redirect() {
      return window.open(`${window.location.origin}/`, '_self');
    },
    async checarToken(){
      let cookie = this.$cookies.get("token")
      if (cookie !== null) { 
        let response = await axios.post('/api/token/user', {token : cookie} );
        if (response.data.status === true) {     
          this.proximaPagina(response.data)
        }
      }
    },
    proximaPagina(data){ 
      this.$cookies.set("token", data.token , "8h")
      this.setCookieUserJson(data.token)
      this.setModalEdit(data.usuario);
      this.$router.push('/perfil');
    },
    async logoff (){
      this.$cookies.remove("token");
       this.$router.push('/');

      
    }
  },
  mounted() {
    this.checarToken();
  },
};
</script>

<style>
.confidential {
  font-weight: bold;
  color: #ffffff;
  margin: 0.7rem 0.5rem 0.5rem;
}
</style>
