<template>
  <div style="margin-bottom: 3.1rem" class="bx--row">
    <cv-header aria-label="Carbon header">
     <cv-header-menu-button aria-label="Header menu" aria-controls="side-nav" />
  
        <cv-header-name style="cursor: pointer" @click="redirect()" prefix="Projeto">
          [Rede Social]
        </cv-header-name>

        <template>
          <cv-side-nav id="side-nav" rail>
            <cv-side-nav-items>
                <cv-side-nav-link href="javascript:void(0)">
                  Usuario Conectados
                </cv-side-nav-link>
              
            </cv-side-nav-items>
          </cv-side-nav>
        </template>

        <template slot="header-global">
           <p style="cursor: pointer" @click="logoff()" class="confidential"> Sair </p>
        </template>


    </cv-header>
  </div>
</template>

<script>
// const chat = () => import('./perfil/chat.vue');

export default {
  name: 'header-page',
  components: {
    // chat
  },
  methods: {
    redirect() {
      return window.open(`${window.location.origin}/`, '_self');
    },
    async logoff (){
      this.$cookies.remove("token");
       this.$router.push('/');

      
    }
  }
};
</script>

<style>
.confidential {
  font-weight: bold;
  color: #ffffff;
  margin: 0.7rem 0.5rem 0.5rem;
}
</style>
