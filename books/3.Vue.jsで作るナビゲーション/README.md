# Vue.js で作るナビゲーション

## ページをスクロールさせる

Vue.js での ページスクロール処理は `window.scrollTo` を使って JavaScript で実装します。

```js
export default {
    methods: {
        scroll(){
            window.scrollTo(0,0)
        }
    }
}
```

`window.scrollTo` はブラウザ上の標準の関数で、
２つの引数 `x` `y` 値で指定された座標上までブラウザをスクロールさせます。

https://developer.mozilla.org/ja/docs/Web/API/Window/scrollTo

通常はここにアニメーションの処理の適用などが必要となってくるため、
自前で実装するよりも `vue-scrollto` などのライブラリを利用して実装を進めるほうが一般的です。

### vue-scrollto を利用したスクロール処理

vue-scrollto は Vue.js でスクロール処理を実装するための
Vue.js プラグインです。

https://www.npmjs.com/package/vue-scrollto

Vue.js のライブラリを利用する場合、
ライブラリを npm 経由でインストールしてから、 Vue にプラグインを認識させる必要があります。

npm 経由でのインストールは ライブラリの配布サイトを見ながら以下のコマンドで実行できます。

```bash
$ npm i vue-scrollto
```

インストールが完了すると、 Vue.js のエントリファイルを開き、Vue を読み込んでいる箇所を以下のように書き換えます。

```js
import Vue from "vue"
import VueScrollTo from "vue-scrollto"

Vue.use(VueScrollTo)
```

`Vue.use` は Vue.js でプラグインを追加する際に利用される記述方法です。

`Vue.use` を利用してプラグインを追加すると、`.vue` のファイル内で `this.$scrollTo` の関数を利用することができるようになります。

```js
export default {
    methods: {
        scroll(){
            this.$scrollTo("body",500)
        }
    }
}
```

`this.$scrollTo` は 第一引数に「どこまでスクロールするか」を表す要素を、
第二引数に、何ミリ秒かけてスクロールするかを表す数値を指定します。

さらに第三引数には、オブジェクト形式でオプションを指定することが可能です。

```js
export default {
    methods: {
        scroll(){
            this.$scrollTo("#contact",500,{
                offset: 50
            })
        }
    }
}
```

オプション値で `offset: 50` を指定すると、`$scrollTo` の挙動は　`#contact` 調度までのスクロールではなく、
`#contact`  から 50px ずれた位置までのスクロールとなります。

利用可能なすべてのオプションについては、公式サイトを確認して下さい。

https://www.npmjs.com/package/vue-scrollto#options

### TRY !! トップへ戻るボタンの実装

ページ下部に fixed で表示される 「トップへ戻る」ボタンを実装してみましょう。


### TRY !! ページ内スクロールのメニュー実装

ページ内の様々な位置にスクロールできる、ナビゲーションメニューを実装してみましょう。

vue-scrollto の第一引数には `body` だけでなく `#contact` など任意の HTML 要素を指定することが可能なため、
これを用いてページ内の任意の場所にもスクロールをさせることが可能です。

## スクロールイベントの処理

Vue.js では HTML 要素を起点とするイベント処理については `@click` などのように、
 `@` を記述したイベント処理の記述を行うことができます。
 
Vue.js で、スクロールや window のリサイズイベントなど、 HTML に紐付かないイベントを処理する場合には、
JavaScript の標準的な記法である `window.addEventListener` を利用します。

### Component で最初にコールされる `mounted`

script のセクションで `mounted` 関数を以下の様に定義すると、`.vue` ファイルが読み込まれた時点で
任意の処理を実行させることが可能です。

```js
export default {
    mounted() {
        console.log("page ready!")
    }
}
```

この `mounted` を利用して、任意のスクロールイベントを登録してみましょう。
以下のように `window.addEventListener` を利用して、
「スクロールが発生したら…」で発生するイベント処理を記述します。

```js
export default {
    mounted() {
        window.addEventListener("scroll",() => {
          console.log(window.scrollY)            
        })
    }
}
```

`window.scrollY` は現在のスクロール位置を取得する記述です。
上記のように記述することで、スクロールのたびに console に現在のスクロール位置が表示されるようになります。

スクロール値に応じて画面が変化するアプリケーションを作成するなら、
スクロールのたびに data の中の変数を書き換えるように変更してみましょう。

```js
export default {
    data(){
        return {
            scrollY: 0
        }
    },    
    mounted() {
        window.addEventListener("scroll",() => {
          this.scrollY = window.scrollY
        })
    }
}
```

