<template>
  <div>
    <div class="search">
      <input type="text" v-model="keyword" />
      <button>検索</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  }
};
</script>

<style scoped>
input {
  border: 1px solid rgb(31, 30, 30);
  border-radius: 5px;
  width: 200px;
  margin-left: 40px;
}
button {
  border: 1px solid gray;
  border-radius: 5px;
  margin-left: 10px;
  padding: 0 5px;
}
</style>>
