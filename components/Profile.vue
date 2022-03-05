<template>
  <v-card class="mx-auto" max-width="800" tile>
    <v-img
      height="100%"
      src="https://full-count.jp/wp-content/uploads/2018/10/20181017_angelstadium_gi-560x373.jpg"
    >
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="12">
          <v-avatar class="profile" color="grey" size="200" tile>
            <v-img
              src="https://president.ismcdn.jp/mwimgs/a/3/320wm/img_a3cdf02c350038281855740a63f776ff143435.jpg"
            ></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
          <v-list-item color="rgba(0, 0, 0, .4)" dark>
            <v-list-item-content>
              <v-list-item-title class="text-h5">Shohei Ohtani</v-list-item-title>
              <v-list-item-subtitle>Two Way Player</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </v-img>
  </v-card>
</template>

<script>
export default {
  name: "GutitterProfile",

  data() {
    return {};
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss" scoped>
</style>