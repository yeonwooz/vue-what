<template>
  <div class="name">{{ name }}</div>
  <div>함수 시그니처: {{ greeting }}</div>
  <div>함수 아웃풋: {{ greeting(name) }}</div>
</template>

<script>
  // composition API
  export default {
    setup() {
      const name = "suu";
      const greeting = name => {
        return `Hello! ${name}`;
      };

      console.log(greeting(name));

      return {
        name,
        greeting,
      };
    },
  };
</script>

<style scoped>
  .name {
    color: aquamarine;
  }
</style>
