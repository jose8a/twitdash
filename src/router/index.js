import Vue from 'vue';
import Router from 'vue-router';
import ListIndex from '@/components/ListIndex';
import Timeline from '@/components/Timeline';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListIndex,
    },
    {
      path: '/lists',
      name: 'lists',
      component: ListIndex,
    },
    {
      path: '/lists/:listname',
      name: 'timeline',
      component: Timeline,
    },
  ],
});
