# Vuelidate を利用したバリデーション

Vuelidate は Vue.js のバリデーションライブラリです。

https://vuelidate.netlify.com/

Vue.js のフォーム制作におけるバリデーション処理をシンプルに

## Vuelidate のバリデーション

Vuelidate を使ったバリデーションでは、 Vue コンポーネントに 
`validations` キーを追加してバリデーションルールを定義します。 

```js
import { required, minLength, between } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      name: '',
      age: 0
    }
  },
  validations: {
    name: {
      required,
      minLength: minLength(4)
    },
    age: {
      between: between(20, 30)
    }
  }
}
```

`validatiion` を追加すると、 Vue コンポーネントに
`this.$v` が注入され、バリデーションの結果をここから取得することが可能になります。

例えば ルールごとのバリデーションの結果は、
`$v.name.required` のように `$v.{fieldName}.{RuleName}` の形式で取得することができます。

```html
<template>
    <div>
      <div class="form-group" :class="{ 'form-group--error': $v.name.$error }">
        <label class="form__label">Name</label>
        <input class="form__input" v-model.trim="$v.name.$model"/>
      </div>
      <div class="error" v-if="!$v.name.required">Field is required</div>
      <div class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</div>
      <tree-view :data="$v.name" :options="{rootObjectKey: '$v.name', maxDepth: 2}"></tree-view>
      <div class="form-group" :class="{ 'form-group--error': $v.age.$error }">
        <label class="form__label">Age</label>
        <input class="form__input" v-model.trim.lazy="$v.age.$model"/>
      </div>
      <div class="error" v-if="!$v.age.between">Must be between {{$v.age.$params.between.min}} and {{$v.age.$params.between.max}}</div><span tabindex="0">Blur to see changes</span>
      <tree-view :data="$v.age" :options="{rootObjectKey: '$v.age', maxDepth: 2}"></tree-view>
    </div>
</template>

```

`form` などのキーでフォームデータをまとめる場合、以下のような書き方になります。

```vue
<template>
<div>
  <div class="form-group" :class="{ 'form-group--error': $v.form.nestedA.$error }">
    <label class="form__label">Nested A</label>
    <input class="form__input" v-model.trim="$v.form.nestedA.$model"/>
  </div>
  <div class="error" v-if="!$v.form.nestedA.required">Field is required.</div>
  <div class="form-group" :class="{ 'form-group--error': $v.form.nestedB.$error }">
    <label class="form__label">Nested B</label>
    <input class="form__input" v-model.trim="$v.form.nestedB.$model"/>
  </div>
  <div class="error" v-if="!$v.form.nestedB.required">Field is required.</div>
  <div class="form-group" :class="{ 'form-group--error': $v.form.$error }"></div>
  <div class="error" v-if="$v.form.$error">Form is invalid.</div>
  <tree-view :data="$v.form" :options="{rootObjectKey: '$v.form', maxDepth: 2}"></tree-view>
</div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: {
        nestedA: '',
        nestedB: ''
      }
    }
  },
  validations: {
    form: {
      nestedA: {
        required
      },
      nestedB: {
        required
      }
    }
  }
}
</script>
```

## `$v` の活用

`$v` からは様々なデータを取得できます。

- `$v.$invalid` バリデーションルールに合致しているかどうかを返します。
- `$v.$dirty` フィールドが変更されているかどうかを返します。
- `$v.$pending` 非同期のバリーションルール検証中に、`true` を返します。
- `$v.$error` `this.$dirty && !this.$pending && this.$invalid` の省略形としてエラーメッセージの表示判定に用いられます。

## バリデーションルール

 
https://vuelidate.netlify.com/#sub-builtin-validators

### カスタムルールの利用

組み込みのルールを import せずに単純に bool 値を返す関数を定義して、
カスタムルールを作成することも可能です。

```js
const mustBeCool = (value) => value.indexOf('cool') >= 0

export default {
    // ...
    validations: {
      myField: {
        required,
        mustBeCool
      }
    }    
}
```