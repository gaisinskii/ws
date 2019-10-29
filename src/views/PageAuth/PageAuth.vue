<template>
  <base-page name="auth">
    <h1 class="page__test1">
      auth page here
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
.page--auth {
  .page {
    &__test1 {
      color: $test;
    }
  }
}
</style>
