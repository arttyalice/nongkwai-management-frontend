<template>
  <span>
    <div class="hello">
      <b>ยินดีต้อนรับเข้าสู่ระบบจัดการประชากร</b>
    </div>
    <div class="hello">
      เทศบาลตำบล หนองควาย
    </div>
    <div>
      <img src="@/static/logo.png" alt="" srcset="" width="30%"> 
    </div>
  </span>
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
