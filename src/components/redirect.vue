<template>
  <div style="margin-bottom: 11rem" class="bx--grid-home">
    <cv-loading overlay></cv-loading>
  </div>
</template>

<script>
export default {
  name: 'redirect',
  mounted() {
    window.open(`${window.location.origin}/api/user/login`, '_self');
  }
};
</script>
