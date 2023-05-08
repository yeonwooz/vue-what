<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand px-2" :to="{name: 'Home'}">
      SEAN's TODO
    </router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name: 'Todos'}">Todos</router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view />
  </div>
</template>
