<template>
  <div
    class="base-message"
    :class="value.hasOwnProperty('name') ? 'base-message--user' : 'base-message--system'"
  >
    <div
      v-if="value.hasOwnProperty('name')"
      class="base-message__inner"
    >
      <!-- {{ value.created }} -->
      <p class="base-message__name">
        {{ computedUserName }}:
      </p>
      <p class="base-message__text">
        {{ value.text }}
      </p>
    </div>
    <div
      v-else
      class="base-message__inner"
    >
      {{ value.text }}
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    value: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    ...mapState(['user']),
    computedUserName() {
      // Знаю-знаю, тут будут коллизии, но хотелось как-то своего пользователя выделить
      return this.value.name === this.user ? 'Я' : this.value.name;
    },
  },
};
</script>

<style lang="scss">
.base-message {
  &--user {
    position: relative;
    padding: 10px 0px 10px 10px;
    margin: 10px 0;
    &::before {
      display: block;
      position: absolute;
      content: "";
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      height: 100%;
      width: 3px;
      background: linear-gradient(135deg, #f6d242 10%, #ff52e5 100%);
    }
  }
  &--system {
    color: darkgray;
    .base-message__inner {
      justify-content: center;
    }
  }
  &__inner {
    display: flex;
  }
  &__name {
    font-weight: bold;
    margin-right: 5px;
    white-space: nowrap;
  }
  &__text {
    word-break: break-word;
  }
}
</style>
