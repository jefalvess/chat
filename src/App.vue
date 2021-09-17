<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header';
export default {
  name: 'app',
  components: {
    Header
  }
};
</script>

<style lang="scss">
@import './styles/carbon';

.bx--tabs__nav-item--selected {
  background-color: #ffffff;
}
</style>
