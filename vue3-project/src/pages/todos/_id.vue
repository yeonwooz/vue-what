<template>
  <h1>일정</h1>
  <TodoForm :editing="true" />
</template>

<script>
  import TodoForm from "@/components/TodoForm.vue";

  export default {
    components: {
      TodoForm,
    },
  };
</script>

<style></style>
