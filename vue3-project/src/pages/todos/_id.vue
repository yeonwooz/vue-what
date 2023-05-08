<template>
  <h1>일정</h1>
  <form>
    <div class="form-group">
      <label>제목</label>
      <input v-model="todo.subject" type="text" class="form-control" />
    </div>
    <button class="btn btn-primary">저장</button>
  </form>
</template>

<script>
  import axios from "axios";
  import {useRoute} from "vue-router";
  import {ref} from "@vue/reactivity";
  export default {
    setup() {
      const route = useRoute();
      const todo = ref(null);
      const SERVER_URL = "http://localhost:3000/todos";

      const getTodo = async () => {
        const res = await axios.get(`${SERVER_URL}/${route.params.id}`);
        todo.value = res.data;
      };
      getTodo();
      return {todo};
    },
  };
</script>

<style></style>
