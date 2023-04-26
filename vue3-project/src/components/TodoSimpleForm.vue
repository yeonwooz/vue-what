<template>
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
</template>

<script>
  /*
    // composition API:
    Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options.
    */
  import {ref} from "vue";

  export default {
    setup(props, context) {
      const todo = ref("");

      const hasError = ref(false);
      const todoStyle = {
        textDecoration: "line-through",
        color: "gray",
      };

      const onSubmit = () => {
        if (todo.value) {
          context.emit("add-todo", {
            id: Date.now(),
            subject: todo.value,
            completed: false,
          });
          //   todos.value.push({
          //     id: Date.now(),
          //     subject: todo.value,
          //     completed: false,
          //   });
          todo.value = "";
          hasError.value = false;
        } else {
          hasError.value = true;
        }
      };

      return {
        hasError,
        todo,
        onSubmit,
        todoStyle,
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
