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
      const getTodos = () => {
        axios.get(SERVER_URL).then(res => {
          // console.log(res);
          todos.value = res.data;
        });
      };
      getTodos();

      const addTodo = todo => {
        axios
          .post(SERVER_URL, todo)
          .then(() => {
            todos.value.push(todo);
          })
          .catch(() => {});
      };

      const toggleTodo = id => {
        const item = todos.value.find(todo => todo.id === id);
        todos.value.find(todo => todo.id === id).completed = !item.completed;
      };

      const deleteTodo = async id => {
        // todos.value = todos.value.filter(item => item.id !== id);
        await axios.delete(`${SERVER_URL}/${id}`);
        getTodos();
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
