<template>
  <div class="bx--col">
     <div style="margin-top: 3rem; display: flex; align-items: center; justify-content: center " class="bx--row">
         <cv-text-area light="light" maxlength="50" placeholder="No que voce esta pensando" v-model="textoInput"> </cv-text-area>    
    </div>
    <div style="margin-top: 3rem; display: flex; justify-content: right; margin-top: 1rem;" class="bx--row">
     {{ textoInput.length }} | 50
    </div> 

    <div style="margin-top: 1rem; margin-top: 3rem; display: flex; justify-content: right; margin-top: 1rem;" class="bx--row">
      <cv-button @click="postTimeLine()" >
         Publicar
       </cv-button>
    </div> 
    <div v-for="(item , index) in listTimeLineDataComputed" v-bind:key="index" class="bx--row">
          <cv-tile>
            <h2>{{ item.texto }}</h2>
            <p>Postado: {{ item.usuario }}</p>
            <p>Horario: {{ item.order }} </p>
          </cv-tile>
    </div> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: 'timeline',
  data() {
    return {
      textoInput: '',
      timelineData: [],
      token: ''
    };
  },
  computed: {
    ...mapGetters(['modalEdit']),
    listTimeLineDataComputed: {
      get() {
        return this.timelineData;
      }
    },
  },
  methods: {
    ...mapActions(['setLoadingPage']),

    async buscarMensagens () { 
      let payload = { token: this.token, usuario : this.modalEdit }
       let response = await axios.post('/api/buscar/timeline', payload );
       if (response.data.status === true) { 
         this.timelineData = response.data.timelineData
       }
    },
    async postTimeLine () {
      if (this.textoInput !== '') {
       let payload = { token: this.token, usuario : this.modalEdit , texto: this.textoInput }
       axios.post('/api/create/timeline', payload );
       this.timelineData.splice(0, 0, { usuario: this.modalEdit,  texto: this.textoInput, order: Date.now () } )
       this.textoInput = ''
      }
    },
    async loopdebusca () {
      let can = this; 
      setInterval( async function(){
        let payload = { token: can.token, usuario : can.modalEdit }
        let response = await axios.post('/api/buscar/timeline', payload );
        if (response.data.status === true) { 
          can.timelineData = response.data.timelineData;
        }
      }, 1000 * 60 * 60);

    }
  },
  mounted() {
    this.token = this.$cookies.get("token")
    this.buscarMensagens()
    this.loopdebusca()
  },
};
</script>

<style lang="scss">

.bx--text-area {
  height: 7rem;
}
</style>
