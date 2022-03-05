<template>
  <transition name="fade">
    <v-btn
      v-scroll="onScroll"
      v-show="fab"
      fab
      dark
      fixed
      bottom
      right
      class="topButton"
      color="pink"
      @click="toTop"
    >
      <v-icon x-large>fas fa-angle-up</v-icon>
      <!-- <span class="text-xl">Topへ</span> -->
    </v-btn>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      fab: false
    };
  },

  methods: {
    onScroll(e) {
      if (typeof window === "undefined") return;
      const top = window.pageYOffset || e.target.scrollTop || 0;
      this.fab = top > 500;
    },
    toTop() {
      this.$vuetify.goTo(0);
    }
  }
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.topButton {
  height: 3.5rem !important;
  width: 3.5rem !important;
}
</style>