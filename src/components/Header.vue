<template>
  <div style="margin-bottom: 3.1rem" class="bx--row">
    <cv-header aria-label="Carbon header">

  
        <cv-header-name style="cursor: pointer" @click="redirect()" prefix="Projeto">
          [Rede Social]
        </cv-header-name>

        <template slot="header-global">
           <p style="cursor: pointer" @click="logoff()" class="confidential"> Sair </p>
        </template>


    </cv-header>
  </div>
</template>

<script>
export default {
  name: 'header-page',
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
