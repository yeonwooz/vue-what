<template>
  <div>{{ count }}</div>
  <button @click="count++">ADD</button>
  <!-- <div class="homeImg"></div> -->
</template>

<script>
  import {useCount} from "@/composables/count";

  export default {
    setup() {
      const {count} = useCount();
      
      return {
        count,
      };
    },
  };
</script>

<style>
  .homeImg {
    position: fixed;
    opacity: 0.9;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://source.unsplash.com/2Y4dE8sdhlc/1920x1280");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: scroll;
  }
</style>
