<template>
  <div
    class="bx--grid"
  >
    <div class="bx--row">
     <div class="bx--col-lg-3">
     1
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
import { mapGetters, mapActions } from 'vuex';
const chat = () => import('./chat.vue');
const timeline = () => import('./timeline.vue');

export default {
  data() {
    return {
    };
  },
  components: {
    chat,
    timeline
  },
  computed: {
    ...mapGetters([ 'modalEdit']),
  },
  methods: {
    ...mapActions(['setLoadingPage', 'setModalEdit']),
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
