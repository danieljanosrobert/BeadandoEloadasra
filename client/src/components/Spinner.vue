<template>
<div id="overlay">
  <v-progress-circular
      class="progress"
      :size="120"
      :width="12"
      color="blue darken-1"
      indeterminate
    ></v-progress-circular>
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
  background-color: rgba(0,0,0,0.5);}
.progress{
  position: fixed;
  z-index: 999;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>