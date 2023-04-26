<template>
  <div class="container">
    <h2>할일</h2>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="찾을 내용"
    />
    <hr />
    <TodoSimpleFormVue @add-todo="addTodo" />
    <TodoList
      :filteredTodos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
  import TodoList from "./components/TodoList.vue";
  import TodoSimpleFormVue from "./components/TodoSimpleForm.vue";
  import {ref, computed} from "vue";

  export default {
    components: {
      TodoSimpleFormVue,
      TodoList,
    },

    setup() {
      const todos = ref([]);
      const addTodo = todo => {
        todos.value.push(todo);
      };

      const toggleTodo = id => {
        const item = todos.value.find(todo => todo.id === id);
        todos.value.find(todo => todo.id === id).completed = !item.completed;
      };

      const deleteTodo = id => {
        todos.value = todos.value.filter(item => item.id !== id);
      };

      const searchText = ref("");
      const filteredTodos = computed(() => {
        if (searchText.value) {
          return todos.value.filter(todo => {
            return todo.subject.includes(searchText.value);
          });
        }
        return todos.value;
      });

      return {
        addTodo,
        toggleTodo,
        todos,
        deleteTodo,
        searchText,
        filteredTodos,
      };
    },
  };
</script>
