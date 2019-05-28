# Vue.js と axios 通信

## REST API の通信

axios

https://github.com/axios/axios


## VueRouter を用いた SPA 制作

VueRouter は Vue.js で SPA を開発

https://router.vuejs.org/ja/

```bash
$ npm i vue-router
```

VueRouter のインストールが完了したら、

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './App.vue'

import TopView from './views/Top.vue'
import AboutView from './views/About.vue'

const router = new VueRouter({
  routes : [
    { path: '/', component: TopView},
    { path: '/about', component: AboutView},
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

App.vueの側では以下のように記述して、SPA ルートを描画できるようにします。

```vue
<template>
  <div id="app">
    <div class="container mt-5">
      <h1 class="h4 mb-5">ACME COMPANY</h1>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return { }
  },
}
</script>

<style>
  .container{
    max-width: 480px;
  }
</style>
```

`views/Top.vue` や `views/About.vue` は以下のような形で定義します。

```vue
<template>
  <div>
    <h1 class="h4 mb-3">Welcome</h1>
    <div>...</div>
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
}
</script>

<style>
</style>
```

```vue
<template>
  <div>
    <h1 class="h4 mb-3">About</h1>
    <div>...</div>
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
}
</script>

<style>
</style>
```

VueRouter を利用することで SPA の構成が簡単に

URLを書き換えて

コンポーネントを利用して

### router-link の利用

リンクを貼る場合

```vue
<template>
  <div id="app">
    <div class="container mt-5">
      <h1 class="h4 mb-5">ACME COMPANY</h1>
      <div class="mb-3">
        <router-link class="btn btn-link" to="/">TOP</router-link>
        <router-link class="btn btn-link" to="/about">ABOUT</router-link>
      </div>
      <router-view />
    </div>
  </div>
</template>
```


::: tip
この様に `.vue` のファイル形式で作成された HTML 部品を、Vue コンポーネントと呼びます。
:::

## ルートパラメータの利用

ルートパラメータを…

```js
import TopView from './views/Top.vue'
import ServiceView from './views/Service.vue'
import AboutView from './views/About.vue'

const router = new VueRouter({
  routes : [
    { path: '/', component: TopView},
    { path: '/service/:category', component: ServiceView},
    { path: '/about', component: AboutView},
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

ルートパラメータは...

```vue
<template>
  <div>
    <h1 class="h4 mb-3">Service - {{ category }}</h1>
    <div> ... </div>
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
  computed: {
    category(){
      return this.$route.params.category
    }
  }
}
</script>

<style>
</style>
```

### 動的ルートの再利用


```vue
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
    </div>
  </div>
</template>
```

```vue
<template>
  <div>
    <h1 class="h4 mb-3">Service - {{ category }}</h1>
    <div> ... </div>
  </div>
</template>

<script>
export default {
  data(){
    return {}
  },
  computed: {
    category(){
      return this.$route.params.category
    }
  },
  watch: {
    '$route' (to, from) {
        console.log("route changed!")
    }
  },
  mounted() {
      conosole.log("page mounted")
  }
}
</script>

<style>
</style>
```

## SPA のスクロール制御

```js
const router = new VueRouter({
  routes: [
      // ...
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
```

## SPA のビルド設定

SPA 大きくなれば大きくなる


```js
const router = new VueRouter({
  routes : [
    { path: '/', component: () => import('./views/Top.vue')},
    { path: '/service/:category', component: () => import('./views/Service.vue')},
    { path: '/about', component: () => import('./views/About.vue')},
  ]
})
```


