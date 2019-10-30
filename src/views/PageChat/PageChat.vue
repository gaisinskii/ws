<template>
  <base-page name="chat">
    <h1 class="page__heading">
      {{ user }}, добро пожаловать в няшный чатик!
    </h1>
    <div class="page__message-box">
      <base-message
        v-for="(msg, index) in messages"
        :key="index"
        :value="msg"
      />
    </div>
    <form
      class="page__form"
      @submit.prevent="sendMessage"
    >
      <div class="page__form--inner">
        <input
          v-model="message"
          :maxlength="maxLength"
          class="page__input"
          type="text"
          required
        >
        <button
          ref="sendMsgBtn"
          :disabled="btnDisabled"
          :class="btnDisabled ? 'page__button--disabled' : ''"
          type="submit"
          class="page__button"
        />
        <span class="page__input-counter">{{ maxLength - message.length }}</span>
      </div>
    </form>
    <div class="page__status-box">
      <button @click="close">
        close connection
      </button>
      <div
        v-for="(status, index) in statuses"
        :key="index"
        class="page__status"
      >
        {{ status }}
      </div>
    </div>
  </base-page>
</template>

<script>
import { mapState } from 'vuex';
import BasePage from '@/components/BasePage/BasePage.vue';
import BaseMessage from '@/components/BaseMessage/BaseMessage.vue';

export default {
  components: {
    BasePage,
    BaseMessage,
  },
  data() {
    return {
      ws: null,
      message: '',
      messages: [],
      statuses: [],
      maxLength: 300,
      btnDisabled: true,
    };
  },

  computed: {
    ...mapState(['user']),
  },

  watch: {
    messages: {
      handler() {
        if (this.messages.length > 15) {
          this.messages.shift();
        }
      },
      deep: true,
    },
  },

  created() {
    this.ws = new WebSocket(`ws://pm.tada.team/ws?name=${this.user}`);
    this.ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      this.messages.push(data);
    };
    this.ws.onopen = (e) => {
      this.statuses.push(`Connection opened on ${e.target.url}`);
      this.btnDisabled = false;
    };
    this.ws.onclose = (e) => {
      if (e.code !== 1000) {
        this.statuses.push('Connection was closed');
        this.btnDisabled = true;
      }
    };
    this.ws.onerror = () => {
      this.statuses.push('Some error with websocket has occured');
    };
    window.addEventListener('offline', this.handleConnectionChange);
    window.addEventListener('online', this.handleConnectionChange);
  },
  destroyed() {
    window.removeEventListener('offline', this.handleConnectionChange);
    window.removeEventListener('online', this.handleConnectionChange);
  },
  methods: {
    sendMessage() {
      this.$refs.sendMsgBtn.classList.add('page__button--animation');
      this.ws.send(JSON.stringify({ text: this.message }));
      this.message = '';
      setTimeout(() => {
        this.$refs.sendMsgBtn.classList.remove('page__button--animation');
      }, 500);
    },
    close() {
      this.ws.close();
    },
    handleConnectionChange(e) {
      if (e.type === 'offline') {
        this.statuses.push('Internet disconnected');
        this.btnDisabled = true;
      }
      if (e.type === 'online') {
        this.statuses.push('Internet connected');
        this.btnDisabled = false;
      }
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
      margin-bottom: 20px;
    }
    &__message-box {
      position: relative;
      height: 400px;
      width: 900px;
      overflow-y: scroll;
      &::after {
        display: block;
        position: absolute;
        content: "";
        width: 100%;
        height: 3px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    &__form {
      position: relative;
      height: 60px;
      background: linear-gradient(135deg, #fff3b0 10%, #ca26ff 100%);
      padding: 3px;
      border-radius: 3px;
      &--inner {
        display: flex;
        position: relative;
        justify-content: space-between;
        background: #fff;
        height: 100%;
      }
    }
    &__button,
    &__input {
      height: 100%;
      border: none;
      background: transparent;
      &:focus {
        outline: none;
      }
    }
    &__input {
      width: 100%;
      padding: 10px;
    }
    &__input-counter {
      position: absolute;
      right: 0;
      bottom: -25px;
    }
    &__button {
      width: 54px;
      background: url("../../assets/images/send.png") no-repeat center;
      background-size: 34px 34px;
      filter: invert(29%) sepia(11%) saturate(2218%) hue-rotate(210deg)
        brightness(90%) contrast(86%);
      transition-duration: 0.4s;
      transition-property: transform;
      &--disabled {
        background: url("../../assets/images/stop.png") no-repeat center;
        filter: none;
        background-size: 34px 34px;
      }
      &--animation {
        animation: spin 0.5s;
      }
    }
    &__status-box {
      height: 100px;
      margin-top: 35px;
      overflow-y: scroll;
    }
    &__status {
      margin: 10px 0;
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
