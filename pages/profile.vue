<template>
  <div class="profile-container">
      <v-card class="mx-auto align-center py-16 profile-contents" width="60%">
          <div class="flex items-center justify-center flex-col w-full h-full mt-8">
            <div
              class="flex items-center justify-center w-60 h-60 bg-gray-200 rounded-full border border-white-400">

                <template v-if="postData.thumbnail">
                    <img
                      :src="postData.thumbnail"
                      class="w-60 h-60 object-cover border rounded-full"
                      
                    />
                  </template>

                <template v-else-if="user.photoURL">
                    <img
                      :src="user.photoURL"
                      class="w-60 h-60 object-cover border rounded-full"      
                    />
                </template>

                <template v-else>
                    <i class="material-icons text-9xl text-white">
                      person
                    </i>
                </template>
            </div>
          </div>

          <div class="mt-7" align="center">
              <v-btn
                    depressed
                    color="primary"
                    width="200px"
                    class="pa-0"
                  >
                    <label class="label semi-bold">
                      プロフィール画像を選択
                      <input
                        type="file"
                        accept="image/*"
                        @change="changeImg"
                        style="display: none"
                      />
                    </label>
              </v-btn>
          </div>

          <div align="center" class="mt-3">
              <v-btn
                    depressed
                    color="teal"
                    width="200px"
                    class="pa-0"
                    @click="updateImage"
                  >
                画像をサムネイルとして登録
              </v-btn>   
          </div>

          <p class="mt-3" align="center"></p>


          <v-card-subtitle class="pb-3 profile-vcard-subtitle my-5" align="center">
              <p>UserName</p>   {{user.name}}
          </v-card-subtitle>
          

          <v-card-subtitle class="pb-3 profile-vcard-subtitle my-5" align="center" color="orange">
              <p>MailAdress</p>  {{user.email}}
          </v-card-subtitle>
    
      </v-card>
  </div>
  
</template>

<script>
export default {

middleware: ['checkLogOut'],

   data(){
     return{
          email: '',
          password: '',
          updateName: '',
          thumbnail: '',

          postData: {
            thumbnail: '',
          },
      }
   },
     
   

   computed: {
   user () {
     return this.$store.getters['user']

      }
    },

    methods:{
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
          },
        },

}

</script>

<style>
  .profile-container{
    display:flex;
    align-items:center;
    height: 100vh;
  }

  .profile-vcard-subtitle{
    font-size:24px;
    color:orange;
    border-bottom:1px solid grey;
    max-width:80%;
    margin:0 auto;
  }

  .label{
    width:100%;
  }

  .profile-contents{
    /* border: none !important; */
  }
</style>