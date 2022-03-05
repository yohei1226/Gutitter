
<template>
  <!-- <div class=""> -->
  <div class="index-container">
    <div class="home-button">
      <h1>Gutitter</h1>
      <h2 class="px-5">あなたの日々の愚痴を聞かせて下さい。</h2>
      <nuxt-link to="/">
        <v-btn color="pink" dark x-large class="home-button-include">愚痴をつぶやく</v-btn>
      </nuxt-link>
    </div>

    <!-- <Test/> -->
  </div>
  <!-- </div> -->
</template>

<script></script>

<style>
.index-container {
  /* background-image: url("~assets/images/cellular-4599956_1920.jpg"); */
  background-image: url("~assets/images/cell-phone-1245663_1920.jpg");
  background-size: cover;
  background-position: center;
  opacity: 0.8;
  height: 91vh;
  display: flex;
  align-items: center;
}

.home-button {
  margin: 0 auto;
  /* width:157px; */
  opacity: 1;
}
.home-button-include {
  font-weight: bold;
  opacity: 1;

  width: 157px;
  margin: 0 auto;
  display: block;
  font-size: 50px;
}

h1 {
  text-align: center;
  /* margin-bottom:30px; */
  font-size: 10em;
  color: white;
}
h2 {
  text-align: center;
  margin-bottom: 60px;
  font-size: 30px;
  color: white;
}

@media screen and (max-width: 700px) {
  h1 {
    font-size: 5.5rem;
  }
  h2 {
    font-size: 20px;
  }
}

@media screen and (max-width: 600px) {
}
</style>