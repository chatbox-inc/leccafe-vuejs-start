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

<style>
</style>
