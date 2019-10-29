<template>
  <base-page name="chat">
    <h1 class="page__heading">
      {{ user }}, добро пожаловать в няшный чатик!
    </h1>
    <button @click="send">
      send msg
    </button>
  </base-page>
</template>

<script>
import { mapState } from 'vuex';
import BasePage from '@/components/BasePage/BasePage.vue';

export default {
  components: {
    BasePage,
  },
  data() {
    return {
      ws: null,
    };
  },

  computed: {
    ...mapState(['user']),
  },

  created() {
    this.ws = new WebSocket(`ws://pm.tada.team/ws?name=${this.user}`);
  },
  methods: {
    send() {
      this.ws.send(JSON.stringify({ text: 'hello hehe!' }));
    },
  },
};
</script>

<style lang="scss">
.page--chat {
  padding: 0 30px;
  .page {
    &__heading {
      color: #4f4777;
      font-weight: bold;
      letter-spacing: -1.5px;
      font-size: 26px;
    }
  }
}
</style>
