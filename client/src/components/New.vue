<template>
  <v-container class = "container80" fluid grid-list-md>
    <v-layout row wrap align-center>
      <p> Új bejegyzés létrehozása</p>
      
      <v-flex md12 sm12 xs12>
          <v-text-field v-model="nev"
            label="Név"
            regular
          ></v-text-field>
        </v-flex>
      <v-flex md12 sm12 xs12> 
        <v-textarea class="mypre" v-model="szoveg"
          regular
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
    mounted() {
      this.nev = this.$parent.felhasznalo
    },
    methods: {
      postAPost() {
        const toTwoDigits = num => num < 10 ? '0' + num : num
        let nev = this.nev
        let jsonized = JSON.stringify(this.szoveg)
        let szoveg = JSON.parse(jsonized)
        let date = new Date()
        let idopont = date.getFullYear() +"."+
         toTwoDigits(date.getUTCMonth()+2) +"."+
         toTwoDigits(date.getDate()) + " "+
         toTwoDigits(date.getHours()) +":"+
         toTwoDigits(date.getMinutes()) +":"+
         toTwoDigits(date.getSeconds())
        this.axios.post('http://localhost:8082/post', {nev, szoveg, idopont})
        .then(() => { 
          /* this.$router.push('Home') */
        })
        .catch(() => {
        });
      this.$parent.felhasznalo = nev
      }
    }
  }
</script>

<style scoped>
  p {
    font-size: 2em;
  }
  label {
    color: red;
  }
  .mypre {
    white-space: pre;
  }
</style>
