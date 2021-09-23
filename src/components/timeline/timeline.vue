<template>
  <div class="bx--col">
     <div style="margin-top: 3rem; display: flex; align-items: center; justify-content: center " class="bx--row">
         <cv-text-area light="light" maxlength="280" placeholder="No que voce esta pensando" v-model="textoInput"> </cv-text-area>    
    </div>
    <div style="margin-top: 3rem; display: flex; justify-content: right; margin-top: 1rem;" class="bx--row">
     {{ textoInput.length }} | 280
    </div> 

    <div style="margin-bottom: 1rem; margin-top: 4rem;  display: flex; justify-content: right; margin-top: 1rem;" class="bx--row">
      <cv-button @click="postTimeLine()" >
         Publicar
       </cv-button>
    </div> 
     <div class="bx--col--lg" style= "margin-left: -1rem; margin-right: -1.5rem;" >
      <div lass="bx--col--lg" v-for="(item , index) in listTimeLineDataComputed" v-bind:key="index" style="background-color: white; margin-top: 2rem; margin-bottom: 2rem; border-radius: 25px; padding: 1rem 1rem 1rem 1rem;">
              <div  class="bx--row" > 

               <div style="padding: 0rem 0rem 0rem 1rem;" class="bx--col" > 
                    {{ item.order | date }}
                </div>

                 <div style="padding: 0rem 0rem 0rem 1rem;" class="bx--col" > 

                 <TrashCan style=" float: right;" />

                 </div>
          
              </div> 
              <div class="bx--row" > 
               <div style="padding: 1rem 1rem;" class="bx--col" > 
              <h3>{{ item.texto }}</h3>
              </div> 
              </div> 
              <div  class="bx--row" > 
                   <div style="padding: 0rem 0rem 0rem 1rem;" class="bx--col" > 
                   <p style= "font-size: 14px; ">Postado: {{ item.usuario }}</p> 
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
  components: { 
   TrashCan
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

.bx--accordion {
    width: 106%;
    list-style: none;
    margin-left: -1rem;
}
</style>
