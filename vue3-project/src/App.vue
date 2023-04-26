<template>
  <div class="container">
    <h2>할일</h2>
    <TodoSimpleFormVue />
    <TodoListVue />
  </div>
</template>

<script>
  import TodoListVue from "./components/TodoList.vue";
  import TodoSimpleFormVue from "./components/TodoSimpleForm.vue";

  export default {
    components: {
      TodoSimpleFormVue,
      TodoListVue,
    },
  };
</script>
