<template>
  <div id="app">
    <!-- class, action, methodを変更しないでください -->
    <form class="formrun" action="https://form.run/api/v1/r/aph5y6d7x77eyv8elilan46u" method="post">
      <!-- ↓自由に要素を追加・編集することができます -->
      <div>
        <label>お名前</label>
        <input name="お名前" type="text" v-model="form.name">
      </div>

      <div>
        <label>メールアドレス [必須]</label>
        <input name="メールアドレス" type="text" data-formrun-type="email" data-formrun-required>
        <div data-formrun-show-if-error="メールアドレス">メールアドレスを正しく入力してください</div>
      </div>

      <div>
        <label>お問い合わせ [必須]</label>
        <textarea name="お問い合わせ" data-formrun-required></textarea>
        <div data-formrun-show-if-error="お問い合わせ">お問い合わせ入力してください</div>
      </div>

      <div>
        <label>個人情報利用同意 [必須]</label>
        <input type="checkbox" name="個人情報利用同意" data-formrun-required>
        <div data-formrun-show-if-error="個人情報利用同意">同意してください</div>
      </div>

      <button type="submit" data-formrun-error-text="未入力の項目があります" data-formrun-submitting-text="送信中..." @submit="submit">送信</button>
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
