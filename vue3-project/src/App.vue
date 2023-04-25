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

    <div class="card my-2" v-for="todo in todos" :key="todo.id">
      <div class="card-body p-2">
        {{ todo.subject }}
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

      const onSubmit = () => {
        if (todo.value) {
          todos.value.push({
            id: Date.now(),
            subject: todo.value,
          });
          todo.value = "";
          hasError.value = false;
        } else {
          hasError.value = true;
        }
      };

      return {
        hasError,
        todo,
        todos,
        onSubmit,
      };
    },
  };
</script>

<style scoped>
  .name {
    color: rgb(84, 141, 255);
  }
</style>
