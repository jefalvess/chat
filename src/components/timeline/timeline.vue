<template>
  <div class="bx--col">
    <div
      style="
        margin-top: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
      "
      class="bx--row"
    >
      <cv-text-area
        light="light"
        maxlength="280"
        placeholder="No que voce esta pensando"
        v-model="textoInput"
      >
      </cv-text-area>
    </div>
    <div
      style="
        margin-top: 3rem;
        display: flex;
        justify-content: right;
        margin-top: 1rem;
      "
      class="bx--row"
    >
      {{ textoInput.length }} | 280
    </div>

    <div
      style="
        margin-bottom: 1rem;
        margin-top: 4rem;
        display: flex;
        justify-content: right;
        margin-top: 1rem;
      "
      class="bx--row"
    >
      <cv-button @click="postTimeLine()"> Publicar </cv-button>
    </div>
    <div class="bx--col--lg" style="margin-left: -1rem; margin-right: -1.5rem">
      <div
        lass="bx--col--lg"
        v-for="(item, index) in listTimeLineDataComputed"
        v-bind:key="index"
        style="
          background-color: white;
          margin-top: 2rem;
          margin-bottom: 2rem;
          border-radius: 25px;
          padding: 1rem 1rem 1rem 1rem;
        "
      >
        <div @click="verPerfil(item.usuario)" style="cursor: pointer;" class="bx--row">
          <div v-if="item.usuario !== 'undefined' " style="padding: 0rem 0rem 0rem 1rem" class="bx--col--lg">         
               <img   style="width: 2rem; height: 2rem; border-radius: 50%" v-bind:src="'static/'+ item.usuario + '.png'" />
          </div>

          <div style="padding-top: 0.4rem; padding-left: 0.4rem" class="bx--col--lg" >
            <p style="font-size: 14px">@{{ item.usuario }}</p>
          </div>
        </div>

        <div class="bx--row">
          <div style="padding: 0rem 1rem 0.5rem 1rem" class="bx--col">
            <h3>{{ item.texto }}</h3>
          </div>
        </div>

        <div class="bx--row">
          <div style="padding: 0rem 0rem 0rem 1rem" class="bx--col">
            {{ item.order | date }}
          </div>

          <div v-if="item.usuario === modalEdit" style="padding: 0rem 1rem 0rem 1rem" class="bx--col">
            <TrashCan
              v-on:click="deletePost(index)"
              style="cursor: pointer; float: right"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import TrashCan from '@carbon/icons-vue/es/trash-can/20';

export default {
  name: 'timeline',
  data() {
    return {
      textoInput: '',
      timelineData: [],
      token: '',
    };
  },
  computed: {
    ...mapGetters(['modalEdit', 'modalUser']),
    listTimeLineDataComputed: {
      get() {
        return this.timelineData;
      },
    },
  },
  components: {
    TrashCan,
  },
  methods: {
    ...mapActions(['setLoadingPage']),
    async buscarMensagens() {
      let payload = { token: this.token, usuario: this.modalEdit };
      let response = await axios.post('/api/buscar/timeline', payload);
      if (response.data.status === true) {
        this.timelineData = response.data.timelineData;
      }
    },
    async postTimeLine() {
      if (this.textoInput !== '') {
        let payload = {
          token: this.token,
          usuario: this.modalEdit,
          texto: this.textoInput,
        };
        axios.post('/api/create/timeline', payload);
        this.timelineData.splice(0, 0, {
          usuario: this.modalEdit,
          texto: this.textoInput,
          order: Date.now()
        });
        this.textoInput = '';
      }
    },
    async loopdebusca() {
      let can = this;
      setInterval(async function () {
        let payload = { token: can.token, usuario: can.modalEdit };
        let response = await axios.post('/api/buscar/timeline', payload);
        if (response.data.status === true) {
          can.timelineData = response.data.timelineData;
        }
      }, 1000 * 60 * 60);
    },
    async deletePost(index) {
      let payload = { token: this.token, id: this.timelineData[index]._id };
      axios.post('/api/delete/post', payload);
      this.timelineData.splice(index, 1);
    },
    async verPerfil(user) {

        if ( this.modalEdit !== user ) {  

        this.$router.push('/perfil/' + user);
        
        } else { 

          this.$router.push('/perfil');
        }
    }
    
  },
  mounted() {
    this.token = this.$cookies.get('token');
    this.buscarMensagens();
    this.loopdebusca();
  },
};
</script>

<style lang="scss">
.bx--text-area {
  height: 7rem;
}

.bx--accordion {
  width: 106%;
  list-style: none;
  margin-left: -1rem;
}
</style>
