<template>
  <div class="name">{{ name }}</div>
  <button class="btn btn-primary" v-on:click="printGreeting('sean')">
    Click
  </button>
</template>

<script>
  // composition API
  export default {
    setup() {
      const name = "su";
      const greeting = name => {
        return `Hello! ${name}`;
      };

      function printGreeting(name) {
        console.log(greeting(name));
      }

      return {
        name,
        greeting,
        printGreeting,
      };
    },
  };
</script>

<style scoped>
  .name {
    color: aquamarine;
  }
</style>
