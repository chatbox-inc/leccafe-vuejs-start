# Vue.js で作る問い合わせフォーム

プロジェクトの準備ができたところで、
実際に問い合わせフォームを作成してみましょう。

## Vue.js のプロジェクト

`vue-cli` で生成されたプロジェクトの中の src フォルダを確認してみましょう。

`src/main.js` は Vue.js の起動処理です。

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Vue を初期化して public/index.html の #app に適用する
new Vue({
  render: h => h(App),
}).$mount('#app')
```

`import ... from ...` はモジュールの読み込み処理です。

npm 経由でインストールされた `vue` モジュールと
`App.vue` のファイルを読み込んでいます。

`src/App.vue` は画面に表示されるメインのファイルです。

`src/App.vue` の template 要素を変更することで画面が変化することを確認してみましょう。

### vue ファイルの利用

vue ファイルは `template` `script` `style` の ３つの要素からなる
HTML 形式のファイルです。

`template` には HTML、 `script` には JavaScript 、
 `style` には CSS を記述して画面に反映することが可能になっています。

`template` に HTML を記述する際には、
`template` の直下には唯一つのHTML要素しか置くことができません。

`template` の直下に複数の HTML要素を兄弟要素として配置するとエラーになるため注意してください。

## データバインディングを利用する

まずはじめに、 `src/App.vue` を以下のように書き換えてみましょう。

```vue
<template>
  <div id="app">
    {{message}}
  </div>
</template>

<script>
export default {
  data(){
    return {
      message : "Hello World",
    }
  }
}
</script>

<style>
</style>
```

画面に Hello World の文字が表示されるはずです。

::: v-pre
HTML 内で `{{...}}` の形式で記述された箇所が、Vue.js の処理により加工された場所になります。

script 内 `data` で定義した変数の値が、 `\{{ ... }}` の内部に置換される仕組みになっています。
複数の変数を定義して、動作を確認してみましょう。
:::

### 双方向バインディング

Vue.js の主要な機能の一つとして、フォームの双方向バインディングという機能があります。

フォーム要素に `v-model` 属性を適用することで、
フォームの値と変数を紐付けることができます。

```vue
<template>
  <div id="app">
    <div>
        名前 <input type="text" name="name" v-model="form.name">
    </div>
    <p>{{form.name}}</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        name: ""
      }
    }
  }
}
</script>

<style>
</style>
```

フォームの値を変化させると、画面に入力値が逐次表示されるのが確認できるはずです。

::: v-pre
`{{...}}`の内部では 簡単な JavaScript の文法を利用する事ができます。
例えば以下のようにして、シンプルな文字数カウンタを作成する事が可能です。
:::

```vue
<template>
  <div id="app">
    名前 <input type="text" name="name" v-model="form.name">
    <p>{{form.name.length}}/20</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        name: ""
      }
    }
  }
}
</script>

<style>
</style>
```

::: tip 
`v-model` のような Vue.js 独自の属性を 「ディレクティブ」と呼びます。
Vue.js の[公式ドキュメント](https://jp.vuejs.org/v2/api/#%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96) 
では、 Vue.js で利用可能な様々なディレクティブが紹介されています。
:::

## イベントハンドリング

画面上でのボタンクリックを取得するには `@click` の記法を用いることができます。

```vue
<template>
  <div id="app">
    <form action="">
      <div>
        名前 <input type="text" name="name" v-model="form.name">
      </div>
      <input type="submit" value="送信" @click="submit">

    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        name: ""
      }
    }
  },
  methods: {
    submit(e) {
      console.log(this.form)
      e.preventDefault()
    }
  }
}
</script>

<style>
</style>
```

`@click` は `a` や `button` などのクリック可能な要素に付与して、
クリック時の処理を定義する際に利用されます。

クリックされたときの処理は `script` のセクション内 `methods` にてそれぞれ記述し、
`@click` の属性値 に記述した関数名を入力します。

`script` のセクション内で `data` の値を参照するには、
`this.form` のように `this.` 付与してデータにアクセスする必要があります。

`methods` に記述した処理の第一引数では　イベントオブジェクトを取得することが可能で、
例えば `e.preventDefault()` を実行することで、
DOM 要素のデフォルトの処理をキャンセルすることが可能です。
（上記の例では `input[type=submit]` のフォーム送信処理をキャンセルしています。）

::: tip 
`@click` の他にも `@keyup` `@input` など様々なイベントを利用する事ができます。
:::



## v-if による画面制御

Vue.js の属性　`v-if` は画面上に表示された HTML の要素の表示・非表示を制御することが可能です。 

コードを以下のように書き換えてみましょう。 「名前を入力して下さい」というエラーメッセージの表示・非表示を
`error.name` 変数で制御しています。

```vue
<template>
  <div id="app">
    <form action="">
      <div>
        名前 <input type="text" name="name" v-model="form.name">
        <div v-if="error.name">名前を入力して下さい。</div>
      </div>
      <input type="submit" value="送信" @click="submit">

    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        name: ""
      },
      error: {
        name: false
      }
    }
  },
  methods: {
    submit(e) {
      this.error.name = true
      e.preventDefault()
    }
  }
}
</script>

<style>
</style>
```

「送信」 ボタンをクリックすることで `submite` 関数内で `error.name` が `true`
に変更され、 `v-if="error.name"` で非表示制御されていたエラーメッセージが表示されるようになります。

例えば `submit` を以下のように変更すれば、
エラーメッセージの表示・非表示は ボタンのクリックのたびに切り替わるようになるでしょう。

```vue
<script>
export default {
  data(){
    return {
        // ...
    }
  },
  methods: {
    submit(e) {
      this.error.name = !this.error.name
      e.preventDefault()
    }
  }
}
</script>
```

### バリデーションの制御

ここまでの記法を用いて、 JavaScript のロジックを利用しながら、
フォームのバリデーション処理を実装してみましょう。

```vue
<template>
  <div id="app">
    <form action="">
      <div>
        名前 <input type="text" name="name" v-model="form.name">
        <div v-if="error.name">名前を入力して下さい。</div>
      </div>
      <input type="submit" value="送信" @click="submit">

    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        name: ""
      },
      error: {
        name: false
      }
    }
  },
  methods: {
    submit(e) {
      if(this.form.name.length == 0){
        this.error.name = true
        e.preventDefault()
      }else{
        this.error.name = false
      }
    }
  }
}
</script>

<style>
</style>
```

上記のようにコードを変更することで、バリデーションの処理が実装されます。

フォームにデータが無いときには `this.form.name.length == 0` となり
`this.error.name = true` が実行されてエラーメッセージが表示されると共に、
`e.preventDefault()` によってフォームの送信処理がキャンセルされます。

一方で、フォームにデータが入力されている場合には、
エラーメッセージは非表示となり、フォームの送信処理が起動します。

::: tip 
実際のフォーム処理を作成するには、
PHPなどを用いたフォーム用のスクリプトが必要です。
ここではアドレスバーの内容が変化すれば、フォームの送信処理が完了したと考えてOKです。
:::

::: tip 
複雑なバリデーション処理を用いる場合、バリデーションライブラリの導入を検討すると効果的です。
:::



## TRY!

以下のような複数のフォーム要素を用いて実際のフォームに近い処理を実装してみましょう。

- お名前
- メールアドレス
- 件名
- 本文


