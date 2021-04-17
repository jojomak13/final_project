<template>
  <div class="container">
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      console.log('login starts 😎');
      this.$auth.loginWith('doctor', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
