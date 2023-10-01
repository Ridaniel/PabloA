import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '../views/MainPage.vue';
import ResumePage from '../views/ResumePage.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainPage
    },
    {
      path: '/resume',
      name: 'resume',
      component: ResumePage
    }
  ]
});
