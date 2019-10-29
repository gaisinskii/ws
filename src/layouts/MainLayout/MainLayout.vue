<template>
  <base-layout name="main">
    <transition
      name="fade"
      mode="out-in"
    >
      <router-view />
    </transition>
  </base-layout>
</template>

<script>
import BaseLayout from '@/components/BaseLayout/BaseLayout.vue';

export default {
  components: {
    BaseLayout,
  },
  data() {
    return {
    };
  },
};
</script>

<style lang="scss">
.layout--main {
  .layout {
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
