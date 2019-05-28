<template>
  <div id="app">
    <div class="container mt-5">
      <h1 class="h4 mb-5">ACME COMPANY</h1>
      <div class="mb-3">
        <router-link class="btn btn-link" to="/">TOP</router-link>
        <router-link class="btn btn-link" to="/service/ec">EC SITE</router-link>
        <router-link class="btn btn-link" to="/service/consulting">CONSULTING</router-link>
        <router-link class="btn btn-link" to="/about">ABOUT</router-link>
      </div>
      <router-view />
      <div class="mb-3">
        <router-link class="btn btn-link" to="/">TOP</router-link>
        <router-link class="btn btn-link" to="/service/ec">EC SITE</router-link>
        <router-link class="btn btn-link" to="/service/consulting">CONSULTING</router-link>
        <router-link class="btn btn-link" to="/about">ABOUT</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
    }
  },
}
</script>

<style>
  .container{
    max-width: 480px;
  }
  .router-link-exact-active,
  .router-link-exact-active:hover,
  .router-link-exact-active:focus{
    color: gray;
    text-decoration: none;
  }
</style>
