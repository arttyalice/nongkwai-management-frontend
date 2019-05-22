<template>
    <el-container style="height: 100vh;">
        <el-aside :width="isCollapse ? '' : ''" style="background-color: rgb(238, 241, 246)">
            <el-menu default-active="2" class="el-menu-vertical" :collapse="isCollapse">
                <router-link to="/">
                    <el-menu-item index="2">
                      <i class="tiny material-icons">home</i>
                      <span slot="title">หน้าหลัก</span>
                    </el-menu-item>
                </router-link>
                <!-- <router-link to="/user">
                    <el-menu-item index="2">
                      <i class="tiny material-icons">people</i>
                      <span slot="title">จัดการผู้ใช้งานระบบ</span>
                    </el-menu-item>
                </router-link> -->
                <router-link to="/person">
                    <el-menu-item index="2">
                      <i class="tiny material-icons">person</i>
                      <span slot="title">จัดการข้อมูลประชากร</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/aid">
                    <el-menu-item index="2">
                      <i class="tiny material-icons">airline_seat_flat</i>
                      <span slot="title">ผู้ป่วยโรคเอดส์</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/disabled">
                    <el-menu-item index="2">
                      <i class="tiny material-icons">accessible</i>
                      <span slot="title">ผู้พิการ</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/elder">
                    <el-menu-item index="2">
                      <i class="tiny material-icons">wc</i>
                      <span slot="title">ผู้สูงอายุ</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/visiting">
                    <el-menu-item index="2">
                      <i class="tiny material-icons">location_on</i>
                      <span slot="title">เยี่ยมบ้าน</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/treatment">
                    <el-menu-item index="2">
                      <i class="tiny material-icons">favorite</i>
                      <span slot="title">การรักษา</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/allowance">
                    <el-menu-item index="2">
                      <i class="tiny material-icons">attach_money</i>
                      <span slot="title">ข้อมูลการรับเบี้ยยังชีพ</span>
                    </el-menu-item>
                </router-link>
                <router-link to="/report">
                    <el-menu-item index="2">
                        <i class="tiny material-icons">content_copy</i>
                        <span slot="title">รายงาน</span>
                    </el-menu-item>
                </router-link>
            </el-menu>
        </el-aside>

        <el-container>
            <el-header class="employee" style="font-size: 18px">
                <el-row>
                    <el-col :span="12" style="text-align: left;">
                    <el-button className="menu-button" @click="isCollapse = !isCollapse" icon="el-icon-more" circle>
                    </el-button>
                    </el-col>
                    <el-col :span="12" style="text-align: right;">
                      <el-popover
                        placement="bottom"  
                        trigger="click"
                      >
                        <el-button style="width: 100%;" @click="userLogout">ออกจากระบบ</el-button>
                        <el-button type="primary" slot="reference">{{ `${user.fistname} ${user.lastname}` }}</el-button>
                      </el-popover>
                    </el-col>
                </el-row>
            </el-header>
            
            <el-main>
                <slot></slot>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
  export default {
    props: ['user'],
    data() {
      return {
        isCollapse: false,
      };
    },
    methods: {
      userLogout() {
        localStorage.removeItem('admin_user_data');
        this.$emit('logOutSuccess');
      },
    },
  };
</script>

<style lang="scss">
  @import '@/assets/scss/color.scss';

  .el-header {
    &.employee {
      background-color: $primaryEmployee!important;
    }
  }

  .left-number {
    text-align: left!important;
  }

  .el-input-number.is-without-controls .el-input__inner {
    text-align: left;
  }
</style>