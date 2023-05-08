<template>
  <h1>일정</h1>
  <div v-if="loading">...불러오는중</div>
  <form v-else @submit.prevent="onSave">
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
    <div class="mt-2">
      <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
        저장
      </button>
      <button
        type="button"
        class="btn btn-outline-dark mx-2"
        @click="moveToList"
      >
        취소
      </button>
    </div>
  </form>
  <Toast v-if="showToast" :message="toastMessage" :type="toastType" />
</template>

<script>
  import axios from "axios";
  import {useRoute, useRouter} from "vue-router";
  import {ref, computed} from "vue";
  import _ from "lodash";
  import Toast from "@/components/Toast.vue"; // @ = src

  export default {
    components: {
      Toast,
    },
    setup() {
      const route = useRoute();
      const router = useRouter();
      const todo = ref(null);
      const originalTodo = ref(null);
      const loading = ref(true);
      const SERVER_URL = "http://localhost:3000/todos";
      const todoId = route.params.id;
      const showToast = ref(false);
      const toastMessage = ref("");
      const toastType = ref("");

      const getTodo = async () => {
        try {
          const res = await axios.get(`${SERVER_URL}/${todoId}`);
          originalTodo.value = {...res.data};
          todo.value = {...res.data};
          loading.value = false;
        } catch (error) {
          triggerToast("에러 발생", "danger");
        }
      };
      getTodo();

      const todoUpdated = computed(() => {
        return !_.isEqual(todo.value, originalTodo.value);
      });

      const toggleStatus = () => {
        todo.value.completed = !todo.value.completed;
      };

      const moveToList = () => {
        router.push({
          name: "Todos",
        });
      };

      const onSave = async () => {
        if (!todoUpdated.value) return;
        try {
          console.log("change");
          await axios.put(`${SERVER_URL}/${todoId}`, {
            subject: todo.value.subject,
            completed: todo.value.completed,
          });
          triggerToast("저장 완료");
        } catch (error) {
          triggerToast("에러 발생", "danger");
        }
      };

      const triggerToast = (msg, type = "success") => {
        showToast.value = true;
        toastMessage.value = msg;
        toastType.value = type;
        setTimeout(() => {
          showToast.value = false;
          toastMessage.value = "";
          toastType.value = "";
        }, 3000);
      };

      return {
        todo,
        toggleStatus,
        moveToList,
        onSave,
        loading,
        todoUpdated,
        showToast,
        triggerToast,
        toastMessage,
        toastType,
      };
    },
  };
</script>

<style></style>
