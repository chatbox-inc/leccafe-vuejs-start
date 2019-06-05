# Vue.js と axios 通信

## REST API を利用したデータ取得

REST API は Web システムの所有するデータを JSON 形式で出力する
HTTP 通信のサービスです。

REST API を用いることによって、 Web システム・アプリ間での連携をスムーズに実装することが可能になります。

今日でも多くの Web サービスが REST API を公開しており、
公開されている REST API を利用して、Web サービスのデータを利用した
サードパーティアプリを簡単に作成することが可能になっています。

### REST API の通信

Web ブラウザ上でREST APIを利用する場合、通常 JavaScript を用います。 
多くの Web ブラウザでは `fetch` と呼ばれる関数が用意されており、
これを用いてREST API 通信を実装することができますが、
一般的には、古いブラウザのサポート等も考慮して `axios` と呼ばれるライブラリを用いて
実装するケースがほとんどです。

https://github.com/axios/axios

axios を利用するためには npm 経由でライブラリをインストールする必要があります。

```
$ npm i axios
```

ライブラリをインストールすると import して axios が利用可能になります。

試しに Vueコンポーネントの `script` 内で 以下のように記述して `mounted` の実装を行ってみましょう。

```js
import axios from "axios"
export default {
  data(){
    return {
      events: null
    }
  },
  async mounted() {
    const result = await axios.get("https://happy-curie-5886a5.netlify.com/.netlify/functions/event")
    this.events = result.data.events
  }
}
```

`https://happy-curie-5886a5.netlify.com/.netlify/functions/event` は今回のデモ用に用意したサンプルの API です。

以下のような テンプレートを利用して、画面にイベントの一覧を出力してみましょう。

```html
<template>
  <div>
    <h1 class="h4 mb-3">Event List</h1>
    <div class="list-group list-group-flush">
      <a
          class="list-group-item list-group-item-action"
          v-for="(event,index) in events" :key="index"
      >
        {{event.title}}
      </a>
    </div>
  </div>
</template>
```

画面を表示すると、画面表示後しばらくしてから イベントの一覧が反映されるのが確認できるでしょう。

検証ツールを利用してVueコンポーネントの `events` にデータが入るタイミングを確認してみても、
最初は `null` の `events` がページ読み込みからしばらくしてから 配列に変化するのが確認できるでしょう。

Axios では Promise を使った非常期の処理が行われるため、
通信が完了するまでの暫くの間は、`events` は初期値の `null` のままとなり、
通信が完了した後に、`events` に対してREST APIから取得したイベントのデータ一覧が与えられます。

REST API の読み込み中の画面が、真っ白になるのを防ぎたい場合、
`v-if` を利用して、events の状況に応じたページの制御を行うと良いでしょう。

```html
<template>
  <div>
    <h1 class="h4 mb-3">Event List</h1>
    <div class="list-group list-group-flush" v-if="events !== null">
      <a
          class="list-group-item list-group-item-action"
          v-for="(event,index) in events" :key="index"
      >
        {{event.title}}
      </a>
    </div>
    <div v-if="events == null">
      読み込み中
    </div>
  </div>
</template>
```

## SPA と REST API 通信

REST API を利用すれば、API 経由で取得したデータを利用しながら、
SPA の動的URL で生成されるページにデータを与えることが可能になります。

先程の一覧画面をベースに イベントページを表示する SPA を作成してみましょう。

エントリーファイルでは以下のような形でルートを定義します。

```js
const router = new VueRouter({
  routes : [
    { path: '/', component: () => import('./views/Top.vue')},
    { path: '/event/:event_id', component: () => import('./views/Event.vue')},
  ],
  // ...
})
```

`Top.vue` は以下のような形になります。

```vue
<template>
  <div>
    <h1 class="h4 mb-3">Event List</h1>
    <div class="list-group list-group-flush" v-if="events !== null">
      <router-link
          class="list-group-item list-group-item-action"
          v-for="(event,index) in events" :key="index"
          :to="`/event/${event.event_id}`"
      >
        {{event.title}}
      </router-link>
    </div>
    <div v-if="events == null">
      読み込み中
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return {
      events: null
    }
  },
  async mounted() {
    const result = await axios.get("https://happy-curie-5886a5.netlify.com/.netlify/functions/event")
    this.events = result.data.events
  }
}
</script>
```

先程の例で a 要素で記述していた 一覧の要素を、 router-link に置き換えて実装しています。

`Event.vue` は以下のように記述することができます。

```vue
<template>
  <div>
    <div class="mb-3">
      <router-link to="/">トップへ戻る</router-link>
    </div>
    <div v-if="event">
      <h1 class="h4 mb-3">{{event.title}}</h1>
      <div class="text-right">
        <a :href="event.event_url">Connpass</a>
      </div>
      ...
    </div>
    <div v-if="event === false">
      該当のイベントが見つかりません。
    </div>
    <div v-if="event === null">
      読み込み中
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return {
      events: null
    }
  },
  computed: {
    event_id(){
      return parseInt(this.$route.params.event_id)
    },
    event(){
      if(this.events){
        for(let event of this.events ){
          if(event.event_id == this.event_id){
            return event
          }
        }
        return false
      }else{
        return null
      }

    }
  },
  async mounted() {
    const result = await axios.get("https://happy-curie-5886a5.netlify.com/.netlify/functions/event")
    this.events = result.data.events
  }
}
</script>
```

