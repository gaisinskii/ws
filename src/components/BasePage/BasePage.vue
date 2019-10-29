<template>
  <main
    class="base-page"
    :class="`page--${name}`"
  >
    <slot />
  </main>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.base-page {
  height: auto;
  padding: 0 30px;
}
</style>
