<template>
  <div id="app">
    <div class="container mt-5">
      <h1 class="h4 mb-5">Lec Cafe Events</h1>
      <router-view />
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
