import Vue from 'vue';
import Router from 'vue-router';
// Dash Board
import Home from './views/Home.vue';
// User Components
import User from './views/User.vue';
// Person Components
import Person from './views/Person/index.vue';
import ManagePerson from './views/Person/manage.vue';
import InsertPerson from './views/Person/insert.vue';
import UpdatePerson from './views/Person/update.vue';
// Aid Components
import Aid from './views/Aids/index.vue';
import ManageAid from './views/Aids/manage.vue';
import UpdateAid from './views/Aids/update.vue';
// Elder Components
import Elder from './views/Elders/index.vue';
import ManageElder from './views/Elders/manage.vue';
import UpdateElder from './views/Elders/update.vue';
// Disabled Components
import Disabled from './views/Disabled/index.vue';
import ManageDisabled from './views/Disabled/manage.vue';
import UpdateDisabled from './views/Disabled/update.vue';
// Visiting Component
import Visiting from './views/Visiting/index.vue';
import ManageVisiting from './views/Visiting/manage.vue';
import VisitingADLSummary from './views/Visiting/adl/summary/index.vue';
import InsertVisiting from './views/Visiting/insert.vue';
import UpdateVisiting from './views/Visiting/update.vue';
// Treatment Component
import Treatment from './views/Treatment/index.vue'
import ManageTreatment from './views/Treatment/manage.vue'
import InsertTreatment from './views/Treatment/insert.vue'
// Allowance Component
import Allowance from './views/Allowance.vue'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/user',
      name: 'user management',
      component: User,
    },
    {
      path: '/person',
      component: Person,
      children: [
        { path: '', component: ManagePerson },
        { path: 'insert', component: InsertPerson },
        { path: 'update/:pID', component: UpdatePerson },
      ]
    },
    {
      path: '/elder',
      component: Elder,
      children: [
        { path: '', component: ManageElder },
        { path: 'update/:pID', component: UpdateElder },
      ]
    },
    {
      path: '/aid',
      component: Aid,
      children: [
        { path: '', component: ManageAid },
        { path: 'update/:pID', component: UpdateAid },
      ]
    },
    {
      path: '/disabled',
      component: Disabled,
      children: [
        { path: '', component: ManageDisabled },
        { path: 'update/:pID', component: UpdateDisabled },
      ]
    },
    {
      path: '/visiting',
      component: Visiting,
      children: [
        { path: '', component: ManageVisiting },
        { path: 'adl/summary/:adlID', component: VisitingADLSummary },
        { path: 'insert/:pID', component: InsertVisiting },
        { path: 'update/:pID', component: UpdateVisiting },
      ]
    },
    {
      path: '/treatment',
      component: Treatment,
      children: [
        { path: '', component: ManageTreatment },
        { path: 'insert', component: InsertTreatment },
      ]
    },
    {
      path: "/allowance",
      component: Allowance
    }
  ],
});
