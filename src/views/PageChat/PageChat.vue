<template>
  <base-page name="chat">
    <h1 class="page__test2">
      chat page here
    </h1>
  </base-page>
</template>

<script>
import BasePage from '@/components/BasePage/BasePage.vue';

export default {
  components: {
    BasePage,
  },
  data() {
    return {
    };
  },


};
</script>

<style lang="scss">
.page--chat {
  .page {
    &__test2 {
      color: $test2;
    }
  }
}
</style>
