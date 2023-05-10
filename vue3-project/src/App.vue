<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
  <Toast />
</template>

<script>
  import Toast from "@/components/Toast.vue";
  import Navbar from "@/components/Navbar.vue";

  export default {
    components: {
      Toast,
      Navbar,
    },
  };
</script>

<style>
  nav {
    z-index: 1;
    background: rgb(232, 245, 255, 0.5);
  }
  .router-link-exact-active {
    /* border: solid 1px rgb(4, 115, 220); */
    background: rgba(4, 115, 220, 0.8);
    border-radius: 3px;
    color: white;
  }

  .router-link-exact-active span {
    color: white;
  }
</style>
