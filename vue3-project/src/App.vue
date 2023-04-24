<template>
  <div class="name">{{ name }}</div>
</template>

<script>
  // composition API
  export default {
    setup() {
      const name = "suu";

      return {
        name,
      };
    },
  };
</script>

<style scoped>
  .name {
    color: aquamarine;
  }
</style>
