# Vue.js で作る SPA

## Single Page Application 

Single Page Application(SPA) は、
ページの遷移を JavaScript で制御する新しい Web ページの仕組みです。

Single Page Application では、
ページ遷移時の際、ページの共通部分を残したまま、
ページ遷移により変化する部分のみを読み込み、JavaScript で画面を更新します。

- 差分のみの更新となるため、画面遷移が高速でスムーズに進む
- ページ遷移を JS で制御するため、読み込み中に画面が真っ白になることがない

Web ブラウザの History API を用いて、ブラウザの URL 部分も変化させることで、
通常の Web ページ遷移と同じような体験をユーザに与えることも可能です。

## VueRouter を用いた SPA 制作

VueRouter は Vue.js で SPA を開発するためのライブラリです。

https://router.vuejs.org/ja/

```bash
$ npm i vue-router
```

VueRouter のインストールが完了したら、エントリーファイルから以下のような形で利用します。

```js
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import App from './App.vue'

const router = new VueRouter({
  routes : []
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
```

App.vueの側では以下のように記述して、`router-view` 要素を用いて SPA ルートを描画できるようにします。

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

この状態でブラウザから画面を確認してみましょう。

ブラウザには 期待通りタイトルが表示される他、URL の欄に `#` が付与されているのに気づくと思います。

VueRouter の SPA では この様に `#` を用いて複数のページを表現できるようになっています。

ページの設定を追加することで、追加した `router-view` 要素の箇所にページ内容が表示される仕組みです。

### ページの設定を追加する

ページの設定を追加する前に、トップページの画面を作成してみましょう。

Vue Router を利用した SPA では、 SPA の各ページも Vue コンポーネントで作成します。

App.vue の隣に `views` フォルダを作成して、以下のような形で`./views/Top.vue` を作成してみましょう。

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

続いてページの設定は、エントリファイルで記述した `new VueRouter` のオプション `routes` に配列で定義していきます。

上記の `Top.vue` をSPAのトップページ `#/` で表示する場合、以下のような設定を記述します。

```js
import TopView from "./views/Top.vue"

const router = new VueRouter({
  routes : [
    { path: '/', component: TopView},
  ]
})
```

同様に `views` フォルダ内に `About.vue` を作成して、
`#/about` で表示する場合、以下のように設定することが可能です。

```js
import TopView from "./views/Top.vue"
import TopView from "./views/About.vue"

const router = new VueRouter({
  routes : [
    { path: '/', component: TopView},
    { path: '/about', component: AboutView},
  ]
})
```

上記のルートは URLの `#` 以降の部分を `#/about` と変更することで確認が可能です。

### router-link の利用

SPA のページ構成でリンクを貼る場合 `router-link` 要素が利用可能です。

共通部分である `App.vue` にナビゲーションを追加してみましょう。

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

エントリーファイルの設定で利用した `path` の値を `to` 属性に記述することで、
指定したページへのリンクが生成されます。

router-link は ブラウザでの表示時には 通常の a要素に置き換えられるため、
a 要素としての装飾を適用することが可能です。

また、現在表示されているルートへのリンクには `router-link-exact-active` クラスが付与され、 
先方一致するルート には `router-link-active` クラスが付与されるようになっているため、
現在のナビゲーションに応じて 装飾をカスタマイズする上でも非常に便利です。

router-link の詳しい機能については、公式ドキュメントでも解説されています。

https://router.vuejs.org/ja/api/#router-link

::: tip
`router-link-active` の性質上、`<router-link to="/">` には、
大抵のケースで `router-link-active` が付きます。
:::

::: tip
router-link は SPA 内のルートの遷移に利用します。通常の外部リンク等は a 要素で記述しましょう。
:::

## ルートパラメータの利用

VueRouter では、パラメータ付きのルートを利用することも可能です。

以下のように `:` 付きのルートセグメントを用いることで、
セグメントの中身を変数として取得することが可能になります。

```js
const router = new VueRouter({
  routes : [
    { path: '/', component: TopView},
    { path: '/service/:category', component: ServiceView},
    { path: '/about', component: AboutView},
  ]
})
```

上記のルート `/service/:category` は `/service/ec` `/service/consulting` など任意の文字列にマッチするするよう働きます。

