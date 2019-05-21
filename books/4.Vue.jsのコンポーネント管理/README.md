# Vue.js のコンポーネント

## Vue.js のコンポーネント

Vue.js では、任意のカスタム要素を作成することが可能です。

App.vue のとなりに Button.vue を作成して以下のように記述してみましょう。


```vue
<template>
  <div>
    <div class="btn">
        OK    
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
```

App.vueの側では以下のように記述して、このHTML部品を再利用することができます。

```vue
<template>
  <div>
    ...
    <app-btn />
  </div>
</template>

<script>
import AppBtn from "./Button.vue"

export default {
    components: {
        AppBtn
    },
    // ...
}
</script>

<style>
</style>
```

作成したカスタム要素は `import AppBtn from "./Button.vue"` の様に `import` 構文を利用して取り込むことができます。

取り込んだカスタム要素は、 `components` セクション に追加することで、 template 内で利用することが可能になります。

`AppBtn` の名前で取り込まれたカスタム要素は HTML の側では `app-btn` となるように、
キャメルケース形式で取り込んだ名前は自動的に `-` 区切りの ケバブケースに変換されます。

::: tip
この様に `.vue` のファイル形式で作成された HTML 部品を、Vue コンポーネントと呼びます。
:::

::: tip
Vue コンポーネントのうち、利用する側の Vue コンポーネントを 親、
利用される側の Vue コンポーネントを 子 と呼ぶことがあります。
上記の例では Btn.vue が子コンポーネントで、 App.vue は親コンポーネントです。
:::

Vue.js を用いた開発では、サイト内で様々な箇所を Vue コンポーネントに切り分けて 小さな部品単位で管理することができるようになっており、
こうした コンポーネントの活用や管理は、 Vue.js を用いた Web 制作の現場では非常に重要となってきます。

### propsによる値渡し

Vue コンポーネントは、外部から値を受け取ることが可能です。

外部から値を受け取る場合は、 props というセクションに値を追加してその名前を定義します。

props で定義した値は data 内で定義された変数と同様に テンプレート内 等で利用することが可能です。

```vue
<template>
  <div>
    <div class="btn">
        {{ label }}
    </div>
  </div>
</template>

<script>
export default {
    props: ["label"]
}
</script>
```

親側のコードは以下のように、HTML 属性を利用して props にデータを渡すことができます。

```vue
<template>
  <div>
    ...
    <app-btn label="OK"/>
    <app-btn label="NG"/>
  </div>
</template>

<script>
import AppBtn from "./Button.vue"

export default {
    components: {
        AppBtn
    },
    // ...
}
</script>
```

::: tip
props で渡されたデータは読み込み専用でコンポーネントに渡されます。

props 経由で受け取ったデータをコンポーネントの内部で変更することが無いように注意してください。
:::

### イベント処理

Vue コンポーネント内の HTML 要素などにイベント処理をもたせたいケースもあります。

コンポーネント内部で発行されるイベントのうち、その処理を親要素に任せたい場合は、 `$emit` を用いて
イベントの発行のみを親に通知することができます。

```vue
<template>
  <div>
    <div class="btn" @click="scroll">トップへ</div>
  </div>
</template>

<script>
export default {
    methods: {
        scroll(){
            this.$emit("click")
        }
    }
}
</script>
```

親側のコードでは下記のような形で、子から発行されたイベントを受け取ります。

```vue
<template>
  <div>
    ...
    <app-btn @click="scroll"/>
  </div>
</template>

<script>
import AppBtn from "./Button.vue"

export default {
    components: {
        AppBtn
    },
    methods: {
        scroll(){
            window.scrollTo(0,0)
        }
    }
}
</script>
```

子 コンポーネントでは、 `this.$emit` を用いていつでも任意のタイミングで、
親コンポーネントにイベントを送信することは可能です。

親コンポーネントは `@xxx` の構文でこれらのイベントを受け取ることが可能です。

::: tip
`click` や `submit` などのあらかじめ用意されたイベント名以外にも
`$emit` では自由なイベント名を作成して発行することが可能です。
:::

### scoped css

コンポーネントの作成は、CSS記述の面でもメリットがあります。

コンポーネントにおける、style要素では、scoped プロパティを追加することにより、
そのコンポーネント内部でのみ有効なCSSを記述することが可能になります。

```vue
<template>
  <div>
    <div class="btn">トップへ</div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
div{
  font-size: 1.5rem;
}
</style>
```

上記のCSSでは、div 要素全体に`font-size: 1.5rem` のスタイルを適用していますが、
`scoped` プロパティが追加された CSS では、コンポーネント内部でその記述が有効となるため、
親コンポーネントに対しては、`font-size: 1.5rem`は一切影響しません。

Scoped CSSを利用することでクラス名の重複などを気にすることなく自由にCSSを記述していくことが可能になります。

## props のバリデーション



## slotによるコンテンツ配信

