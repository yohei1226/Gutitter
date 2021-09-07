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
   </div> 
</template>

<script>
export default {

data() {
    return {
        id:this.$route.params.id,
        tweetData:[],
        
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
  },



}
</script>
<style>

</style>