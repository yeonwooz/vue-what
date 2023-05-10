<template>
  <div>
    <div class="d-flex justify-content-between my-2">
      <h2>할일</h2>
      <button class="btn btn-primary" @click="moveToCreatePage">
        할일 생성하기
      </button>
    </div>
    <input
      class="form-control"
      type="text"
      v-model="searchText"
      placeholder="찾을 내용"
      @keyup.enter="searchTodo"
    />
    <TodoList
      :todos="todos"
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <hr />
    <Pagination
      v-if="todos.length"
      :pageCount="pageCount"
      :currentPage="currentPage"
      @click="getTodos"
    />
  </div>
</template>

<script>
  import axios from "@/axios";
  import TodoList from "@/components/TodoList.vue";
  // @ = src
  const SERVER_URL = "todos";
  import {ref, computed, watch} from "vue";
  import {useToast} from "@/composables/toast";
  import {useRouter} from "vue-router";
  import Pagination from "@/components/Pagination.vue";

  export default {
    components: {
      TodoList,
      Pagination,
    },

    setup() {
      const router = useRouter();
      const todos = ref([]);
      const serverError = ref("");
      const todoCount = ref(0);
      const currentPage = ref(1);
      const limit = 5;
      const pageCount = computed(() => {
        return Math.ceil(todoCount.value / limit);
      });
      const searchText = ref("");

      const {showToast, triggerToast, toastMessage, toastType} = useToast();

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
          triggerToast("서버 에러", "danger");
        }
      };

      getTodos();

      const addTodo = async todo => {
        try {
          await axios.post(SERVER_URL, todo);
          getTodos();
        } catch (error) {
          triggerToast("서버 에러", "danger");
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
          triggerToast("서버 에러", "danger");
        }
      };

      const deleteTodo = async id => {
        try {
          // todos.value = todos.value.filter(item => item.id !== id);
          await axios.delete(`${SERVER_URL}/${id}`);
          getTodos();
        } catch (error) {
          triggerToast("서버 에러", "danger");
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

      const moveToCreatePage = () => {
        router.push({
          name: "TodoCreate",
        });
      };

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
        showToast,
        triggerToast,
        toastMessage,
        toastType,
        moveToCreatePage,
      };
    },
  };
</script>
