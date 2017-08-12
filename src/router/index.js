import Vue from 'vue';
import Router from 'vue-router';
import ListIndex from '@/components/ListIndex';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListIndex,
    },
  ],
});
