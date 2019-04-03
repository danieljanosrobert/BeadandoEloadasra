<template>
<div id="overlay">
  <v-progress-linear 
      class="progress"
      color="blue"
      height="10"
  :indeterminate="true"></v-progress-linear>
    </div>
</template>

<script>
export default {
  data: () => ({
  })
}
</script>
<style>
#overlay{
 position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: rgba(255,255,255,0.8);}
.progress{
  margin-top: -2px
}
</style>