`Event.vue` でも mounted を使用して API 通信を行っています。

ここでは、イベントの一覧を取得するだけでなく、 URL で与えられた event_id と一致するイベント要素を取り出さなければなりません。

まず URL で与えられた event_id を取得するために computed プロパティで event_id を取得しています。

これは後ほど比較で使用するために `parseInt` を用いて数値形式に変換を行っています。

```js
export default {
  // ...
  computed: {
    event_id(){
      return parseInt(this.$route.params.event_id)
    },
    // ...
  },
  //...
}
```

次に `event_id` を利用して、該当するイベントを返却する `event` を作成しています。

配列データの `events` を `for...of` を利用して一つづつチェックしていますが、
`events` の初期値が null のため、API 通信が完了する前の状態で `for...of` が実行されないよう、
`if( this.events ){` を利用して制御を行っています。

```js
export default {
  // ...
  computed: {
    // ...  
    event(){
      if(this.events){
        for(let event of this.events ){
          if(event.event_id == this.event_id){
            return event
          }
        }
        return false
      }else{
        return null
      }
    }
  },
  //...
}
```

`event_id` が取得できても、 `events` の中から該当するイベントを見つけられない場合（不正なURL）、
`false` を返すようにして、表示の制御を切り分けられるようにしています。

## REST API

Vue.js を用いたプロジェクトでも Axios を利用して簡単に REST API の通信を実行することができます。

```js
import axios from "axios"
export default {
  // ...  
  async mounted() {
    const result = await axios.get("https://happy-curie-5886a5.netlify.com/.netlify/functions/event")
    this.events = result.data.events
  }
}
```

REST API 通信を行うためには、`URL` `METHOD` の ２点の情報が必要不可欠です。

今回デモで用意した API は 

- URL : https://happy-curie-5886a5.netlify.com/.netlify/functions/event
- METHOD : GET

で通信できる REST API です。

METHOD は REST API のリクエスト種別を示すパラメータで、主に以下のような値が利用されます。

- GET: データの取得などで利用される。
- POST: 検索やデータの登録など、汎用的な「処理系」のリクエストで利用される。 
- PUT: URLで示す箇所にデータを新規に登録する際に利用される。 
- PATCH: URLで示すデータを更新・変更する際に利用される。
- DELETE: URLで示すデータを削除する際に利用される。

`axios` では、 `axios.get` `axios.post` などの形式で、
それぞれの METHOD 形式でのリクエストを発行することが可能になっています。

REST API は他にも通信上の 仕様として、カスタムの Header を定義したり、
リクエストボディにパラメータをわたしたりすることが可能になっており、
axios ではそういったカスタムが必要な通信にも対応できるようパラメータが用意されています。

詳しくは 付録の axios の活用を確認してみてください。

### REST API の通信を確認する

Web ブラウザから REST API の通信処理を行う場合、
ブラウザの機能を使って通信のやり取りを確認すると、デバッグ作業などが便利ではかどります。

Chrome を利用している場合、「検証ツール」の「Network」タブから、
REST API 通信の処理の中身を確認することができます。

通信の量が多くて画面が見づらい場合は 「XHR」のタブでフィルタリングして確認すると良いでしょう。

### Web サービスにおける REST API 

Web サービスから提供される REST API における通信上の仕様は、
通常 API 仕様書という形で Web サービスから提供されます。

様々な API サービスの仕様書を眺めることで、API リクエストにおけるパラメータなどの様子確認することができます。

[GitHub API v3 \| GitHub Developer Guide](https://developer.github.com/v3/)

[Backlog API とは \| Backlog Developer API \| Nulab](https://developer.nulab.com/ja/docs/backlog/)

今回デモで用意した API も Connpass から提供されている イベント検索API を利用したものです。

[APIリファレンス \- connpass](https://connpass.com/about/api/)


### CORS 制約

では、上記の Connpass の API を利用して、リクエスト URL `https://connpass.com/api/v1/event/` 
を利用した実装を行ってみましょう。

おそらく Web ブラウザ上で以下のようなエラーが確認できるはずです。

```text
Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource...
```

Web ブラウザからの REST API を発行は、ときに重大なセキュリティ上のリスクを引き起こします。
一般的に Web ブラウザには CORS 制約と呼ばれるセキュリティ上の制限が付与されており、
Web ブラウザから発行される REST API は CORS 制約に抵触しないよう実装される必要があります。

::: tip
CORS 制約は閲覧している Web サイトと API の URL とで、
ホスト、プロトコル、ポートのいずれかが異なるケースで発生します。

閲覧している Web サイトと API の URL とで、ホスト、プロトコル、ポートが完全に一致している時、
CORS 制約は問題になりません。
:::

::: tip
CORS 制約に対応した REST API では、 Response Header に `Access-Control-Allow-Origin` 
などに代表される特別なヘッダが実装されています。
:::

デモの REST API は Connpass API の仕様をそのままコピーし、CORS 対応を付与して作成されたものです。

