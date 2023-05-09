<template>
  <div class="p-2" v-if="!todos.length">검색결과 없음</div>
  <div
    class="card my-2"
    v-for="todo in todos"
    :key="todo.id"
    @click="moveToTodoPage(todo.id)"
    style="cursor: pointer"
  >
    <div class="card-body p-2 d-flex align-items-center">
      <div class="flex-grow-1">
        <input
          class="mx-2"
          type="checkbox"
          :value="todo.completed"
          @change="toggleTodo(todo.id, $event)"
          @click.stop
        />
        <span :class="{todo: todo.completed}" style="cursor: pointer">{{
          todo.subject
        }}</span>
      </div>
      <div>
        <button class="btn btn-danger" @click.stop="deleteTodo(todo.id)">
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
  import {useRouter} from "vue-router";

  export default {
    props: {
      todos: {
        type: Array,
        required: true,
      },
      // filteredTodos: {
      //   type: Array,
      //   required: true,
      // },
    },
    emits: ["toggle-todo", "delete-todo"],
    setup(props, context) {
      const hasError = ref(false);
      const todoStyle = {
        textDecoration: "line-through",
        color: "gray",
      };

      const toggleTodo = (id, event) => {
        // * 자식이 부모의 props를 바꾸는 것은 안티패턴
        context.emit("toggle-todo", id, event.target.checked);
      };

      const deleteTodo = id => {
        context.emit("delete-todo", id);
      };

      const router = useRouter();
      const moveToTodoPage = id => {
        // router.push(`/todos/${id}`);
        router.push({
          name: "Todo",
          params: {
            id,
          },
        });
      };

      return {
        hasError,
        todoStyle,
        toggleTodo,
        deleteTodo,
        moveToTodoPage,
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
