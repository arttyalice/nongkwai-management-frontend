<template>
  <div id="app">
    <span v-if="!isLoading">
      <span v-if="isLogin">
        <AdminDrawer v-if="Number(user.position_id) === 4" :user="user" @logOutSuccess="checkIsUserLogin" >
          <router-view/>
        </AdminDrawer>
        <ManagerDrawer v-else-if="Number(user.position_id) === 2" :user="user" @logOutSuccess="checkIsUserLogin" >
          <router-view/>
        </ManagerDrawer>
        <DirectorDrawer v-else-if="Number(user.position_id) === 1" :user="user" @logOutSuccess="checkIsUserLogin" >
          <router-view/>
        </DirectorDrawer>
        <EmployeeDrawer v-else :user="user" @logOutSuccess="checkIsUserLogin" >
          <router-view/>
        </EmployeeDrawer>
      </span>
      <LoginModal v-else @logInSuccess="checkIsUserLogin"/>
    </span>
    <span v-else>
      Loading ...
    </span>
  </div>
</template>

<script>
  import userService from '@/services/user';
  import { Loading } from 'element-ui';
  import AdminDrawer from '@/layout/admin.vue';
  import EmployeeDrawer from '@/layout/employee.vue';
  import ManagerDrawer from '@/layout/manager.vue';
  import DirectorDrawer from '@/layout/director.vue';
  import LoginModal from '@/components/Login/Modal.vue';

  export default{
    components: {
      AdminDrawer,
      EmployeeDrawer,
      ManagerDrawer,
      DirectorDrawer,
      LoginModal,
    },
    data() {
      return {
        isLoading: true,
        isLogin: false,
        loader: null,
        user: {},
      };
    },
    created() {
      this.loader = Loading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 1)',
      });
    },
    async mounted() {
      await this.checkIsUserLogin();
      this.loader.close();
      this.isLoading = false;
    },
    methods: {
      async checkIsUserLogin() {
        const userID = localStorage.getItem('admin_user_data');
        if (userID !== null) {
          this.user = await userService.getUserbyID(JSON.parse(userID));
          this.isLogin = true;
        } else {
          this.isLogin = false;
        }
      },
    },
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Kanit:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&display=swap&subset=thai');
  
  html, body {
    padding: 0;
    margin: 0;
  }
  
  #app {
    font-family: 'Kanit', Helvetica, Arial, sans-serif!important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  .margin-t-md {
    margin-top: 15px;
  }
</style>
