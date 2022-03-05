<template>
  <div class="sort-container mt-4">
    <v-menu offset-y transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
        <!-- <div class="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full"> -->
        <v-btn outlined color="indigo" v-bind="attrs" v-on="on" :src="user.photoURL">並び替え</v-btn>
        <!-- </div> -->
      </template>
      <v-list>
        <v-list-item style="display:block">
          <v-list-item-title class="pa-5 downMenu" style="cursor:pointer" @click="oldOrder">投稿が古い順</v-list-item-title>
          <v-list-item-title class="pa-5 downMenu" style="cursor:pointer" @click="newOrder">投稿が新しい順</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      good: 0,
      form: {
        message: {
          val: null
        }
      },

      tweets: [],

      deleteId: null,

      id: 0,

      show: true,

      dialog: false,

      editTweetData: "",

      currentImg: this.$firebase.auth().currentUser.photoURL,

      showTweet: false
    };
  },

  // firebaseからdataを取得して配列にオブジェクトとして格納--------------------------------

  created: async function() {
    await this.$firestore
      .collection("tweets")
      .orderBy("createdAt", "desc")
      .onSnapshot(tweetsSnapShot => {
        this.tweets = [];
        tweetsSnapShot.docs.forEach(snapshot => {
          console.log(snapshot.data());
          let data = {
            name: snapshot.data().name,
            message: snapshot.data().message,
            user: snapshot.data().user,
            date: snapshot.data().createdAt,
            id: snapshot.data().id,
            photoURL: snapshot.data().photoURL,
            show: snapshot.data().show,
            good: snapshot.data().good
          };
          this.tweets.push(data);
          this.showTweet = true;
        });
      });
  },

  computed: {
    user() {
      return this.$store.getters["user"];
    }
  },

  methods: {
    // 並び替えメソッド
    async newOrder() {
      await this.$firestore
        .collection("tweets")
        .orderBy("createdAt", "desc")
        .get()
        .then(tweetsSnapShot => {
          this.tweets = [];
          tweetsSnapShot.docs.forEach(snapshot => {
            let data = {
              name: snapshot.data().name,
              message: snapshot.data().message,
              user: snapshot.data().user,
              date: snapshot.data().createdAt,
              id: snapshot.data().id,
              photoURL: snapshot.data().photoURL,
              show: snapshot.data().show,
              good: snapshot.data().good
            };
            this.tweets.push(data);
          });
        });
    },

    async oldOrder() {
      await this.$firestore
        .collection("tweets")
        .orderBy("createdAt", "asc")
        .get()
        .then(tweetsSnapShot => {
          this.tweets = [];
          tweetsSnapShot.docs.forEach(snapshot => {
            let data = {
              name: snapshot.data().name,
              message: snapshot.data().message,
              user: snapshot.data().user,
              date: snapshot.data().createdAt,
              id: snapshot.data().id,
              photoURL: snapshot.data().photoURL,
              show: snapshot.data().show,
              good: snapshot.data().good
            };

            this.tweets.push(data);
          });
        });
    }
  }
};
</script>

<style>
.downMenu:hover {
  opacity: 0.7;
}

.sort-container {
  max-width: 80%;
}
</style>