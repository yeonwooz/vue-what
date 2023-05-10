<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <router-link class="navbar-brand px-2" :to="{name: 'Home'}">
      <span>SEAN's TODO</span>
    </router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link px-2" :to="{name: 'Todos'}"
          ><span>Todos</span></router-link
        >
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view />
  </div>
  <Toast />
</template>

<script>
  import Toast from "@/components/Toast.vue";

  export default {
    components: {
      Toast,
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
