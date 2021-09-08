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
<p>{{replyMessage}}</p>
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

      <v-list three-line max-width="80%" class="mx-auto">
      <template v-for="(reply, index) in replys">
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
            <v-img :src="reply.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
            <!-- <v-list-item-subtitle>aaaaaaaaaaaaaaaaaaaaa</v-list-item-subtitle> -->
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

   </div> 
</template>

<script>
export default {

data() {
    return {
        id:this.$route.params.id,
        tweetData:[],
        replyMessage:'',

        replys: [
        { header: 'replys' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        },
        { divider: true, inset: true },
        // {
        //   avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        //   title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        //   subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        //   title: 'Oui oui',
        //   subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        //   title: 'Birthday gift',
        //   subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        // },
        // { divider: true, inset: true },
        // {
        //   avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
        //   title: 'Recipe to try',
        //   subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        // },
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

  },

  methods:{
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

</style>