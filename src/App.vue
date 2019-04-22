<template>
  <div id="app">
    <span v-if="!isLoading">
      <span v-if="isLogin">
        <AdminDrawer v-if="Number(user.position_id) === 4" :user="user" @logOutSuccess="checkIsUserLogin" >
          <router-view/>
        </AdminDrawer>
        <EmployeeDrawer v-if="Number(user.position_id) === 3" :user="user" @logOutSuccess="checkIsUserLogin" >
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
  import LoginModal from '@/components/Login/Modal.vue';

  export default{
    components: {
      AdminDrawer,
      EmployeeDrawer,
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
  html, body {
    padding: 0;
    margin: 0;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .margin-t-md {
    margin-top: 15px;
  }
</style>
