<template>
  <h1>일정</h1>
  <div v-if="loading">...불러오는중</div>
  <form v-else>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>제목</label>
          <input v-model="todo.subject" type="text" class="form-control" />
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label>상태</label>
          <div>
            <button
              type="button"
              class="btn"
              :class="todo.completed ? 'btn-success' : 'btn-danger'"
              @click="toggleStatus"
            >
              {{ todo.completed ? "완료" : "미완료" }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <button type="submit" class="btn btn-primary">저장</button>
    <button type="button" class="btn btn-outline-dark mx-2" @click="moveToList">
      취소
    </button>
  </form>
</template>

<script>
  import axios from "axios";
  import {useRoute, useRouter} from "vue-router";
  import {ref} from "@vue/reactivity";
  export default {
    setup() {
      const route = useRoute();
      const router = useRouter();
      const todo = ref(null);
      const loading = ref(true);
      const SERVER_URL = "http://localhost:3000/todos";

      const getTodo = async () => {
        const res = await axios.get(`${SERVER_URL}/${route.params.id}`);
        todo.value = res.data;
        loading.value = false;
      };
      getTodo();

      const toggleStatus = () => {
        todo.value.completed = !todo.value.completed;
      };

      const moveToList = () => {
        router.push({
          name: "Todos",
        });
      };
      return {todo, toggleStatus, moveToList, loading};
    },
  };
</script>

<style></style>
