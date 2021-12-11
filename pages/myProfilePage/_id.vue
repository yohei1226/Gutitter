<template>
<div>
  <v-card class="profile-top-image">
            <v-img
              src="https://www.knt.co.jp/holiday/images/zekkei_nature_mv.jpg"
              height="300"
              class="grey darken-4"
            ></v-img>
  </v-card>
<div class="profile-icon">
    <v-avatar
        color="grey"
        size="240"
        @click="selectImage"
        style="cursor:pointer;"
        >
         <template v-if="user.photoURL">
                    <img
                      :src="user.photoURL"
                      class="w-60 h-60 object-cover border rounded-full"
                      
                    />
                  </template>

                <template v-else-if="postData.thumbnail">
                    <img
                      :src="postData.thumbnail"
                      class="w-60 h-60 object-cover border rounded-full"      
                    />
                </template>

                <template v-else>
                    <i class="material-icons text-9xl text-white">
                      person
                    </i>
                </template>
                    <input
                      ref="image"
                      type="file"
                      style="display: none"
                      accept="image/*"
                      @change="changeImg"
                    />
    </v-avatar>
    <p class="profile-text">{{currentUser}}</p>
</div>

<div class="tabs-section">
    <v-toolbar
      color="white"
      dark
      flat
      prominent
    >
      <!-- <v-text-field
        append-icon="mdi-microphone"
        class="mx-4"
        flat
        hide-details
        label="Search"
        prepend-inner-icon="mdi-magnify"
        solo-inverted
      ></v-text-field> -->

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          centered
        >
          <v-tab class="v-tab"
          >
          <p style="color:grey;">
            Tweet
          </p>
          </v-tab>
          <v-tab class="v-tab"
          >
          <p style="color:grey;">
            Follow
          </p>
          </v-tab>
          <v-tab class="v-tab"
          >
          <p style="color:grey;">
            Likes
          </p>
          </v-tab>
          <!-- <v-tab
            v-for="n in 3"
            :key="n"
          >
          <p style="color:grey">
            Item {{ n }}
          </p>
          </v-tab> -->
        </v-tabs>
      </template>
    </v-toolbar>

    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title class="text-h5">
            An awesome title
          </v-card-title>
          <v-card-text>
            <p>
              Duis lobortis massa imperdiet quam. Donec vitae orci sed dolor rutrum auctor. Vestibulum facilisis, purus nec pulvinar iaculis, ligula mi congue nunc, vitae euismod ligula urna in dolor. Praesent congue erat at massa.
            </p>

            <p>
              Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Pellentesque egestas, neque sit amet convallis pulvinar, justo nulla eleifend augue, ac auctor orci leo non est. Etiam sit amet orci eget eros faucibus tincidunt. Donec sodales sagittis magna.
            </p>

            <p class="mb-0">
              Ut leo. Suspendisse potenti. Duis vel nibh at velit scelerisque suscipit. Fusce pharetra convallis urna.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-title class="text-h5">
            An even better title
          </v-card-title>
          <v-card-text>
            <p>
              Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed hendrerit. Maecenas malesuada. Vestibulum ullamcorper mauris at ligula. Proin faucibus arcu quis ante.
            </p>

            <p class="mb-0">
              Etiam vitae tortor. Curabitur ullamcorper ultricies nisi. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis. Aliquam lobortis. Suspendisse potenti.
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </div>
</div>
  
</template>

<script>
export default {
  middleware: ['checkLogOut'],
   data () {
      return {
        tabs: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        currentUser:this.$firebase.auth().currentUser.displayName,
        thumbnail: null,

          postData: {
            thumbnail: null,
          },
      //   form: {
      //   imageUrl: {
      //     val: null
      //   }
      // }
      }
    },
    computed:{
      user() {
      return this.$store.getters["user"];
    },
    },
    methods:{
      selectImage() {
      this.$refs.image.click()
    },

    // onSelectFile(e) {
    //   const files = e.target.files
    //   if (files.length === 0) return

    //   const reader = new FileReader()
    //   reader.readAsDataURL(files[0])

    //   reader.addEventListener('load', () => {
    //     this.upload({
    //       localImageFile: files[0]
    //     })
    //   })
    // },

    // async upload({ localImageFile }) {
    //   const user = await this.$auth()


    //   if (!user) this.$router.push('/login')


    //   const storageRef = this.$fireStorage.ref()


    //   const imageRef = storageRef.child(
    //     `images/${user.uid}/${localImageFile.name}`
    //   )


    //   const snapShot = await imageRef.put(localImageFile)
    //   this.form.imageUrl.val = await snapShot.ref.getDownloadURL()
    // },



       async updateImage(){
          if(this.thumbnail){
            console.log(this.thumbnail)
            this.$store.dispatch('updateImage', {thumbnail: this.thumbnail})
          }
       },

       changeImg (e) {
           // ここは選択した画像のプレビューをするだけ
            this.thumbnail = e.target.files[0]
            if (this.thumbnail) {
              const reader = new FileReader()
              reader.readAsDataURL(this.thumbnail)
              reader.onload = () => {
                this.postData.thumbnail = reader.result + ''
              }
            }
            this.updateImage()
          },

          
        },
}
</script>

<style>
.profile-top-image{
    position: relative;
}
.profile-icon{
    /* margin-top: 100px; */
    /* margin-left: 100px; */
    top: 200px;
    left: 18%;
    /* top: 300px; */
    /* left: 200px; */
    position: absolute;
    display: flex;
    z-index: 10;

}
.profile-text{
    text-align: center;
    padding-top: 34%;
    width: 200px;
    font-size: 3rem;
}
.tabs-section{
    margin:0 auto;
    padding-top: 120px;
    width: 64%;
}
.v-tabs-slider {
    background-color: currentColor;
    background: grey;
    height: 100%;
    width: 100%;
}
.v-tab{
    padding: 0 ;
    margin-right: 50px;
}
</style>