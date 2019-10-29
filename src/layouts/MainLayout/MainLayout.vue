<template>
  <base-layout name="main">
    <header class="layout__header">
      <div class="layout__header-block">
        <img
          src="@/assets/images/logo.png"
          alt="application logo"
          class="layout__logo-img"
        >
      </div>
      <div class="layout__header-block">
        <span class="layout__logo-text">НЧ</span>
      </div>
    </header>
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
  background-image: url("../../assets/images/blob-shape.svg");
  background-repeat: no-repeat;
  background-position: right -250px top -250px;
  .layout {
    &__header {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 30px;
    }
    &__logo-img {
      height: 50px;
      width: 50px;
      margin-right: 5px;
    }
    &__logo-text {
      font-size: 30px;
      font-weight: bold;
      color: #fff;
    }
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
