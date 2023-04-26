<template>
  <div class="container">
    <h2>할일</h2>
    <form @submit.prevent="onSubmit" class="d-flex">
      <div class="flex-grow-1">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="무엇을 할까요?"
        />
        <div style="color: red; font-size: 0.9rem" v-show="hasError">
          할일을 입력해주세요
        </div>
      </div>
      <div class="mx-2">
        <button class="btn btn-primary" type="submit">추가</button>
      </div>
    </form>
    <div class="p-2" v-if="!todos.length">아직 할일이 없습니다</div>
    <div class="card my-2" v-for="todo in todos" :key="todo.id">
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="todo.completed"
          />
          <label class="form-check-label" :class="{todo: todo.completed}">{{
            todo.subject
          }}</label>
        </div>
        <div>
          <button class="btn btn-danger" @click="deleteTodo(todo.id)">
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /*
  // composition API:
  Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options.
  */
  import {ref} from "vue";

  export default {
    setup() {
      const todo = ref("");
      const todos = ref([]);
      const hasError = ref(false);
      const todoStyle = {
        textDecoration: "line-through",
        color: "gray",
      };

      const onSubmit = () => {
        if (todo.value) {
          todos.value.push({
            id: Date.now(),
            subject: todo.value,
            completed: false,
          });
          todo.value = "";
          hasError.value = false;
        } else {
          hasError.value = true;
        }
      };

      const deleteTodo = id => {
        console.log("before", todos);
        todos.value = todos.value.filter(item => item.id !== id);
        console.log("after", todos);
      };

      return {
        hasError,
        todo,
        todos,
        onSubmit,
        todoStyle,
        deleteTodo,
      };
    },
  };
</script>

<style scoped>
  .todo {
    color: rgb(154, 154, 154);
    text-decoration: line-through;
  }
</style>
