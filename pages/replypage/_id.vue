<template>
  <div >
    <v-card
        class="mx-auto justify-center mx-auto mt-10"
        color="grey lighten-4"
        dark
        max-width="80%"
        align="center"
       
      > 
        

        <v-card-text class="headline font-weight-bold">
          <p class="tweet">
            {{tweetData.message}}
          </p>
        </v-card-text>
      <!-- ツイートに添付される画像 -->
        <v-card width="30%"
              class="mx-auto"
              v-show="tweetData.tweetImage"
              >
          <img :src="tweetData.tweetImage"
                class="object-cover border mx-auto"      
                      />
        </v-card>
        <!-- <div >
          
        </div> -->

        <v-card-actions>
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3" size="62">
              <v-img
                class="elevation-6"
                alt=""
                :src="tweetData.photoURL"
              ></v-img>
            </v-list-item-avatar>
                <!-- :src="currentImg" -->

            <v-list-item-content>
              <v-list-item-title class="tweet-name">{{tweetData.user}}</v-list-item-title>
            </v-list-item-content>

            <v-row
              align="center"
              justify="end"
            >
              <v-icon class="mr-1" color="pink" @click="goodButton">
                mdi-heart
              </v-icon>
              <span class="subheading mr-2">
                {{tweetData.good}}
                </span>
              <span class="mr-1">·</span>
              <v-icon class="mr-1">
                <!-- mdi-share-variant -->
              </v-icon>

              <span class="subheading">
                
                {{tweetData.createdAt}}
              </span>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </v-card>

      <div class="pt-10 mx-auto tweet-input mb-3 mt-16" style="display:flex">
        <v-text-field placeholder="返信をツイート" v-model="replyMessage"></v-text-field>
        <v-btn
          depressed
          color="indigo"
          class="mt-3 ml-10 tweet-button"
          @click="pushToFirestore"
        >
          reply
        </v-btn>
      </div>

      <v-list three-line max-width="80%" class="mx-auto" v-for="(reply, index) in replys" :key="index" @click="deleteReply">
      <template>
        <v-subheader
          v-if="reply.header"
          :key="reply.header"
          v-text="reply.header"
        ></v-subheader>

        <v-divider
          v-else-if="reply.divider"
          :key="index"
          :inset="reply.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="reply.title"
          
        >
          <v-list-item-avatar width="70px" height="70px">
            <v-img :src="reply.photoURL"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="reply.user">{{reply.user}}</v-list-item-title>
            <v-list-item-title v-else>名無しさん</v-list-item-title>
            <v-list-item-subtitle><p class="reply-message">{{reply.message}}</p></v-list-item-subtitle>
            <v-divider></v-divider>
          </v-list-item-content>
           <!-- <p class="pl-10">ahos</p> -->
           <!-- <i class="fas fa-ellipsis-v fa-lg"></i> -->

    <v-menu
      transition="slide-x-transition"
      bottom
      right
    >
      <template v-slot:activator="{ on, attrs }">
        <i
          v-bind="attrs"
          v-on="on"
          class="fas fa-ellipsis-v fa-lg"
          v-show="reply.name === user.uid"
        >
        </i>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-title @click="deleteReply(reply.id)">{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
        </v-list-item>
      </template>
    </v-list>

   </div> 
</template>

<script>
export default {
middleware: ['checkLogOut'],
data() {
    return {
        id:this.$route.params.id,
        tweetData:[],
        replyMessage:'',
        replys: [],
        items: [
        { title: 'DeleteReply' },
      ],
    }
},

computed: {
    user () {
      return this.$store.getters['user']
        },
    tweets () {
      return this.$store.getters['tweets']
        },
    
  },

  created: async function(){
    await this.$firestore.collection("tweets")
          .doc(this.id).get().then((doc)=>{
            // console.log(doc.data())
            this.tweetData = doc.data()
            // this.tweetData.push(doc.data())
          }).then(()=>{
              console.log(this.tweetData)
          })
      
     await this.$firestore
          .collection('replys').doc(this.id)
          .collection('comment')
          .orderBy('createdAt', 'desc')
          .onSnapshot((replysSnapShot) => {
          this.replys = []
        //   this.$store.dispatch('emptyTweets')
          replysSnapShot.docs.forEach((snapshot) => {
          console.log(snapshot.data())
          let data = {
          'name': snapshot.data().name,
          'message': snapshot.data().message,
          'user': snapshot.data().user,
          'date': snapshot.data().createdAt,
          'id': snapshot.data().id,
          'photoURL': snapshot.data().photoURL,
        //   'show': snapshot.data().show,
          'good': snapshot.data().good,
        //   'divider': snapshot.data().divider,
        //   'inset': snapshot.data().inset,
          
        //   'tweetImage':snapshot.data().tweetImage,
        }
          this.replys.push(data);
        //   this.$store.dispatch('pushToTweets',data)
        //   this.showTweet = true
        });
      }); 

  },

  methods:{
   
    async deleteReply(replyId){
     console.log(replyId)
     await this.$firestore.collection('replys').doc(this.id)
           .collection('comment').doc(replyId).delete()

    },

    async goodButton(){

          this.goodId = this.tweetData.id
          let tweet =  await this.$firestore.collection("tweets").doc(this.goodId).get()
          // debugger
          console.log(this.goodId)
          await this.$firestore.collection("tweets").doc(this.goodId).update({good:tweet.data().good+1})
        //   this.$emit('fetch-tweet');
           
        },

       async pushToFirestore(){
           const user = await this.$auth()

        // 未ログインの場合
        if (!user) this.$router.push('/login')
        if(this.replyMessage === null) return

        try {


          // ここでfirestoreのdocumentIDを定義
          const docId = this.id
          const docId2 = this.$firestore.collection('_').doc().id
          await this.$firestore
          .collection("replys").doc(docId).collection('comment').doc(docId2)
          .set({
              message: this.replyMessage,
              name:user.uid,
              user:user.displayName,
              photoURL:user.photoURL,
              createdAt: new Date().toLocaleString(),
              id:docId2,
              divider:true,
              inset:true,
            //   good:0,
            //   tweetImage:this.tweetImagePreview,

          }).then(()=>{
            this.replyMessage = null
          })
        } catch (e) {
          console.log(e)
        }
        },


  },



}
</script>
<style>
 .replyContent{
   border-bottom: 1px solid grey;
 }
 .fa-ellipsis-v{
     color: grey;
 }
 .reply-message{
     font-size: 1.2rem;
     margin: 0px !important;
 }
</style>