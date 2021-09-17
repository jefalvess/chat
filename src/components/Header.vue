<template>
  <div style="margin-bottom: 3.1rem" class="bx--row">
    <cv-header aria-label="Carbon header">
      <cv-header-name style="cursor: pointer" @click="redirect()" prefix="IBM">
        Project 
      </cv-header-name>
      <template slot="header-global">
        <p class="confidential"> Chat </p>
      </template>
    </cv-header>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'header-page',
  computed: {
    ...mapGetters(['cookieUserJson'])
  },

  methods: {
    ...mapActions(['setLoadingPage']),
    redirect() {
      return window.open(`${window.location.origin}/`, '_self');
    },
    checarToken(){
      // console.log('Checar token de acesso ')
      // console.log(this.cookieUserJson)
      // this.$cookies.set("token", "teste", "8h")

      let cookie = this.$cookies.get("token")
      
      console.log(cookie)

    }

  },
  mounted() {
    this.checarToken();
  },
};
</script>

<style>
.confidential {
  font-weight: bold;
  color: #ffffff;
  margin: 0.7rem 0.5rem 0.5rem;
}
</style>
