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
         <router-link to="/user">
          <el-menu-item index="2">
            <i class="tiny material-icons">people</i>
            <span slot="title">จัดการผู้ใช้งานระบบ</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
    
    <el-container>
      <el-header style="font-size: 18px">
        <el-row>
          <el-col :span="12" style="text-align: left;">
            <el-button className="menu-button" @click="isCollapse = !isCollapse" icon="el-icon-more" circle>
            </el-button>
          </el-col>
          <el-col :span="12" style="text-align: right;"><span @click="userLogout">Admin</span></el-col>
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
    data() {
      const item = {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      };
      return {
        tableData: Array(20).fill(item),
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
  @import '@/assets/scss/styles.scss';

  a {
    text-decoration: none;
  }

  .el-header {
    background-color: $primary;
    color: rgb(255, 255, 255);
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }

  .el-menu-vertical {
    height: 100%;
  
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  .menu-button {
    background-color: white;
    border: none;

    &:hover {
      background-color: red;
    }
  }
</style>