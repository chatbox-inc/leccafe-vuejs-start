<template>
  <div id="app">
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Navbar</a>
        <!--        <a class="navbar-toggler">-->
        <!--          <span class="navbar-toggler-icon" />-->
        <!--        </a>-->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li :class="navItemClassTop" @click="scrollToTop">
              <a class="nav-link" >Top</a>
            </li>
            <li :class="navItemClassConcept" @click="scrollToConcept">
              <a class="nav-link" >Concept</a>
            </li>
            <li :class="navItemClassService" @click="scrollToService">
              <a class="nav-link" >Service</a>
            </li>
            <li :class="navItemClassJoinUs" @click="scrollToJoinUs">
              <a class="nav-link" >Join Us</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-5 mb-5">
      <br><br>
      <h1 class="h4 mb-5">Owesome Title</h1>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <h2 id="concept">Concept</h2>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <h2 id="service">Service</h2>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <h2 id="joinus">Join Us</h2>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>
      <p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at consectetur dolorem eaque explicabo facere labore magnam necessitatibus neque odit porro quaerat qui quidem reprehenderit, repudiandae vero voluptas voluptates voluptatibus.</p>

    </div>
    <div :class="topBtnClass" @click="scrollToTop">
      <a >トップへ戻る</a>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        scrollY: 0,
      }
    },
    computed:{
      topBtnClass(){
        return {
          "btn-top": true,
          "active": this.scrollY > 200,
        }
      },
      navItemClassTop(){
        const tar1 = document.querySelector("body")
        const tar2 = document.querySelector("#concept")
        if(this.scrollY > 0 && tar1 && tar2) {
          return {
            "nav-item": true,
            "active": tar1.getBoundingClientRect().y < this.scrollY && this.scrollY < tar2.getBoundingClientRect().y
          }
        }else{
          return {
            "nav-item": true,
          }
        }
      },
      navItemClassConcept(){
        const tar1 = document.querySelector("#concept")
        const tar2 = document.querySelector("#service")
        if(this.scrollY && tar1 && tar2) {
          return {
            "nav-item": true,
            "active": tar1.getBoundingClientRect().y < this.scrollY && this.scrollY < tar2.getBoundingClientRect().y
          }
        }else{
          return {
            "nav-item": true,
          }
        }
      },
      navItemClassService(){
        const tar1 = document.querySelector("#service")
        const tar2 = document.querySelector("#joinus")
        if(this.scrollY && tar1 && tar2) {
          return {
            "nav-item": true,
            "active": tar1.getBoundingClientRect().y < this.scrollY && this.scrollY < tar2.getBoundingClientRect().y
          }
        }else{
          return {
            "nav-item": true,
          }
        }
      },
      navItemClassJoinUs(){
        const tar1 = document.querySelector("#joinus")
        const tar2 = document.querySelector("body")
        if(this.scrollY && tar1 && tar2) {
          return {
            "nav-item": true,
            "active": tar1.getBoundingClientRect().y < this.scrollY && this.scrollY < tar2.getBoundingClientRect().height
          }
        }else{
          return {
            "nav-item": true,
          }
        }
      },
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
      scrollToTop(){
        this.$scrollTo("body",500)
      },
      scrollToService(){
        this.$scrollTo("#service",500)
      },
      scrollToConcept(){
        this.$scrollTo("#concept",500)
      },
      scrollToJoinUs(){
        this.$scrollTo("#joinus",500)
      },
      handleScroll(){
        this.scrollY = window.scrollY;
      }
    }
  }
</script>

<style>
  .container{
    max-width: 480px;
  }

  .btn-top{
    display: none;
    position: fixed;
    bottom: 0;
    text-align: center;
    background: rgba(33,33,33,0.7);
    letter-spacing: 2px;
    font-weight: bold;
    color: white;
    width: 100%;
    height: 4em;
    line-height: 4em;
  }
  .btn-top.active{
    display: block;
  }
</style>