<template>
  <v-dialog v-model="show" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Hozzászólás</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field v-model="nev" label="Név" regular></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-textarea class="mypre" regular name="input-7-4" label="Bejegyzés" v-model="szoveg"></v-textarea>
              <label v-show="canPost">Üres poszt nem küldhető!</label>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="show = false">Mégse</v-btn>
        <v-btn color="blue darken-1" :disabled="canPost" flat @click="send()">Küldés</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    szoveg: "",
    nev: "",
    canPost: true
  }),
  updated() {
    this.canPost = this.nev === "" || this.szoveg === ""
  },
  mounted() {
    this.nev = this.$parent.$parent.felhasznalo
  },
  props: ["visible"],
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(value) {
        if (!value) {
          this.$emit("close")
        }
      }
    }
  },
  methods: {
    async send() {
      const toTwoDigits = num => (num < 10 ? "0" + num : num)
      let id = this.$parent._id
      let nev = this.nev
      let jsonized = JSON.stringify(this.szoveg)
      let szoveg = JSON.parse(jsonized)
      let date = new Date()
      let idopont =
        date.getFullYear() +
        "." +
        toTwoDigits(date.getUTCMonth() + 1) +
        "." +
        toTwoDigits(date.getDate()) +
        " " +
        toTwoDigits(date.getHours()) +
        ":" +
        toTwoDigits(date.getMinutes()) +
        ":" +
        toTwoDigits(date.getSeconds())
      await this.axios.post("https://blogbeadando.herokuapp.com/comment", {
        id,
        szoveg,
        idopont,
        nev
      })
      this.szoveg = ""
      this.$parent.$parent.felhasznalo = nev
      this.$parent.getIt()
      this.show = false
    }
  }
}
</script>