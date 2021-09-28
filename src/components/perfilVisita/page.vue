<template>
  <div style="margin-top: 6rem" class="bx--grid">
    <div
      style="
        height: 10rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      class="bx--row"
    >
      <img
        style="width: 10rem; height: 10rem; border-radius: 50%"
        v-bind:src="'../static/' + perfilData.usuario + '.png'"
      />
    </div>


    <div
      v-if="flagEdit"
      style="
        padding-top: 2.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      "
      class="bx--row"
    >
      <cv-button kind="secondary" @click="submitForm()">
        Salvar foto
      </cv-button>
    </div>

    <div
      style="
        padding-top: 2.6rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      class="bx--row"
    >
      Nome
    </div>

    <div
      style="display: flex; align-items: center; justify-content: center"
      class="bx--row"
    >
      <cv-text-input readonly v-model="perfilData.nome"> </cv-text-input>
    </div>

    <div
      style="
        padding-top: 2.6rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      class="bx--row"
    >
      Trabalho
    </div>

    <div
      style="display: flex; align-items: center; justify-content: center"
      class="bx--row"
    >
      <cv-text-input readonly v-model="perfilData.trabalho"> </cv-text-input>
    </div>

    <div
      style="
        padding-top: 2.6rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      class="bx--row"
    >
      Educaçao
    </div>

    <div
      style="display: flex; align-items: center; justify-content: center"
      class="bx--row"
    >
      <cv-text-input readonly v-model="perfilData.education"> </cv-text-input>
    </div>

    <div
      style="
        padding-top: 2.6rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      class="bx--row"
    >
      Estado Civil
    </div>

    <div
      style="display: flex; align-items: center; justify-content: center"
      class="bx--row"
    >
      <cv-text-input readonly v-model="perfilData.estadoCivil"> </cv-text-input>
    </div>

    <div
      style="
        padding-top: 2.6rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      class="bx--row"
    >
      Email
    </div>

    <div
      style="display: flex; align-items: center; justify-content: center"
      class="bx--row"
    >
      <cv-text-input readonly v-model="perfilData.email"> </cv-text-input>
    </div>

   
    <div
      style="
        padding-top: 4rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 3rem;
        
      "
      class="bx--row"
    >
      <cv-button kind="secondary" @click="timeline()"> timeline </cv-button>
    </div>

    <timeline />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
const timeline = () => import('./timeline.vue');

export default {
  name: 'usuario',
  data() {
    return {
      token: '',
      perfilData: [],
      uploadedFiles: [],
      flagEdit: false,
    };
  },
  computed: {
    ...mapGetters(['modalEdit']),
  },
  components : {
      timeline
   },
  methods: {
    // ir para pagina de perfil
    async getPerfilVisita() {
      let usuarioVisita = this.$route.params.id;
      let payload = { token: this.token, usuarioVisita : usuarioVisita };
      let response = await axios.post('/api/perfil/visita', payload);
      this.perfilData = response.data.perfil;
    },
    async timeline() {
      this.$router.push('/timeline');
    }
  },
  mounted() {
    this.token = this.$cookies.get('token');
    this.getPerfilVisita();
  },
};
</script>
