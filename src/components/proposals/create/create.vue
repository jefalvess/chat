<template>
  <div
    style="width: 50rem; margin-bottom: 7rem; margin-top: 7rem;"
    class="bx--grid"
  >
    <!-- Login -->
    <div class="bx--row">
      <cv-text-input label="Opportunity Number" v-model="usuario">
      </cv-text-input>
    </div>
    <div class="bx--row">
      <button @click="createUser()">Criar usuario</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      usuario: ''
    };
  },
  computed: {
    ...mapGetters(['modalEdit']),
  },
  methods: {
    ...mapActions(['setModalEdit']),
    // Criar usuario / Login
    createUser() {
      this.setModalEdit(this.usuario);
      this.$router.push('/chat');
    }
  }
};
</script>
