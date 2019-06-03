# Promise と async await

JavaScript で非同期処理を行う際に重要になる Promise と Async Await の仕組みについて理解しておきましょう。

## Promise

Promise は 非同期な処理を JavaScript で表現するための共通のフォーマットです。

様々なライブラリが Promise をサポートしており、
共通のフォーマットを用いて非同期処理の結果にアクセスすることが可能です。

Promise オブジェクト `promise` は `then` を利用して、処理完了時の動作を定義することができます。

```js
promise.then((result)=>{
  // 処理が完了したタイミングで呼び出される
  console.log(result)
})
```

`then` で定義する関数の第一引数には、 resolve が呼び出された際の引数が格納されます。
また、 then は チェインすることも可能で、チェインされた then では直前の then で return した値が
次の then の関数の第一引数に渡されます。

```js
promise.then((result)=>{
  console.log(result) // first result
  return "second message" 
}).then((result)=>{
    console.log(result) // "second message"
})
```

Promise の処理中に、エラーが発生した場合、そのエラーは catch を利用して受け取ることができます。

```js
promise.catch((e)=>{
  console.log(e)
})
```

`catch` と `then` は共に利用することが可能です。

```js
promise
.then(...)
.then(...)
.then(...)
.catch(...);
```

then のチェーンは途中でエラーが発生したタイミングでストップし、
代わりに紐付いている catch が探され、エラーオブジェクトが渡されます。

注意しなければならないのは Promise オブジェクト自体を try catch で囲っても エラーを捕捉することはできない、
という点です。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_promises

### Promise の作成

Promise は Promise クラスを利用して任意に作成する事ができます。
下記は一秒後に処理が完了する Promise です。

```js 
const promise = new Promise( (resolve)=>{
  setTimeout( ()=>{
    resolve(true)
  },1000)
})
```

通常 Promise を自分で作成するケースは稀かもしれません。
多くの JavaScript ライブラリで、 非同期の処理は Promise ベースで実装されており 
通常はこうしたライブラリから 生成された promise のオブジェクトを受け取るケースがほとんどです。

`Promise.resolve()` は単純に resolve された Promise を生成します。

### Promise の合成

`Promise.all` は複数の Promise を合成するためのツールです。

`Promise.all` は引数に Promise の配列をとり、渡されたすべての Promise が resolve したタイミングで
then がコールされるような promise を生成します。

```js
Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
```

`Promise.all` の then では それぞれの Promise の結果が 配列で返ってきます。

## async await 

async await は ES2017 で追加された、 非同期処理の新しい書き方です。

async を付与した関数(async function) は 自動的に Promise を返却するよう変換されます。

これは Promise を生成するための糖衣構文として利用可能です。

```js
const myFunc = async () => {
  return "hello world"
}
// 上の関数は下の関数と同じ
const myFunc = () => {
  return new Promise( (resolve)=>{
    resolve("hello world")
  })
}
```

また async function の内部では await キーワードが利用可能です。

`await promise` の形式でコードを記述することで、 then を記述することなく、 
promise の処理完了を待つことができます。

```js
const promise = new Promise( (resolve)=>{
  setTimeout( ()=>{
    resolve("hello world")
  },1000)
})

const myFunc = async () => {
  const message = await promise
  console.log(message) // "hello world"
}
```

Promise の処理を then を用いずに 同期的に記述することができるようになるほか、
これまで catch 節で受けていたエラーは try ... catch で記述できるようになりました。

```js

const myFunc = async () => {
  try{
    const message = await axios.get("...")
    console.log(message) // "hello world"      
  }catch(error){
      console.log(error)
  }
}
```

