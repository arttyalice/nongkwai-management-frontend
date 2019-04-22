<template>
  <div class="hello">
    Welcome to NongKwai 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop()
  private msg!: string;
}
</script>

<style scoped lang="scss">
  .hello {
    font-size: 36px;
  }
</style>
