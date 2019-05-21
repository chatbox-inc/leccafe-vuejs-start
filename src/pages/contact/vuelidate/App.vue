<template>
  <div id="app">
    <div class="container mt-5">
      <h1 class="h4 mb-5">お問い合わせフォーム</h1>
      <form>
        <div class="form-group">
          <label>お名前</label>
          <input type="text" class="form-control" name="name" v-model="form.name">
          <p class="text-danger" v-if="error.name">お名前を入力して下さい</p>
        </div>
        <div class="form-group">
          <label>メールアドレス</label>
          <input type="email" class="form-control" name="name" v-model="form.email">
          <p class="text-danger" v-if="error.email">Email アドレスを入力して下さい</p>
        </div>
        <div class="form-group">
          <label>件名</label>
          <input type="text" class="form-control" name="name" v-model="form.title">
          <p class="text-danger" v-if="error.title">件名を入力して下さい</p>
        </div>
        <div class="form-group">
          <label>本文</label>
          <textarea class="form-control" name="body" rows="10" v-model="form.body" />
          <p class="text-danger" v-if="error.body">本文を入力して下さい</p>
        </div>
        <div class="form-group">
          <input type="submit" class="btn btn-block btn-success" value="送信" @click="submit">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      form: {
        name: "",
        email: "",
        title: "",
        body: ""
      },
      error: {
        name: false,
        email: false,
        title: false,
        body: false
      }
    }
  },
  methods: {
    submit(e) {
      if(this.form.name.length == 0) {
        this.error.name = true
        e.preventDefault()
      }else{
        this.error.name = false
      }
      if(this.form.email.length == 0){
        this.error.email = true
        e.preventDefault()
      }else{
        this.error.email = false
      }
      if(this.form.title.length == 0){
        this.error.title = true
        e.preventDefault()
      }else{
        this.error.title = false
      }
      if(this.form.body.length == 0){
        this.error.body = true
        e.preventDefault()
      }else{
        this.error.body = false
      }
    }
  }
}
</script>

<style>
  .container{
    max-width: 480px;
  }
</style>
