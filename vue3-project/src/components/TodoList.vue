<template>
  <div class="p-2" v-if="!todos.length">검색결과 없음</div>
  <!-- <div
    class="card my-2"
    v-for="todo in todos"
    :key="todo.id"
    @click="moveToTodoPage(todo.id)"
    style="cursor: pointer"
  > -->
  <List :items="todos">
    <template #default="{item}">
      <div
        class="card-body p-2 d-flex align-items-center"
        @click="moveToTodoPage(item.id)"
        style="cursor: pointer"
      >
        <div class="flex-grow-1">
          <input
            class="mx-2"
            type="checkbox"
            :value="item.completed"
            @change="toggleTodo(item.id, $event)"
            @click.stop
          />
          <span :class="{todo: item.completed}" style="cursor: pointer">{{
            item.subject
          }}</span>
        </div>
        <div>
          <button class="btn btn-danger" @click.stop="openModal(item.id)">
            삭제
          </button>
        </div>
      </div>
    </template>
  </List>
  <!-- </div> -->
  <teleport to="#modal">
    <DeleteModal v-if="showModal" @close="closeModal" @delete="deleteTodo" />
  </teleport>
</template>

<script>
  /*
      // composition API:
      Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options.
  */
  import {ref} from "vue";
  import {useRouter} from "vue-router";
  import DeleteModal from "@/components/DeleteModal.vue";
  import List from "@/components/List.vue";

  export default {
    components: {
      DeleteModal,
      List,
    },
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
      const router = useRouter();
      const showModal = ref(false);
      const idToDelete = ref(null);
      const hasError = ref(false);
      const todoStyle = {
        textDecoration: "line-through",
        color: "gray",
      };

      const toggleTodo = (id, event) => {
        // * 자식이 부모의 props를 바꾸는 것은 안티패턴
        context.emit("toggle-todo", id, event.target.checked);
      };

      const openModal = id => {
        idToDelete.value = id;
        showModal.value = true;
      };

      const closeModal = () => {
        idToDelete.value = null;
        showModal.value = false;
      };

      const deleteTodo = () => {
        context.emit("delete-todo", idToDelete.value);
      };

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
        showModal,
        openModal,
        closeModal,
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
