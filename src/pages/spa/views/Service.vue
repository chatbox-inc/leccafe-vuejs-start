<template>
  <div>
    <h1 class="h4 mb-3">Service - {{ title[category] }}</h1>
    <div>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque enim molestias nobis quo quod ratione ut velit! Amet dignissimos dolorem doloremque ea fugiat ipsum laboriosam molestiae quasi quod tempora? Excepturi.</p>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      title: {
        ec: "EC サイト制作",
        consulting: "コンサルティング",
      }
    }
  },
  computed: {
    category(){
      return this.$route.params.category
    }
  },
  mounted() {
    console.log("page mounted!")
  }
}
</script>

<style>
</style>
