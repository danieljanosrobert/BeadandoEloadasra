<template dark>
  <v-container class="container80">
    <v-timeline dense clipped>

      <v-timeline-item
        v-for="(poszt, i) in reversedTimeline" :key="i"
        class="mb-3"
        v-bind:color="decorate(poszt.nev)"
        icon-color="grey lighten-2"
        medium
      >
      <v-timeline-item
        v-if="notoday(poszt.idopont)"
        class="mb-4 date"
        hide-dot
      >
        <span>{{ datum(poszt.idopont) }}</span>
      </v-timeline-item>
      <hr />
        <v-layout row wrap>
          <v-flex class="name" xs8>{{ poszt.nev }}</v-flex>
          <v-flex xs4 text-xs-right>{{ oraperc(poszt.idopont) }}</v-flex>
          <v-flex xs12>{{ poszt.szoveg }}</v-flex>
        </v-layout>
      </v-timeline-item>
    </v-timeline>
    <v-btn @click="asd()"
      >
        <span class="mr-2">Új bejegyzés</span>
      </v-btn>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      name: 'Home',
      posztok: [],
      lastdate: '',
      decoration: []
    }),
    computed: {
      reversedTimeline () {
        return this.posztok.slice().reverse()
      }
    },
    mounted () {
      this.axios.get('http://localhost:8082/')
        .then(result => {
          this.posztok = result.data
        })
    },
    methods: {
      vm: function () {
        this
      },
      notoday(idopont){
        if(idopont === undefined)
          return false
        if(this.vm.lastdate !== this.datum(idopont)){
          this.vm.lastdate = this.datum(idopont)
          return true
        } else {
          return false
        }
      },
      datum (idopont) {
        return idopont.slice(5,10)
      },
      oraperc (idopont) {
        if(idopont === undefined)
         return ''
        return idopont.slice(11,16)
      },
      decorate (nev) {
        var arrR = this.decoration.filter(function(ele){
          return (ele.nev == nev)
        });
        if(arrR.length == 0){
          let theColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16)
          this.decoration.push({nev: nev, szin: theColor})
          return theColor
        } else {
          return arrR[0].szin
        }
      }
    }
  }
</script>

<style scoped>
  
  .date {
    font-weight: bold;
    font-size: 120%;
  }
  .name {
    text-decoration: underline;
    font-weight: bold;
    font-size: 105%;
  }

</style>
