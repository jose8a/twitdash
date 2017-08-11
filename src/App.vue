<template>
  <div id="app">
    <nav-header></nav-header>
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader';
import User from './components/User';

export default {
  name: 'app',
  components: {
    NavHeader,
    User,
  },
};
</script>

<style>
</style>