実際に URL 上で利用された値を、パラメータとして取得する際には `$route` を利用します。

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

`this.$route` は URL に関する様々な情報を持つオブジェクトです。

- `this.$route.params` `:` で記述された path内のパラメータを取得する
- `this.$route.query` URLの末尾に `?`  を付与して記述された クエリパラメータを取得する
- `this.$route.path` `#` 以降のマッチしたパスを取得する

### 動的ルートの再利用

path 内にパラメータを含む動的なルートを利用する場合、少し注意が必要です。

App.vue で以下のような形のナビゲーションを作成して、`/service/ec` `/service/consulting` のリンクを作成してみましょう。

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

以下のような `./views/Service.vue` を作成してルートに紐づけ、
ナビゲーションから `/service/ec` `/service/consulting` の表示を切り替えてみましょう。

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

画面のタイトルは期待通り、`Service - ec` `Service - consulting` に切り替わります。

しかし console　を確認してみると `page mounted` の出力は １回しか行われていないのがわかると思います。
一度 top への画面遷移をはさんで service に再度戻ってくると再び `page mounted` が表示されます。

SPA における ページ用のコンポーネントは、ルート変更時に再利用されるため、
動的なルート内での画面変化では、 `mounted` が再度コールされることはありません。

このような問題に対応したい場合、`watch` のセクションが利用可能です。

`watch` は特定の変数の変更を監視するためのセクションで、ここに `$route` を指定することで、
ルート変更時の処理を記述することができるようになっています。

## SPA のスクロール制御

SPA では JavaScript を用いた画面要素の変化を用いて擬似的にページ遷移を実現しています。

そのため、ページ遷移の挙動がブラウザ固有のページ遷移とは若干異なる場面もあり、スクロールなどはその代表的な例です。

App.vue に付与していた上部のナビゲーションをフッターとして 下部にも配置してみましょう。

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
      <div class="mb-3">
        <router-link class="btn btn-link" to="/">TOP</router-link>
        <router-link class="btn btn-link" to="/service/ec">EC SITE</router-link>
        <router-link class="btn btn-link" to="/service/consulting">CONSULTING</router-link>
        <router-link class="btn btn-link" to="/about">ABOUT</router-link>
      </div>
    </div>
  </div>
</template>
```

ページ内のコンテンツをスクロールが発生する程度に十分長くとって、フッター経由のページ遷移を行った時、
スクロール位置が固定されているのがわかると思います。

通常多くのケースではスクロール時に,ページトップに戻る処理を加えたいでしょう。

ページ遷移時のスクロール制御は `new VueRouter` 実行時のオプションとして 
`scrollBehavior` 関数で定義します。

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

上記のような設定を追記することで、ページ遷移時にページトップ位置までスクロールを戻すことが可能です。

`0` の数値を任意の値に差し替えて、任意のスクロール位置まで調整することも可能です。

## SPA のビルド設定

SPA は JavaScript でページ遷移を実現する技術です。
ページ内で利用されるテキストやHTMLの構造も JavaScript に取り込まれて JavaScript として配信されます。

標準の Webpack 設定では、ページに必要な JavaScript のファイルは １つにまとめて出力されるため、
ページ数が増える毎に、JavaScript のサイズはどんどんと肥大化していきます。

複雑で大規模な SPA ページでは、すべての ページ情報を一つの JS ファイルにまとめて配信するよりも、
一つ一つのページごとに分割して配信するほうが便利なケースも多いでしょう。

Webpack 2 の動的 import を利用して、コード分割機能を実現する場合、
既存のページ用コンポーネントの import を削除した上で以下のようにルートを記述します。

```js
const router = new VueRouter({
  routes : [
    { path: '/', component: () => import('./views/Top.vue')},
    { path: '/service/:category', component: () => import('./views/Service.vue')},
    { path: '/about', component: () => import('./views/About.vue')},
  ]
})
```

`component: () => import('./views/Top.vue')` の形でページを定義することで、
JSファイルは ページ単位で吐き出され、一つ一つのJS のサイズも小さくすることが可能になります。

::: tip
実際に `npm run build` コマンドを叩いて、 出力される JS ファイルの違いを確認してみましょう。
:::


