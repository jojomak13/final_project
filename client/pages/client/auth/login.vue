<template>
  <form @submit.prevent="login">
    <b-input></b-input>
    <input type="email" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button type="submit" class="button is-info">Login</button>
  </form>
</template>

<script>
export default {
  layout: 'auth',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$auth.loginWith('patient', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
