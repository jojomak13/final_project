<template>
  <b-navbar wrapper-class="container">
    <template #brand>
      <b-navbar-item tag="router-link" to="/">
        <img src="@/assets/esma3ny.svg" alt="Logo" />
      </b-navbar-item>
    </template>
    <template #start>
      <router-link tag="b-navbar-item" to="/">Home</router-link>
      <router-link tag="b-navbar-item" to="/therapists">Therapists</router-link>
      <router-link tag="b-navbar-item" to="/blog">Blog</router-link>
      <b-navbar-dropdown label="Info">
        <b-navbar-item href="#">About</b-navbar-item>
        <b-navbar-item href="#">Contact</b-navbar-item>
      </b-navbar-dropdown>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div class="buttons">
          <router-link to="/client/auth/signup" class="button is-primary">
            <strong>Signup</strong>
          </router-link>
          <router-link to="/client/auth/login" class="button is-light">
            Login
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' },
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' },
        },
      ],
    };
  },
};
</script>

<style scoped>
.navbar {
  background: url('~assets/bg.jpg') no-repeat;
  background-size: cover;
}

.navbar-item img {
  width: 50%;
}
</style>
