<template>
  <div
    class="bx--grid"
  >
    <div class="bx--row">
     <div class="bx--col-lg-3">
     <usuario />
     </div>
      <div class="bx--col-lg-4">
     <timeline />
     </div>
      <div class="bx--col-lg-3">
       <chat />
     </div>

    </div>
 
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
const chat = () => import('./chat.vue');
const timeline = () => import('./timeline.vue');
const usuario = () => import('./usuario.vue');

export default {
  name: 'page',
  components: {
    chat,
    timeline,
    usuario
  },
  computed: {
    ...mapGetters([ 'modalEdit']),
  },
  methods: {
    checarUsuario() {
      if (this.modalEdit === '') {
        this.$router.push('/');
      } 
    }
  },
  mounted() {
    this.checarUsuario();
  }
};
</script>
