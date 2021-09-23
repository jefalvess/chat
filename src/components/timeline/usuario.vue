<template>
    <div style="margin-top: 2rem;" class="bx--grid">
      <div  style=" height: 10em; display: flex; align-items: center; justify-content: center " class="bx--row">
        <img style="width: 10rem; height: 10rem; border-radius: 50%" v-bind:src="'static/'+ modalUser.usuario + '.png'" />
      </div>
      <div style=" height: 6rem; display: flex; align-items: center; justify-content: center; cursor: pointer" class="bx--row">
        <p @click="paginaPerfil()" style="font-size: 22px;"> {{ modalUser.usuario }} </p>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'usuario',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(['modalEdit', 'modalUser'])
  },
  methods: {
    // ir para pagina de perfil
    async paginaPerfil() {
      this.$router.push('/perfil');
    }
  }
};
</script>
