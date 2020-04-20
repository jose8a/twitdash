// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import { gameStore } from './store.js'

Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store(gameStore);

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App },
});


