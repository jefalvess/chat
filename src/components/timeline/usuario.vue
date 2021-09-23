<template>
    <div style="margin-top: 2rem;" class="bx--grid">
      <div  style=" height: 10em; display: flex; align-items: center; justify-content: center " class="bx--row">
         <img style="width: 10rem; height: 10rem; border-radius: 50%;" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png">
      </div>
      <div style=" height: 6rem; display: flex; align-items: center; justify-content: center; cursor: pointer" class="bx--row">
        <p @click="paginaPerfil()" style="font-size: 22px;"> {{ modalEdit }} </p>
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
    ...mapGetters(['modalEdit']),
  },
  methods: {
    // ir para pagina de perfil
    async paginaPerfil() {
      this.$router.push('/perfil');
    }
  }
};
</script>
