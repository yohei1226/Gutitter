<template>
    <div class="test-container">
      <div class="pt-10 mx-auto tweet-input mb-3" style="display:flex">
        <v-text-field v-model="form.message.val" placeholder="発言してみよう"></v-text-field>
        <v-btn
          depressed
          color="pink"
          class="mt-3 ml-10 tweet-button"
          @click="onSubmit"
        >
          Tweet
        </v-btn>
      </div>
      <v-card width="80%"
              class="mx-auto"
              v-if="tweetImage"
              style="display:flex; justify-content:center"
              >
        <img :src="tweetImage"
              class="w-60 h-60 object-cover border rounded-full"      
                    />
      </v-card>
      <div v-else>
          
      </div>

      <!-- イメージ選択のアイコン -->
      <div class="tweet-image-section">
        <i class="far fa-image fa-3x tweet-image-select" style="cursor:pointer;">
          <input
                type="file"
                accept="image/*"
                @change="changeImg"
                style="display: none"
              />
        </i>
      </div>

  <div class="sort-container mt-4">
    <v-menu offset-y transition="slide-x-transition">
      <template v-slot:activator="{ on, attrs }">
            <!-- <div class="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full"> -->
                <v-btn
                outlined
                color="indigo"
                v-bind="attrs"
                v-on="on"
                :src="user.photoURL"
                >
                並び替え
                </v-btn>
            <!-- </div> -->
      </template>
      <v-list>
        <v-list-item style="display:block">
          <v-list-item-title class="pa-5 downMenu" style="cursor:pointer" @click="newOrder">投稿が新しい順</v-list-item-title>
          <v-list-item-title class="pa-5 downMenu" style="cursor:pointer" @click="oldOrder">投稿が古い順</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
    


      <!--ツイートのボディ -->
      <div v-for="(tweet,index) in tweets" :key="index" v-show="showTweet">
        <Tweetbody :tweet="tweet" :index="index" @fetch-tweet="newOrder" />
      </div>

    <!-- Topへ戻るボタンn -->
      <ScrollTop/>

    </div>
</template>


<script>
import Tweetbody from '~/components/Tweetbody.vue'



export default {
  middleware: ['checkLogOut'],
  components: {Tweetbody},  


  data(){
    return{
      good:0,
      form: {
        message: {
          val: null
        }
      },


      tweets:[],

      deleteId:null,

      id:0,

      show:true,

      dialog:false,

      editTweetData:'',

      currentImg: this.$firebase.auth().currentUser.photoURL,

      showTweet:false,

      tweetImage:'',


      
      

    }
  },

// firebaseからdataを取得して配列にオブジェクトとして格納--------------------------------

  created:  async function() {
     await this.$firestore
          .collection('tweets')
          .orderBy('createdAt', 'desc')
          .onSnapshot((tweetsSnapShot) => {
          this.tweets = []
          tweetsSnapShot.docs.forEach((snapshot) => {
          console.log(snapshot.data())
          let data = {
          'name': snapshot.data().name,
          'message': snapshot.data().message,
          'user': snapshot.data().user,
          'date': snapshot.data().createdAt,
          'id': snapshot.data().id,
          'photoURL': snapshot.data().photoURL,
          'show': snapshot.data().show,
          'good': snapshot.data().good,
        }
          this.tweets.push(data);
          this.showTweet = true
        });
      });

    },



  computed: {
    user () {
      return this.$store.getters['user']
        },
      },

        
  methods: {

        // 並び替えメソッド
        async newOrder(){
            await this.$firestore
            .collection('tweets')
            .orderBy('createdAt', 'desc')
            .get().then((tweetsSnapShot) => {

            this.tweets = []
            tweetsSnapShot.docs.forEach((snapshot) => {

            let data = {
              'name': snapshot.data().name,
              'message': snapshot.data().message,
              'user': snapshot.data().user,
              'date': snapshot.data().createdAt,
              'id': snapshot.data().id,
              'photoURL': snapshot.data().photoURL,
              'show': snapshot.data().show,
              'good': snapshot.data().good,
              }

            this.tweets.push(data);

              });
            });
          },




        async oldOrder(){
              await this.$firestore
              .collection('tweets')
              .orderBy('createdAt', 'asc')
              .get().then((tweetsSnapShot) => {

              this.tweets = []
              tweetsSnapShot.docs.forEach((snapshot) => {

                  let data = {
                  'name': snapshot.data().name,
                  'message': snapshot.data().message,
                  'user': snapshot.data().user,
                  'date': snapshot.data().createdAt,
                  'id': snapshot.data().id,
                  'photoURL': snapshot.data().photoURL,
                  'show': snapshot.data().show,
                  'good': snapshot.data().good,
                }

              this.tweets.push(data);

              });
            });
          },


        

      // ツイートをcreateするmethod
        async onSubmit(){

        const user = await this.$auth()

        // 未ログインの場合
        if (!user) this.$router.push('/login')
        if(this.form.message.val === null) return

        try {


          // ここでfirestoreのdocumentIDを定義
          const documentId = this.$firestore.collection('_').doc().id
          await this.$firestore
          .collection("tweets").doc(documentId)
          .set({
              message: this.form.message.val,
              name:user.uid,
              user:user.displayName,
              photoURL:user.photoURL,
              createdAt: new Date().toLocaleString(),
              id:documentId,
              // show:true,
              good:0,

          })

         this.resetForm()
         this.newOrder()
            
        } catch (e) {
          console.log(e)
        }
          },


          scrollBottom() {
              const element = document.documentElement
              const bottom = element.scrollHeight - element.clientHeight
              window.scroll(0, bottom)
            },

          resetForm() {
            this.form.message.val = null
          },


          changeImg (e) {
           // ここは選択した画像のプレビューをするだけ
            this.tweetImage = e.target.files[0]
            if (this.tweetImage) {
              const reader = new FileReader()
              reader.readAsDataURL(this.tweetImage)
              reader.onload = () => {
                this.tweetImage = reader.result + ''
              }
            }
          },

    },

}


</script>

<style>
  .test-container{
    align-items:center; 
    color:black;
    background-size:cover;
    background-color:white;
    background-attachment: fixed;
    height:100%;
  }

  .tweet-body{
    display:block;
    opacity:0.9;
  }
  

  .tweet-input{
    max-width:80%;
  }

  .tweet-button span{
    color:white;
  }

  .icons{
    justify-content:flex-end;
  }

  .delete-icon{
    margin-left:30px;
    display:block;
    cursor:pointer;
  }


  .tweet{
    color:rgba(0, 0, 0, 0.54);
  }

  .editIcon{
    color:rgba(0, 0, 0, 0.54);

  }
  .subheading{
    color:rgba(0, 0, 0, 0.54);
  }

  .tweet-name{
    color:rgba(0, 0, 0, 0.54);
  }

  .downMenu:hover{
     opacity: 0.7;
 }

 .sort-container{
     max-width: 80%;
     margin: 0 auto;
 }

 .tweet-image-section{
   width: 80%;
   margin: 0 auto 100px auto;
 }

 .tweet-image-select:hover{
   opacity: 0.7;
 }

 
</style>