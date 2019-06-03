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
      <hr>
      <div class="description" v-html="event.description"/>
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

<style>
  .description{
    font-size: .9em;
    overflow: hidden;
    word-break: break-all;
  }
  .description /deep/ h1 {
    font-weight: bold;
    font-size: 2em;
  }
  .description /deep/ h2 {
    font-weight: bold;
    font-size: 1.5em;
  }
  .description /deep/ h3 {
    font-weight: bold;
    font-size: 1.2em;
  }
</style>
