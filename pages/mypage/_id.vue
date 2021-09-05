<template>
  <section>
    <h1>マイページ</h1>
    <p>こんにちは、「{{ id }}」さん！</p>
  </section>
</template>

<script>
export default {
//     computed: {
//     id: function () {
//     return this.$route.params.id;
//     }
//   }
data() {
    return {
        id:this.$route.params.id,
    }
},
}
</script>
<style>
section {
  border: 1px solid #ccc;
  border-radius: 10px;
  max-width: 600px;
  padding: 30px; 
  margin: 20px auto;
}
</style>