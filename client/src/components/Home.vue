<template>
  <v-container class="container80">
    <Dialog :visible="dialog" @close="dialog=false"/>
    <Spinner v-show="loading"/>
    <v-timeline v-show="!loading" dense clipped>
      <v-card v-show="isEmpty()" dark style="padding-top: 20px">
        <v-timeline-item class="mb-4 date" hide-dot>
          <span> Még nincs bejegyzés. </span>
          <v-btn to="New">
            <span class="mr-2">Új bejegyzés létrehozása</span>
          </v-btn>
        </v-timeline-item>
      </v-card>
      <v-timeline-item
        v-for="(poszt, i) in posztok"
        :key="i"
        class="mb-3"
        v-bind:color="decorate(poszt.nev)"
        icon-color="grey lighten-2"
        large
        style="margin-bottom: 100%"
      >
        <v-card v-show="notoday(poszt.idopont)" dark style="padding-top: 20px">
          <v-timeline-item class="mb-4 date" hide-dot>
            <span>{{ datum(poszt.idopont) }}</span>
          </v-timeline-item>
        </v-card>
        <v-card class="cardpadding" elevation="20">
          <v-layout row wrap>
            <v-flex class="name" xs8>{{ poszt.nev }}</v-flex>
            <v-flex xs4 text-xs-right>{{ oraperc(poszt.idopont) }}</v-flex>
            <v-flex xs12>{{ poszt.szoveg }}</v-flex>
            <br>
            <template>
              <v-btn color="primary" @click="openComment(poszt._id)" flat small>Hozzászólás</v-btn>
            </template>
          </v-layout>
        </v-card>
        <v-timeline-item
          v-for="(poszt2, i) in poszt.comment"
          :key="i"
          class="mb-3"
          v-bind:color="decorate(poszt2.nev)"
          icon-color="grey lighten-2"
          small
        >
          <v-card class="cardpadding" style="margin-top: 10px; margin-bottom: -20px">
            <v-layout row wrap>
              <v-flex class="name" xs8>{{ poszt2.nev }}</v-flex>
              <v-flex xs4 text-xs-right>{{ poszt2.idopont }}</v-flex>
              <v-flex xs12>{{ poszt2.szoveg }}</v-flex>
            </v-layout>
          </v-card>
        </v-timeline-item>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<script>
import Dialog from "@/components/Dialog"
import Spinner from "@/components/Spinner"
export default {
  data: () => ({
    name: "Home",
    posztok: [],
    loading: true,
    lastdate: "",
    decoration: [],
    precalc: 0,
    dialog: false,
    _id: ""
  }),
  mounted() {
    this.getIt()
  },
  updated() {
    this.vm.lastdate = ""
  },
  watch: {
    dialog(val) {
      if (!val) {
        this._id = ""
      }
    }
  },
  components: {
    Dialog,
    Spinner
  },
  methods: {
    async getIt() {
      this.axios.get("http://localhost:8082/").then(result => {
        this.loading=false
        this.posztok = result.data
      })
    },
    vm: function() {
      this
    },
    notoday(idopont) {
      if (idopont === undefined) return false
      if (this.vm.lastdate !== this.datum(idopont)) {
        if (!this.vm.lastdate && this.precalc < this.posztok.length) {
          this.precalc++
          return false
        }
        this.vm.lastdate = this.datum(idopont)
        return true
      } else {
        return false
      }
    },
    isEmpty() {
      if(!this.posztok.length)
        return true
      return false
    },
    datum(idopont) {
      return idopont.slice(5, 10)
    },
    oraperc(idopont) {
      if (idopont === undefined) return ""
      return idopont.slice(11, 16)
    },
    decorate(nev) {
      var arrR = this.decoration.filter(function(ele) {
        return ele.nev == nev
      });
      if (arrR.length == 0) {
        let theColor = "#" + ((Math.random() * 0xffffff) << 0).toString(16)
        this.decoration.push({ nev: nev, szin: theColor })
        return theColor
      } else {
        return arrR[0].szin
      }
    },
    openComment(id) {
      this._id = id
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.cardpadding {
  padding-left: 20px;
  padding-right: 20px;
}
.date {
  font-weight: bold;
  font-size: 120%;
}
.v-timeline-item__dot--large {
  align-self: auto !important;
}
.name {
  text-decoration: underline;
  font-weight: bold;
  font-size: 105%;
}
</style>
