<template>
  <div style="margin-bottom: 3.1rem" class="bx--row">
    <cv-header aria-label="Carbon header">
      <cv-header-name style="cursor: pointer" @click="redirect()" prefix="IBM">
        Proposal XP
      </cv-header-name>
      <template slot="header-global">
        <p class="confidential">IBM Confidential</p>
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
      let page = window.location.href.split('/');
      console.log(page);
      if (page[3] !== '') {
        this.setLoadingPage(true);
        if (page[3] === 'approver') {
          return window.open(`${window.location.origin}/approver`, '_self');
        }

        if (page[3] === 'sales') {
          return window.open(`${window.location.origin}/sales`, '_self');
        }

        if (page[3] === 'error') {
          return window.open(`${window.location.origin}/`, '_self');
        }
      }
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
