<template>
  <div id="app">
    <Navbar></Navbar>
    <Hello v-if="page"></Hello>
    <router-view></router-view>
  </div>
</template>



<script>
import Navbar from './components/partials/Navbar'
import Child from './components/Child'
import Hello from './components/Hello'

export default {
  name: 'app',
  data: {
    page: true
  },
  created () {
    this.page = true;
  },
  components: {
    Navbar, Child, Hello
  },
  mounted () {
    this.page = false;
  }

}
</script>


<style lang="scss">
$border-width: 2px;
$card-border-width: 2px;
@import "~bootstrap/scss/bootstrap";

.router-link-active {
  color: $brand-primary !important;
}
</style>
