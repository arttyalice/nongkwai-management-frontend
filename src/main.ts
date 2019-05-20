import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/th';
import 'element-ui/lib/theme-chalk/index.css';
import * as VueGoogleMaps from 'vue2-google-maps'
import VueTheMask from 'vue-the-mask'
// import VueMoney from 'v-money'

Vue.config.productionTip = false;

Vue.use(ElementUI, { locale });
Vue.use(VueTheMask)
// Vue.use(VueMoney,  {precision: 0, thousands: ',' })
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAKhO_LSvsovaA2bT5pZGh5wZkUWqogoi4',
    libraries: 'places',
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
