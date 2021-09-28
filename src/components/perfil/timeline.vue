<template>
  <div class="bx--col">
  
    <div class="bx--col--lg" style="margin-left: -1rem; margin-right: -1.5rem">
      <div
        lass="bx--col--lg"
        v-for="(item, index) in listTimeLineDataComputed"
        v-bind:key="index"
        style="background-color: white; margin-top: 2rem; margin-bottom: 2rem; border-radius: 25px; padding: 1rem 1rem 1rem 1rem; " >
        
        <div style="cursor: pointer;" class="bx--row">
          <div v-if="item.usuario !== 'undefined' " style="padding: 0rem 0rem 0rem 1rem" class="bx--col--lg">         
               <img   style="width: 2rem; height: 2rem; border-radius: 50%" v-bind:src="'../static/'+ item.usuario + '.png'" />
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
        </div>
      </div>
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
  methods: {
    ...mapActions(['setLoadingPage']),
    async buscarMensagens() {

      let payload = { token: this.token };
      let response = await axios.post('/api/buscar/timeline/usuario', payload);
      if (response.data.status === true) {
        this.timelineData = response.data.timelineData;
      }
    },
  },
  mounted() {
    this.token = this.$cookies.get('token');
    this.buscarMensagens();
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
