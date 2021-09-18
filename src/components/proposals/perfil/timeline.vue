<template>
  <div
    class="bx--col"
  >
    <div class="bx--row">
      <p style="font-size: 22px;"> Escrever um texto </p>
    </div>

     <div class="bx--row">
         <cv-text-area
           MAXLENGTH="50"
           v-model="textoInput">
           </cv-text-area>    
    </div>
    <div class="bx--row">
     {{ textoInput.length }} | 50
    </div> 

    <div style="margin-top: 1rem;" class="bx--row">
      <cv-button @click="postTimeLine()" >
         Enviar mensagem
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
      timelineData: []
    };
  },
  computed: {
    ...mapGetters(['modalEdit', 'cookieUserJson']),
    listTimeLineDataComputed: {
      get() {
        return this.timelineData;
      }
    },
  },
  methods: {
    ...mapActions(['setLoadingPage']),

    async buscarMensagens () { 
      let payload = { token: this.cookieUserJson, usuario : this.modalEdit }
       let response = await axios.post('/api/buscar/timeline', payload );
       if (response.data.status === true) { 
         this.timelineData = response.data.timelineData
       }
    },
    async postTimeLine () {
      if (this.textoInput !== '') {
       let payload = { token: this.cookieUserJson, usuario : this.modalEdit , texto: this.textoInput }
       axios.post('/api/create/timeline', payload );
       this.timelineData.splice(0, 0, { usuario: this.modalEdit,  texto: this.textoInput, order: Date.now () } )
       this.textoInput = ''
      }
    }

  },
  mounted() {
    this.buscarMensagens()
  },
};
</script>
