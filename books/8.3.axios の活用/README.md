# axios を利用した REST API 通信

## axios を用いたREST APIの通信

`axios` では、 `axios.get` `axios.post` などの形式で、
それぞれの METHOD 形式でのリクエストを発行することが可能になっています。

いずれの METHOD を利用する際にも 第一引数には、URL を取ることができます。

また、post や put / patch の METHOD では、リクエストボディにパラメータを渡すことが可能です。

リクエストボディのパラメータは 以下のような形で第二引数に実装します。

```js
import axios from "axios"
export default {
  // ...
  async mounted() {
    const result = await axios.post("..URL_HERE..",{
        //...REQUEST BODY
    })
  }
}
```

また、一部の API では、 header や queryParameter など、様々な形式のパラメータを受け付けることができるものも存在します。

こうしたパラメータは第三引数にオプションで `config` として付与することが可能です
(get/delete のように RequestBody を取らないものは第二引数)。

例えば、 POST リクエストの際に `X-APITOKEN` ヘッダを取るような API の場合は以下のような記述になるでしょう。

```js
import axios from "axios"
export default {
  // ...
  async mounted() {
    const url = "..URL_HERE.."
    const data = {
      //...REQUEST BODY        
    }
    const result = await axios.post(url, data, {
        headers: {
            "X-APITOKEN": this.token
        }                    
    })
  }
}
```

まとめると、 axios のリクエスト形式は以下のような形になります。

- `axios.get(url[, config])`
- `axios.post(url[, data[, config]])`
- `axios.put(url[, data[, config]])`
- `axios.patch(url[, data[, config]])`
- `axios.delete(url[, config])`

config に設定可能なリクエスト用のオプションは、`headers` 以外にも様々なものが用意されており、
Github の公式ドキュメントからその一覧を確認することができます。

https://github.com/axios/axios#request-config

### axios の Response

`axios.get` などの通信処理をコールすると 
Promise 経由で `response` オブジェクトを受け取る事ができます。

```js
import axios from "axios"
export default {
  // ...
  async mounted() {
    const result = await axios.post("..URL_HERE..",{
        //...REQUEST BODY
    })
  }
}
```

この response オブジェクトは以下のような形式のデータ構造になっています。

```js
{
  data: {}, // Response の本体たる Body 
  status: 200, // Responseの ステータスコード
  statusText: 'OK', // テキスト形式での Status 
  headers: {}, // Response に付与された Header
  config: {}, // Request 時の Config パラメータ
  request: {} // Request の情報
}
```

API が `4xx` や `5xx` 系のエラーを返す場合、 Promise は 例外を throw します。 

```js
import axios from "axios"
export default {
  // ...
  async mounted() {
    try{
        const result = await axios.post("..URL_HERE..",{
            //...REQUEST BODY
        })        
    }catch(error){
        console.log(error.response)                    
    }
  }
}
```

`error.response` もまた同じく上記の Response オブジェクトであるため、
`error.response.status` などのようにして、エラーレスポンスの情報を取得することが可能です。

## axios を利用した REST API 通信の管理

`axios.defaults` は axios のグローバル共通設定です。
`axios.defaults` に値を設定することで、すべての axios オブジェクトに共通の設定を反映することができます。

```js
axios.defaults.baseURL = 'https://my-petstore.com';
axios.defaults.headers['Authorization'] = token;
axios.defaults.headers['Content-Type'] = 'application/json';

axios.get("/items") // https://my-petstore.com/items へのリクエスト
```

グローバルに設定をしなくても、`axios.create` を利用してデフォルト設定付きの axios オブジェクトを作成することが可能です。

```js
const instance = axios.create({
  baseURL: 'https://my-petstore.com'
});
instance.get("/items") // https://my-petstore.com/items へのリクエスト

```