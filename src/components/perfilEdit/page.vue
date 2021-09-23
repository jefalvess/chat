<template>
    <div style="margin-top: 6rem;" class="bx--grid">

      <div  style=" display: flex; align-items: center; justify-content: center " class="bx--row">
         Editando dados do seu perfil de usuario 
      </div>

      <div style="padding-top: 2.6rem; height: 3rem; display: flex; align-items: center; justify-content: center;" class="bx--row">
         Nome 
      </div>

      <div style=" display: flex; align-items: center; justify-content: center;" class="bx--row">
         <cv-text-input  v-model="perfilData.nome"> </cv-text-input>
      </div>

      <div style="padding-top: 2.6rem; height: 3rem; display: flex; align-items: center; justify-content: center;" class="bx--row">
         Trabalho 
      </div>

      <div style=" display: flex; align-items: center; justify-content: center;" class="bx--row">
         <cv-text-input  v-model="perfilData.trabalho"> </cv-text-input>
      </div>
     
      <div style="padding-top: 2.6rem; height: 3rem; display: flex; align-items: center; justify-content: center;" class="bx--row">
        Educaçao
      </div>

      <div style=" display: flex; align-items: center; justify-content: center;" class="bx--row">
         <cv-text-input  v-model="perfilData.education"> </cv-text-input>
      </div>


      <div style="padding-top: 2.6rem; height: 3rem; display: flex; align-items: center; justify-content: center;" class="bx--row">
        Estado Civil 
      </div>

       <div style="h display: flex; align-items: center; justify-content: center;" class="bx--row">
         <cv-text-input  v-model="perfilData.estadoCivil"> </cv-text-input>
      </div>

      <div style="padding-top: 2.6rem; height: 3rem; display: flex; align-items: center; justify-content: center;" class="bx--row">
         Email 
      </div>

      <div style=" display: flex; align-items: center; justify-content: center;" class="bx--row">
        <cv-text-input  v-model="perfilData.email"> </cv-text-input>
      </div>

      <div style="padding-top: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center;" class="bx--row"> 
          <cv-button @click="saveEditPerfil()" > Salvar </cv-button>
      </div>

      <div style="padding-top: 4rem; height: 2rem; display: flex; align-items: center; justify-content: center;" class="bx--row"> 
          <cv-button  kind="secondary"  @click="cancel()" > Cancelar </cv-button>
      </div>


          

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';

export default {
  name: 'usuario',
  data() {
    return {
      token: '',
      perfilData : [] 
    };
  },
  computed: {
    ...mapGetters(['modalEdit']),
  },
  methods: {
    // ir para pagina de perfil
    async getPerfil () { 
      let payload = { token: this.token }
      let response = await axios.post('/api/perfil', payload );
      this.perfilData  = response.data.perfil

    }, 
    async saveEditPerfil() { 
      let payload = { token: this.token, perfil : this.perfilData }
      await axios.post('/api/perfil/edit', payload );
      this.$router.push('/perfil');

    },
    async cancel() { 
      this.$router.push('/perfil');

    }
  },
  mounted () { 
    this.token = this.$cookies.get("token");
    this.getPerfil();
  }
};
</script>
