<template>
  <div class="text-center">
    <v-menu offset-y transition="slide-y-transition">
      <template v-slot:activator="{ on, attrs }">
        <div class="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-full">
          <img
            dark
            v-bind="attrs"
            v-on="on"
            class="material-icons text-6xl text-gray object-cover border rounded-full"
            :src="user.photoURL"
          />
        </div>
      </template>
      <v-list>
        <v-list-item style="display:block">
          <v-list-item-title class="pa-3 downMenu" style="cursor:pointer">
            <nuxt-link to="/register">新規登録</nuxt-link>
          </v-list-item-title>
          <v-list-item-title class="pa-3 downMenu" style="cursor:pointer">
            <nuxt-link to="/login">ログイン</nuxt-link>
          </v-list-item-title>
          <v-list-item-title class="pa-3 downMenu" style="cursor:pointer" @click="logOut">ログアウト</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  computed: {
    user() {
      return this.$store.getters["user"];
    }
  },

  methods: {
    async logOut() {
      const user = await this.$auth();
      if (user) {
        this.$store.dispatch("logOut");
      }
    }
  }
};
</script>

<style>
.downMenu:hover {
  opacity: 0.7;
}
</style>