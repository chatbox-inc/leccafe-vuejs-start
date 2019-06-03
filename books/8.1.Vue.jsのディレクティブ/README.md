# Vue.js のディレクティブ

Vue.js ではテンプレート内で利用可能な様々な独自用意が用意されています。

これらの独自要素は ディレクティブと呼ばれ、 Vue.js 上の変数と組み合わせて様々なDOM制御を実装することができます。

https://jp.vuejs.org/v2/api/#%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%86%E3%82%A3%E3%83%96

## v-if / v-show

v-if / v-show は条件式と組み合わせて使うことで、 DOM 要素の表示を制御することができます。

v-if は 条件式の真偽値に応じて DOM 要素の廃生成が行われますが、
v-show は 条件式の値に応じて CSS の `display` 値が変化するだけです。

### v-else-if

v-else-if は v-if の兄弟要素として利用することで、
v-if に else-if 節を設ける事ができます。

```html
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
```

### v-else 

v-else は v-if / v-else-if の兄弟要素として利用することで、
v-if に else 節を設ける事ができます。

```html
<div v-if="Math.random() > 0.5">
  Now you see me
</div>
<div v-else>
  Now you don't
</div>
```

## v-for

v-for は 配列などのデータを繰り返し描画する際に利用することができます。

```html
<div v-for="item in items">
  {{ item.text }}
</div>
```

## v-model

v-model はフォーム要素の値と Vue コンポーネントの変数との間に双方向バインディングを実現します。

```html
<div>
    <input type="text" v-model="form.name">
</div>
```

v-model では 通常 `input` イベントを購読して、値の変更をリアルタイムに変数へと伝達します。
`change` イベントを利用したい場合には、 `lazy` 修飾子を利用します。

```html
<div>
    <input type="text" v-model.lazy="form.name">
</div>
```

input フィールドにおける v-model の値は通常、文字列として取得されますが、
`number` 修飾子を利用することで、数値にキャストすることが可能です。

```html
<div>
    <input type="number" v-model.number="form.name">
</div>
```

また `trim` 修飾子は、 input 要素の値を トリムすることが可能です。

```html
<div>
    <input type="text" v-model.trim="form.name">
</div>
```

## v-text 

v-text は HTML要素内に変数の値を出力します。

```html
<div>
    <div v-text="user.name"/>
</div>
```

::: v-pre
上の例のコードは次の `{{ ... }}` を用いて記述されるコードと同じ動作をするため、
通常はこちらのほうがよく利用されます。
:::

```html
<div>
    <div>{{ user.name }}</div>
</div>
```

::: v-pre
`v-text` や `{{ ... }}` は、XSS 脆弱性対策として、
変数中に含まれる HTML タグをエスケープして画面に出力します。
:::

そのため以下のコードでは、リンク要素ではなく、単純に `<a href='http://google.com'>LINK</a>` という形でHTML 文字列が画面に表示されてしまいます。

```vue
<template>
    <div>
        <div v-text="link" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            link: "<a href='http://google.com'>LINK</a>"
        }
    }
}
</script>
```

### v-html

v-html は v-text と似ていますが、変数内に HTML タグが含まれていた場合でも、
エスケープせずに HTML 文字列を HTML 要素として画面に出力します。

以下のコードでは、画面に a 要素で実装されたクリック可能なリンク要素が表示されます。

```vue
<template>
    <div>
        <div v-html="link" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            link: "<a href='http://google.com'>LINK</a>"
        }
    }
}
</script>
```

v-html は便利な半面、 XSS 脆弱性というセキュリティ上のリスクをもたらす可能性もあります。
v-html を使用する際には、変数の内容が信頼できるコンテンツかどうか十分に考慮する必要があります。

また、v-html 内部のHTML 要素に対してscoped css を記述する場合、
うまく装飾が適用されないことがあります。

このようなケースでは　`/deep/` 演算子を使って 以下のようにスタイルを記述することで問題を解決することが可能です。

```vue
<template>
    <div>
        <div class="htmlArea" v-html="link" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            link: "<a href='http://google.com'>LINK</a>"
        }
    }
}
</script>
<style lang="scss" scoped>
.htmlArea a{ // dont work
    color: red;
}

.htmlArea /deep/ a{ // work!
    color: blue;
}
</style>
```

`/deep/` 演算子は SCSS での記法のため、 通常の CSS を利用する場合などは `>>>` コンビネータを利用します。


```html
<style scoped>
.htmlArea >>> a{ // dont work
    color: red;
}
</style>
```