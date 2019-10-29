<template>
  <base-page name="auth">
    <div class="page__header">
      <h1 class="page__heading">
        Вход
      </h1>
      <p class="page__hint">
        Чтобы зайти в няшный чатик введи своё имя и нажми "Погнали"
      </p>
    </div>
    <form
      class="page__form"
      @submit.prevent="connectUserToChat"
    >
      <input
        v-model="user"
        class="page__input"
        type="text"
        placeholder="Андрей"
        required
      >
      <button
        class="page__button"
        type="submit"
      >
        Погнали
      </button>
    </form>
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
      user: '',
    };
  },
  methods: {
    connectUserToChat() {
      this.$store.commit('ADD_USER', this.user);
      this.$router.push({ name: 'PageChat' });
    },
  },


};
</script>

<style lang="scss">
.page--auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto;
  margin-top: 100px;
  .page {
    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &__heading {
      position: relative;
      color: #4f4777;
      font-weight: bold;
      letter-spacing: -1.5px;
      font-size: 40px;
      &::after {
        display: block;
        position: absolute;
        content: "";
        width: 110%;
        height: 3px;
        bottom: -15px;
        right: 50%;
        transform: translateX(50%);
        background-image: linear-gradient(135deg, #f6d242 10%, #ff52e5 100%);
      }
    }
    &__hint {
      max-width: 80%;
      margin-top: 35px;
      color: #a9a9a9;
      text-align: center;
    }
    &__form {
      display: flex;
      flex-direction: column;
      width: 50%;
      margin-top: 30px;
    }
    &__input,
    &__button {
      background: transparent;
      border: none;
    }
    &__input {
      border-bottom: 1px solid #d3d3d3;
      margin-bottom: 15px;
      padding: 5px 5px 5px 0;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: #d3d3d3;
      }
    }
    &__button {
      padding: 15px;
      border-radius: 20px;
      color: #fff;
      text-transform: uppercase;
      font-weight: bold;
      background-image: linear-gradient(135deg, #ff9d6c 10%, #bb4e75 100%);
      margin-top: 15px;
    }
  }
}
</style>
