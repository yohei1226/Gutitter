
<template>
  <div class="justify-center register-container mt-1" align="center">
    <v-card @submit.prevent="onSubmit"
              lazy-validation 
              class="mx-auto login-vcard" 
              max-width="300"
              min-width="300"
              max-height="600px"
              >

          <v-toolbar color="indigo" align="center" class="login-toolbar">
            <h1 align="center" class="text-4xl login-h1">LOGIN</h1>
         </v-toolbar>

      <div class="px-10 mt-10">
            <v-text-field
              label="E-mail"
              type="mailAddress"
              v-model="form.mail.val"
              :class="{ 'border-red-500': form.mail.errorMessage }"
              @blur="validateEmail"
              id="mailAddress"
            ></v-text-field>

            <span v-show="form.mail.errorMessage" class="text-red text-sm">
              {{form.mail.errorMessage}}
            </span>

            <v-text-field
              label="Password"
              type="password"
              id="password"
              v-model="form.password.val"
              :class="{ 'border-red-500': form.password.errorMessage }"
              @blur="validatePassWord"
            ></v-text-field>
            
            <span v-show="form.password.errorMessage" class="text-red text-sm">
              {{form.password.errorMessage}}
            </span>
                              
            <div class="button-area" align="center">
                <v-btn
                  class="mr-4 login"
                  v-show="!form.mail.errorMessage"
                  @click="onSubmit"
                  color="indigo"
                >
                LOGIN
                </v-btn>

                <v-btn @click="allClear">
                  clear
                </v-btn>
            </div>

            <div class="mb-10 mt-10" align="center">
              <v-btn
                color="pink lighten-1"
                dark
                large
                @click="guestLogIn"
                class="gradation1"
                >
                ゲストログイン
              </v-btn>  
            </div>
      </div>
   </v-card>
  </div>
</template>


<script>
 export default {
    middleware: ['checkLogin'],

      data() {
      return {

      form: {
        imageUrl: {
          val: null
        },

        mail: {
          label: 'メールアドレス',
          val: null,
          errorMessage: null
        },

        password: {
          label: 'パスワード',
          val: null,
          errorMessage: null
        },
      },
      }
      },

    computed: {
   user () {
     return this.$store.getters['user']
   },
 },

 
   methods:{

     validateEmail() {
        const { mail } = this.form;
        const maxLength = 50 ;
    
        if (!mail.val) {
          mail.errorMessage = `${mail.label}は必須入力項目です`
          return
        }
    
        if (mail.val.length > maxLength) {
          mail.errorMessage = `${mail.label}は${maxLength}文字以内です。`
          return
        }

        // let reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
        let reg = /^[a-z0-9]{1}[a-z0-9_.-]*@{1}[a-z0-9_.-]{1,}\.[a-z0-9]{1,}$/;

        if(!mail.val.match(reg)){
            mail.errorMessage = `メールアドレスは、半角英数字で入力し 最後に@---.comや　@---.ne.jpの形式で入力して下さい。`
          return
        }
        mail.errorMessage = null
      },


      validatePassWord() {
        const { password } = this.form;
        const maxLength = 50 ;
    
        if (!password.val) {
          password.errorMessage = `${password.label}は必須入力項目です`
          return
        }
    
        if (password.val.length > maxLength) {
          password.errorMessage = `${password.label}は${maxLength}文字以内です。`
          return
        }

        // let reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
        let reg = /^[a-z0-9]{6}/;

        if(!password.val.match(reg)){
            password.errorMessage = `パスワードは、6文字以上50文字以内で入力して下さい。`
          return
        }
        password.errorMessage = null
      },


      allClear(){
         this.form.mail.errorMessage = null
         this.form.password.errorMessage = null
      },

      update () {
        this.$store.dispatch('update', this.updateName)
      },

      login(email, password) {
        this.$store.dispatch('login', {email: this.form.mail.val, password: this.form.password.val})
      },

      guestLogIn() {
        // this.$router.push('/finishedLogIn')
        this.$firebase.auth().signInAnonymously()
          .then(() => {
            // Signed in..
            console.log('ログイン成功')

            
          }).then(()=>{
            this.$store.dispatch('checkLogin')
          }).then(()=>{
            location.reload()
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
    },

      onSubmit() {

        this.validateEmail()
        this.validatePassWord()
            

        if(!this.form.mail.errorMessage && !this.form.password.errorMessage){

             this.login()
          }
        },

   }
      
}
</script>


<style>
  form{
    /* margin-top:50px; */
    max-width:500px;
    margin:50px auto;
    border:1px solid grey;
    padding:40px;
    border-radius:10px;
  }

  .text-red{
    color:red;
  }
  .sousin{
    margin-top:50px;
  }
  .button-area{
    margin-top:40px;
    flex:right;
  }

  .login-h1{
    color:#fff;
    flex:none;
    margin:0;
  }
  .login-container{
    height:100%;
    display:flex;
    align-items:center;
    
  }
  .login-vcard{
     /* margin-top:200px; */
     min-width:400px;
  }
  .login-toolbar{
    align-content:center;
  }
  .login span{
    color: white;
  }

</style>