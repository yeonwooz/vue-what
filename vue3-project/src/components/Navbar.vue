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
</template>

<script>
  export default {};
</script>

<style></style>
