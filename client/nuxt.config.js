export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'client',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-buefy', '@nuxtjs/axios', '@nuxtjs/auth-next'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://project.test/api',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  auth: {
    strategies: {
      patient: {
        scheme: 'local',
        endpoints: {
          login: {
            url: '/auth/patient/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: { url: '/auth/patient/logout', method: 'post' },
          user: {
            url: '/auth/patient/user',
            method: 'get',
            propertyName: 'user',
          },
        },
      },
      doctor: {
        scheme: 'local',
        endpoints: {
          login: {
            url: '/auth/doctor/login',
            method: 'post',
            propertyName: 'token',
          },
          logout: { url: '/auth/doctor/logout', method: 'post' },
          user: {
            url: '/auth/doctor/user',
            method: 'get',
            propertyName: 'user',
          },
        },
      },
    },
  },
};
