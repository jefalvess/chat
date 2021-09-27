<template>
  
<div style="width: 100%; padding-right: 1rem;" > 

       <!-- direita -->
      <div  class="result">
            <img style="float: right; width: 2rem; height: 2rem; border-radius: 50%; margin-top: 1rem; " v-bind:src="'static/' + message.from + '.png'" />
          <div style="    margin-right: 1rem;min-height: 1rem; background-color: white; margin-left: 0.5rem; margin-top: 0.5rem; padding-top: 0.5rem; padding-bottom: 0.5rem; border-radius: 25px; padding: 1rem; " class="bx--col--lg" >  {{ message.message }} </div>
      </div>
      
</div>

</template>

<script> 
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'cards',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['cookieUserJson'])
  },
  methods: {
    ...mapActions(['setLoadingPage']),
    editProposal(id, status, squad) {
      this.setLoadingPage(true);
      if (
        status == 'draft' &&
        (squad == this.cookieUserJson.squad[0] ||
          squad == this.cookieUserJson.squad[1])
      ) {
        let currentUrl = window.location.origin;
        let nextUrl = '';
        nextUrl = currentUrl + '/hw/termsproposal/' + id;
        window.open(nextUrl, '_self');
      } else {
        let currentUrl = window.location.origin;
        let nextUrl = '';
        nextUrl = currentUrl + '/hw/preview/' + id;
        window.open(nextUrl, '_self');
      }
    }
  }
};
</script>

<style> 

.wrap {
  display: flex;
  width: 100%;
  justify-content: space-between;
}

.result {
  margin-top: 20px;
}

.result:after {
  content: '';
  display: table;
  clear: both;
}

.result div {
  float: left;
}
.result div:last-child {
  float: right;
}

</style> 
