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
        v-bind:src="'static/' + perfilData.usuario + '.png'"
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
      <cv-file-uploader
        style="max-width: 20rem"
        accept=".jpg,.png"
        v-model="uploadedFiles"
        :multiple="false"
        :removable="true"
        ref="fileUploader"
      >
        <template slot="drop-target"> Selecione a sua nova foto </template>
      </cv-file-uploader>
    </div>

    <div
      v-if="flagEdit === false"
      style="
        padding-top: 2.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      "
      class="bx--row"
      @click="flagEdit = true"
    >
      Editar Foto
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

    <div style=" padding-top: 2.6rem; height: 3rem; display: flex; align-items: center; justify-content: center; " class="bx--row" >
      Estado Civil
    </div>

    <div style="display: flex; align-items: center; justify-content: center" class="bx--row" >
      <cv-text-input readonly v-model="perfilData.estadoCivil"> </cv-text-input>
    </div>

    <div style=" padding-top: 2.6rem; height: 3rem; display: flex; align-items: center; justify-content: center; " class="bx--row" >
      Email
    </div>

    <div style="display: flex; align-items: center; justify-content: center" class="bx--row" >
      <cv-text-input readonly v-model="perfilData.email"> </cv-text-input>
    </div>

    <div style=" padding-top: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; " class="bx--row" >
      <cv-button @click="editPerfil()"> Editar Perfil </cv-button>
    </div>

    <div style="padding-top: 4rem; height: 2rem; display: flex; align-items: center; justify-content: center; padding-bottom: 3rem;" class="bx--row" >
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
  components: {
    timeline
  },
  methods: {
    // ir para pagina de perfil
    async paginaPerfil() {
      this.$router.push('/perfil');
    },
    async getPerfil() {
      let payload = { token: this.token };
      let response = await axios.post('/api/perfil', payload);
      this.perfilData = response.data.perfil;
    },
    async editPerfil() {
      this.$router.push('/perfil/edit');
    },
    async timeline() {
      this.$router.push('/timeline');
    },
    async submitForm() {
      if (this.uploadedFiles.length === 0) {
        return (this.flagEdit = false);
      }

      let formData = new FormData();
      formData.append('usuario', this.perfilData.usuario);
      formData.append('token', this.token);

      if (this.uploadedFiles.length > 0) {
        for (let file of this.uploadedFiles) {
          formData.append('files', file.file);
        }
      }

      await axios
        .post('/api/upload/file', formData, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            token: this.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          document.location.reload(true);
        });
    },
  },
  mounted() {
    this.token = this.$cookies.get('token');
    this.getPerfil();
  },
};
</script>
