<template>
  <div class="container">
    <h2>할일</h2>
    <TodoSimpleFormVue @add-todo="addTodo" />
    <TodoListVue :todos="todos" />
  </div>
</template>

<script>
  import TodoListVue from "./components/TodoList.vue";
  import TodoSimpleFormVue from "./components/TodoSimpleForm.vue";
  import {ref} from "vue";

  export default {
    components: {
      TodoSimpleFormVue,
      TodoListVue,
    },

    setup() {
      const todos = ref([]);
      const addTodo = todo => {
        console.log(todo);
        todos.value.push(todo);
      };
      return {
        addTodo,
        todos,
      };
    },
  };
</script>
