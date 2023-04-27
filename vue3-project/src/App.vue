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
    <div style="color: red">{{ serverError }}</div>
    <TodoList
      :todos="todos"
      :filteredTodos="filteredTodos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
  </div>
</template>

<script>
  import axios from "axios";
  import TodoList from "./components/TodoList.vue";
  import TodoSimpleFormVue from "./components/TodoSimpleForm.vue";
  const SERVER_URL = "http://localhost:3000/todos";
  import {ref, computed} from "vue";

  export default {
    components: {
      TodoSimpleFormVue,
      TodoList,
    },

    setup() {
      const todos = ref([]);
      const serverError = ref("");
      const getTodos = async () => {
        try {
          const res = await axios.get(SERVER_URL);
          todos.value = res.data;
          serverError.value = "";
        } catch (error) {
          serverError.value = "서버 에러";
        }
      };

      getTodos();

      const addTodo = async todo => {
        try {
          await axios.post(SERVER_URL, todo);
          getTodos();
        } catch (error) {
          serverError.value = "서버 에러";
        }
      };

      const toggleTodo = async id => {
        try {
          const item = todos.value.find(todo => todo.id === id);
          console.log(item.completed);
          // todos.value.find(todo => todo.id === id).completed = !item.completed;
          const res = await axios.patch(`${SERVER_URL}/${id}`, {
            completed: !item.completed,
          });
          item.completed = res.data.completed;
        } catch (error) {
          serverError.value = "서버 에러";
        }
      };

      const deleteTodo = async id => {
        try {
          // todos.value = todos.value.filter(item => item.id !== id);
          await axios.delete(`${SERVER_URL}/${id}`);
          getTodos();
        } catch (error) {
          serverError.value = "서버 에러";
        }
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
        serverError,
      };
    },
  };
</script>
