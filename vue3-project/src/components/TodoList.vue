<template>
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
</template>

<script>
  /*
      // composition API:
      Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options.
      */
  import {ref} from "vue";

  export default {
    props: ["todos"],
    setup() {
      const hasError = ref(false);
      const todoStyle = {
        textDecoration: "line-through",
        color: "gray",
      };

      //   const deleteTodo = id => {
      //     console.log("before", todos);
      //     todos.value = todos.value.filter(item => item.id !== id);
      //     console.log("after", todos);
      //   };

      return {
        hasError,
        todoStyle,
        // deleteTodo,
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
