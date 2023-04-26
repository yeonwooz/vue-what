<template>
  <div class="container">
    <h2>할일</h2>
    <TodoSimpleFormVue @add-todo="addTodo" />
    <TodoList :todos="todos" @toggle-todo="toggleTodo" />
  </div>
</template>

<script>
  import TodoList from "./components/TodoList.vue";
  import TodoSimpleFormVue from "./components/TodoSimpleForm.vue";
  import {ref} from "vue";

  export default {
    components: {
      TodoSimpleFormVue,
      TodoList,
    },

    setup() {
      const todos = ref([]);
      const addTodo = todo => {
        console.log(todo);
        todos.value.push(todo);
      };

      const toggleTodo = id => {
        const item = todos.value.find(todo => todo.id === id);
        todos.value.find(todo => todo.id === id).completed = !item.completed;
        console.log(item);
      };

      return {
        addTodo,
        toggleTodo,
        todos,
      };
    },
  };
</script>
