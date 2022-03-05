<template>
  <div class="justify-center register-container mt-1" align="center">
    <v-card
      @submit.prevent="onSubmit"
      lazy-validation
      class="mx-auto register-vcard"
      min-width="300"
      min-height="500"
    >
      <v-toolbar color="indigo" align="center" class="register-toolbar">
        <h1 align="center" class="text-4xl register-h1">SIGN UP</h1>
      </v-toolbar>

      <div class="px-10 mt-10">
        <v-text-field
          label="Name"
          v-model="form.name.val"
          :class="{ 'border-red-500': form.name.errorMessage }"
          @blur="validateName"
          required
          id="name"
        ></v-text-field>

        <span v-show="form.name.errorMessage" class="text-red text-sm">{{form.name.errorMessage}}</span>

        <v-text-field
          label="E-mail"
          type="mailAddress"
          v-model="form.mail.val"
          :class="{ 'border-red-500': form.mail.errorMessage }"
          @blur="validateEmail"
          id="mailAddress"
        ></v-text-field>

        <span v-show="form.mail.errorMessage" class="text-red text-sm">{{form.mail.errorMessage}}</span>

        <v-text-field
          label="Password"
          type="password"
          id="password"
          v-model="form.password.val"
          :class="{ 'border-red-500': form.password.errorMessage }"
          @blur="validatePassWord"
        ></v-text-field>

        <span
          v-show="form.password.errorMessage"
          class="text-red text-sm"
        >{{form.password.errorMessage}}</span>
      </div>

      <div class="button-area">
        <v-btn
          class="mr-4 sign-up"
          v-show="!form.mail.errorMessage&&!form.name.errorMessage"
          @click="onSubmit"
          color="indigo"
        >SignUp</v-btn>

        <v-btn @click="allClear">clear</v-btn>
      </div>

      <div class="my-2 my-10">
        <v-btn color="pink lighten-1" dark large @click="guestLogIn" class="gradation1">ゲストログイン</v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  middleware: ["checkLogin"],

  data() {
    return {
      route: "/login",

      form: {
        name: {
          label: "名前",
          val: null,
          errorMessage: null
        },

        mail: {
          label: "メールアドレス",
          val: null,
          errorMessage: null
        },

        password: {
          label: "パスワード",
          val: null,
          errorMessage: null
        }
      }
    };
  },

  computed: {
    user() {
      return this.$store.getters["user"];
    }
  },

  methods: {
    guestLogIn() {
      // this.$store.dispatch('googleLogIn')
      this.$firebase
        .auth()
        .signInAnonymously()
        .then(() => {
          // Signed in..
          console.log("ログイン成功");
        })
        .then(() => {
          this.$store.dispatch("checkLogin");
        })
        .then(() => {
          location.reload();
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
        });
    },

    validateName() {
      const { name } = this.form;
      const maxLength = 20;

      if (!name.val) {
        name.errorMessage = `${name.label}は必須入力項目です`;
        return;
      }

      if (name.val.length > maxLength) {
        name.errorMessage = `${name.label}は${maxLength}文字以内です。`;
        return;
      }

      name.errorMessage = null;
    },

    validateEmail() {
      const { mail } = this.form;
      const maxLength = 50;

      if (!mail.val) {
        mail.errorMessage = `${mail.label}は必須入力項目です`;
        return;
      }

      if (mail.val.length > maxLength) {
        mail.errorMessage = `${mail.label}は${maxLength}文字以内です。`;
        return;
      }

      // let reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      let reg = /^[a-z0-9]{1}[a-z0-9_.-]*@{1}[a-z0-9_.-]{1,}\.[a-z0-9]{1,}$/;

      if (!mail.val.match(reg)) {
        mail.errorMessage = `メールアドレスは、半角英数字で入力し 最後に@***.comや　@***.ne.jpの形式で入力して下さい。`;
        return;
      }

      mail.errorMessage = null;
    },

    validatePassWord() {
      const { password } = this.form;
      const maxLength = 50;

      if (!password.val) {
        password.errorMessage = `${password.label}は必須入力項目です`;
        return;
      }

      if (password.val.length > maxLength) {
        password.errorMessage = `${password.label}は${maxLength}文字以内です。`;
        return;
      }

      // let reg = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      let reg = /^[a-z0-9]{6}/;

      if (!password.val.match(reg)) {
        password.errorMessage = `パスワードは、6文字以上50文字以内で入力して下さい。`;
        return;
      }

      password.errorMessage = null;
    },

    allClear() {
      this.form.name.errorMessage = null;
      this.form.mail.errorMessage = null;
      this.form.password.errorMessage = null;
    },

    register() {
      this.$store.dispatch("register", {
        email: this.form.mail.val,
        password: this.form.password.val,
        name: this.form.name.val
      });
    },

    onSubmit() {
      this.validateName();
      this.validateEmail();
      this.validatePassWord();

      if (
        !this.form.mail.errorMessage &&
        !this.form.password.errorMessage &&
        !this.form.name.errorMessage
      ) {
        this.register();
      }
    }
  }
};
</script>

<style>
form {
  max-width: 350px;
  margin: 150px auto;
}

.text-red {
  color: red;
}
.sousin {
  margin-top: 50px;
}
.button-area {
  margin-top: 40px;
}
.sign-up span {
  color: white;
}
.register-h1 {
  color: #fff;
  flex: none;
}
.register-container {
  height: 100%;
  display: flex;
  align-items: center;
}
.register-vcard {
  min-width: 400px;
}
.register-toolbar {
  align-content: center;
}
</style>