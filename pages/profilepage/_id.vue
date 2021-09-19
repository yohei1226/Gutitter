<template>
<div>
  <v-card class="profile-top-image">
            <v-img
              src="https://tabi-pocket-image.tabikobo.com/wp-content/uploads/2020/11/17135859/1-1-3.jpg"
              height="300"
              class="grey darken-4"
            ></v-img>
  </v-card>
  <v-avatar
      color="orange"
      size="240"
      class="profile-icon"
    >
      <!-- <span class="white--text text-h5">62</span> -->
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="John"
      >
    </v-avatar>
</div>
  
</template>

<script>
export default {

}
</script>

<style>
.profile-top-image{
    position: relative;
}
.profile-icon{
    /* margin-top: 100px; */
    /* margin-left: 100px; */
    top: 19%;
    left: 18%;
    position: absolute;
}
</style>