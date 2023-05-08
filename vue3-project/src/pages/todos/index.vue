<template>
  <router-view />
  <div class="container">
    <h2>할일</h2>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="찾을 내용"
      @keyup.enter="searchTodo"
    />
    <hr />
    <TodoSimpleFormVue @add-todo="addTodo" />
    <div style="color: red">{{ serverError }}</div>
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <div class="d-flex justify-content-center">
      <ul class="pagination">
        <li class="page-item" v-if="currentPage !== 1">
          <a
            class="page-link"
            :class="currentPage === page && 'active'"
            style="cursor: pointer"
            @click="getTodos(currentPage - 1)"
            >이전</a
          >
        </li>
        <li class="page-item" v-for="page in pageCount" :key="page">
          <a
            class="page-link"
            :class="currentPage === page && 'active'"
            style="cursor: pointer"
            @click="getTodos(page)"
            >{{ page }}</a
          >
        </li>
        <li class="page-item" v-if="currentPage < pageCount">
          <a
            class="page-link"
            :class="currentPage === page && 'active'"
            style="cursor: pointer"
            @click="getTodos(currentPage + 1)"
            >다음</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import TodoList from "@/components/TodoList.vue";
  // @ = src
  import TodoSimpleFormVue from "@/components/TodoSimpleForm.vue";
  const SERVER_URL = "http://localhost:3000/todos";
  import {ref, computed, watch} from "vue";

  export default {
    components: {
      TodoSimpleFormVue,
      TodoList,
    },

    setup() {
      const todos = ref([]);
      const serverError = ref("");
      const todoCount = ref(0);
      const currentPage = ref(1);
      const limit = 5;
      const pageCount = computed(() => {
        return Math.ceil(todoCount.value / limit);
      });
      const searchText = ref("");

      const getTodos = async (page = currentPage.value) => {
        let query = `_page=${page}&_limit=${limit}&_sort=id&_order=desc`;
        if (searchText.value) {
          query = `subject_like=${searchText.value}&` + query;
        }

        try {
          const res = await axios.get(`${SERVER_URL}?${query}`);
          todoCount.value = res.headers["x-total-count"];
          todos.value = res.data;
          currentPage.value = page;
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

      const toggleTodo = async (id, checked) => {
        try {
          const item = todos.value.find(todo => todo.id === id);
          // todos.value.find(todo => todo.id === id).completed = !item.completed;
          await axios.patch(`${SERVER_URL}/${id}`, {
            completed: checked,
          });
          item.completed = checked;
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

      let throttle = null;

      const searchTodo = () => {
        clearTimeout(throttle);
        throttle = setTimeout(() => {
          getTodos(1);
        }, 1000);
      };
      watch(searchText, () => {
        searchTodo();
      });

      return {
        addTodo,
        toggleTodo,
        todos,
        getTodos,
        deleteTodo,
        searchText,
        serverError,
        currentPage,
        pageCount,
        searchTodo,
      };
    },
  };
</script>
