<template>
  <span>
    <div class="hello">
      <b>ยินดีต้อนรับเข้าสู่<br>ระบบสารสนเทศเพื่อการบริหารจัดการข้อมูลผู้สูงอายุ ผู้พิการ และผู้ป่วยโรคเอดส์</b>
    </div>
    <div class="hello">
      <p>เทศบาลตำบลหนองควาย จังหวัดเชียงใหม่</p>
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
    font-size: 26px;
  }
</style>
