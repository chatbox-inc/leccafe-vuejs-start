# Promise と Async Await

## Promise

Promise は `then` と `catch` がコール可能なオブジェクトです。

https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Using_promises

### Promise の作成

## async / await 

async キーワードは async 関数を生成するためのキーワードです。

```js
const func = async () => {
    
}
```

- async 関数は必ず Promise を return する。
- async 関数内での return は Promise の then に渡される
- async 関数内での throw は Promise の catch に渡される
- async 関数内では await キーワードを利用できる

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/async_function

### await

await は、 Promise の前に付与して then の結果式を

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/await

```js
const func = async () => {
  var y = await 20;
}
```