<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <router-link to="/"> <span>Blog </span>
        <span class="font-weight-light">BEADANDO</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn to="New"
      >
        <span class="mr-2">Új bejegyzés</span>
      </v-btn>
    </v-toolbar>

    <router-view class="container"/>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    felhasznalo: ''
  }),
  methods: {

  }
}
</script>
<style>
  body {
    margin-top: 60px;
  } 
  .container80 {
    max-width: 80% !important;
  }
</style>