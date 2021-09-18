<template>
    <div class="bx--row">
      <p style="font-size: 22px;">Usuario conectado : {{ modalEdit }} </p>
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
};
</script>
