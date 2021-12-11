<template>
  <div >
    <v-card
        class="mx-auto justify-center mx-auto mt-10 tweet-body"
        color="grey lighten-4"
        dark
        max-width="80%"
        align="center"
        
      > 
        <v-card-title class="icons">

          <div class="mr-7">
            <v-icon
              large
              right
              class="delete-icon"
              @click="deleteTweet(index)"
              v-show="tweet.name === user.uid"
              color="blue-grey darken-4"
            >
              fas fa-times
            </v-icon>
          </div>


          <div class="text-center">
            <v-dialog
              v-model="dialog"
              width="50%"
              :retain-focus="false"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  large
                  right
                  v-bind="attrs"
                  v-on="on"
                  color="blue-grey darken-4"
                  v-show="tweet.name === user.uid"
                >
                  fas fa-edit
                </v-icon>
                
              </template>

              <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                  ツイート編集
                </v-card-title>
                <v-card-text>
                  <v-text-field 
                    placeholder="編集する内容"
                    v-model="editTweetData"
                  >
                  </v-text-field>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="primary"
                    text
                    @click="editTweet(index)"
                  >
                    編集を完了する
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card-title>

        <v-card-text class="headline font-weight-bold"
                     @click="moveToReplyPage(tweet.id)"
        >
          <p class="tweet">
            {{tweet.message}}
          </p>
        </v-card-text>
      <!-- ツイートに添付される画像 -->
       <div @click="moveToReplyPage(tweet.id)">
        <v-card width="30%"
              class="mx-auto"
              v-show="tweet.tweetImage"
              
              >
          <img :src="tweet.tweetImage"
                class="object-cover border mx-auto"      
                      />
        </v-card>
       </div>
        <!-- <div v-else>
          
        </div> -->

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar 
                color="grey darken-3" 
                size="80" 
                style="cursor:pointer;"
                @click="moveToProfilePage(tweet.name)"
                >
              <v-img
                class="elevation-6"
                alt=""
                :src="tweet.photoURL"
              ></v-img>
            </v-list-item-avatar>
                <!-- :src="currentImg" -->

            <v-list-item-content>
              <v-list-item-title class="tweet-name" v-if="tweet.user">{{tweet.user}}</v-list-item-title>
              <v-list-item-title class="tweet-name" v-else>名無しさん</v-list-item-title>
            </v-list-item-content>

            <v-row
              align="center"
              justify="end"
            >
              <v-icon class="mr-1" color="pink" @click="goodButton">
                mdi-heart
              </v-icon>
              <span class="subheading mr-2">
                {{tweet.good}}
                </span>
              <span class="mr-1">·</span>
              <v-icon class="mr-1">
                <!-- mdi-share-variant -->
              </v-icon>

              <span class="subheading">
                
                {{tweet.date}}
              </span>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card> 
   </div> 
</template>

<script>
  export default{

    props: {
            tweet: Object,
            index: Number
    },

    data(){
    return{

      form: {
        message: {
          val: null
        }
      },



      deleteId:null,

      id:0,

      show:true,

      dialog:false,

      editTweetData:'',

      currentImg: this.$firebase.auth().currentUser.photoURL,

      showTweet:false,
    }
  },

    mounted(){
        console.log('hoge')
    },

    computed: {
    user () {
      return this.$store.getters['user']
        },
    tweets () {
      return this.$store.getters['tweets']
        },    
      },

      methods: {
        moveToReplyPage(tweetId){
          this.$router.push(`/replypage/${tweetId}`)
        },
        moveToProfilePage(tweetName){
          this.$router.push(`/profilepage/${tweetName}`)
        },

        // 編集機能---------------------------------------------------
        async editTweet(index){

          this.dialog = false

          this.editId = this.tweet.id

          console.log(index)

          if(this.editTweetData == null){
              return
           }else{

          await this.$firestore.collection("tweets").doc(this.editId).update({message:this.editTweetData})
          .then(()=>{
                   this.editTweetData = null
                   return
                  //  location.reload()
                 }) 
           }

        },
        
        
         // ツイート削除機能---------------------------------------------
      async deleteTweet(index){
          
          this.deleteId = this.tweet.id

           console.log(this.tweet.id)

            await this.$firestore.collection("tweets").doc(this.deleteId).delete()


                           
       },


      //  いいね機能
      async goodButton(index){

          this.goodId = this.tweet.id
          let tweet =  await this.$firestore.collection("tweets").doc(this.goodId).get()
          // debugger
          console.log(this.goodId)
          await this.$firestore.collection("tweets").doc(this.goodId).update({good:tweet.data().good+1})
          this.$emit('fetch-tweet');
           
        },

  },

  }
</script>

<style>
.tweet{
  font-size: 35px;
}
.tweet-name{
  font-size: 25px;
}
.tweet-body:hover{
  opacity: 0.7;

}


@media screen and (max-width: 600px){
  .tweet{
    font-size: 1.2rem;
  }
.tweet-body{
  width: 90% !important;
  
}

}
</style>