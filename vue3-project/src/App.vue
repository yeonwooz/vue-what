<template>
  <div class="container">
    <h2>TO-DO LIST</h2>
    <form @submit.prevent="onSubmit" class="d-flex">
      <div class="flex-grow-1 mx-2">
        <input
          class="form-control"
          type="text"
          v-model="todo"
          placeholder="Type new to-do"
        />
      </div>
      <div class="ml-2">
        <button class="btn btn-primary" type="submit">ADD</button>
      </div>
    </form>
    {{ todos }}
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

      const onSubmit = () => {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
        });
      };

      return {
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
