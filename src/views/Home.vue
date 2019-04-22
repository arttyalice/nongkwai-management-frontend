<template>
  <div class="home">
    <Index />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import Index from '@/components/Home/index.vue';

  @Component({
    components: {
      Index,
    },
  })
  export default class Home extends Vue {}
</script>