### computed プロパティ

スクロールの値に応じて クラスを変化させることを考えてみましょう。

例えば、 500px 以下のところまでスクロールすると現れる 「TOPへ戻る」ボタンを考えてみます。

```html
<template>
    <div>
        ...
        <div id="scrollToTop" v-if="scrollY > 500">
            トップへ戻る
        </div>>        
    </div>
</template>
```

上記の様に `v-if` を利用して制御すれば、簡単にスクロールに反応してトップへ戻るボタンの出し分けが可能になります。

場合によっては、 トップへ戻るボタンを、ヘッダーとフッターでかぶらないようにするために
「500px 以上 かつ 2000px 未満」のときにだけ表示、といったケースもあるかもしれません。

```html
<template>
    <div>
        ...
        <div id="scrollToTop" v-if="scrollY > 500 && scrollY < 2000">
            トップへ戻る
        </div>>        
    </div>
</template>
```

複数の条件は `&&` を利用して、条件をつなぐことができます。
しかし HTML の中に 複雑な条件を記述していくと コードが複雑で読みにくくなっていくでしょう。

複雑な条件式などは computed プロパティを利用してすっきりとした記述を行うことができます。

```vue
<template>
    <div>
        ...
        <div id="scrollToTop" v-if="showTopButton">
            トップへ戻る
        </div>>        
    </div>
</template>
<script >
export default {
    data(){
        return {
            scrollY: 0
        }
    },
    computed: {
        showTopButton(){
            return this.scrollY > 500 && this.scrollY < 2000
        }
    },
    mounted() {
        window.addEventListener("scroll",() => {
          this.scrollY = window.scrollY
        })
    }
}
</script>
```

computed プロパティは、 `data` などで定義された値を元に作られる複雑な条件などを、
テンプレート内など他の場所で利用しやすいように名前をつけて再定義することができる機能です。

上記では、トップボタンの表示非表示を判定するロジックを `sjowTopButton` で定義しています。

### クラスのバインディング

表示非表示に関しては、`v-if` での制御よりも、クラスを利用した制御のほうが好まれるケースもあるでしょう。

- window.scrollY が 500 未満の時 active クラスがつかない
- window.scrollY が 500 以上の時 active クラスがつく

のような形でクラスを出し入れする場合、 Vue.js でのクラスの制御を行う必要があります。

クラスは HTML 上の属性ではあるものの、複数の値を記述することが可能なため、 `:class="..."` のような記述では、
思った通りの処理が実現できないケースが多々あります。

クラスに要素をバインディングする際には、オブジェクト形式で `クラス名: 条件` のように記述します。


```vue
<template>
    <div>
        ...
        <div id="scrollToTop" :class="{active: scrollY > 500}">
            トップへ戻る
        </div>>        
    </div>
</template>
```

オブジェクト形式で記述するため、 `,` を用いて複数の判定を追加することも可能です。
常に付与したいクラス名がある場合には 条件式を `true`とします。

またオブジェクトのキーには `-` が利用できないので、 `-` 付きのクラス名を利用する場合には `'...'` で囲う必要があります。

```vue
<template>
    <div>
        ...
        <div id="scrollToTop" :class="{active: scrollY > 500, 'btn-top': true }">
            トップへ戻る
        </div>>        
    </div>
</template>
```

### TRY!! スクロールしたら表示される 「トップへ戻る」ボタン

画面の初期読み込み時には表示されないが、ページをスクロールすると表示される。
という仕組みの「トップへ戻る」ボタンを実装してみましょう。

DEMO https://xenodochial-bardeen-f34c4c.netlify.com/navigate

### TRY!! コンテンツの現在位置を示すメニュー

コンテンツのナビゲーションメニューでスクロールに応じて現在の表示項目が active になるメニューを作成してみましょう。

DEMO https://xenodochial-bardeen-f34c4c.netlify.com/navigate

スクロール位置に応じて `active` クラスを切り替える場合、
ターゲット要素のy 座標を取得する必要が出てきます。

`document.querySelector` はセレクタ形式で指定した DOM 要素を取得する関数として利用可能です。
if 文で判定して document.querySelector の結果が取得できている場合、
`tar1.getBoundingClientRect().y` の形式で HTML 要素の Y 座標を取得することができます。

```js
export default {
    computed:{
      navItemClassTop(){
        const tar1 = document.querySelector("$concept")
        const tar2 = document.querySelector("#services")
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
  }
}
```


