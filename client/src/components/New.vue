<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap align-center>
      <p> Új bejegyzés létrehozása</p>
      
      <v-flex md12 sm12 xs12>
          <v-text-field v-model="nev"
            label="Név"
            solo
          ></v-text-field>
        </v-flex>
      <v-flex md12 sm12 xs12> 
        <v-textarea v-model="szoveg"
          solo
          name="input-7-4"
          label="Bejegyzés"
        ></v-textarea>
        <label v-if="canPost"> Üres poszt nem küldhető! </label>
        <label v-else> </label>
      </v-flex>
      <v-btn :disabled='canPost' @click="postAPost()"
      >
        <span class="mr-2">Új bejegyzés</span>
      </v-btn>
      <v-btn to="/"
      >
        <span class="mr-2">Mégse</span>
      </v-btn>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    data: () => ({
      name: 'New',
      nev: '',
      szoveg: '',
      canPost: true
    }),
    updated() {
      this.canPost = (this.nev ==='' || this.szoveg==='')
    },
    methods: {
      postAPost() {
        let nev = this.nev
        let szoveg = this.szoveg
        this.axios.post('http://localhost:8082', {nev,szoveg})
        .then( resp => {
        })
      }
    }
  }
</script>

<style>
  p {
    font-size: 2em;
  }
  label {
    color: red;
  }
</style>
