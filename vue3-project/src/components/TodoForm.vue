<template>
  <div v-if="loading">...불러오는중</div>
  <form v-else @submit.prevent="onSave">
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <label>제목</label>
          <input v-model="todo.subject" type="text" class="form-control" />
        </div>
      </div>
      <div v-if="editing" class="col-6">
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
    <div class="col-12">
      <div class="form-group">
        <label>내용</label>
        <textarea
          class="form-control"
          style="resize: none"
          v-model="todo.body"
          id=""
          cols="30"
          rows="10"
        ></textarea>
      </div>
    </div>
    <div class="mt-2">
      <button type="submit" class="btn btn-primary" :disabled="!todoUpdated">
        {{ editing ? "수정" : "생성" }}
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
  import {
    ref,
    computed,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
  } from "vue";
  import _ from "lodash";
  import Toast from "@/components/Toast.vue"; // @ = src
  import {useToast} from "@/composables/toast"; // @ = src

  export default {
    components: {
      Toast,
    },
    props: {
      editing: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      onBeforeMount(() => {
        console.log("onBeforeMount", document.querySelector("#sean"));
      });
      onMounted(() => {
        console.log("onMounted", document.querySelector("#sean"));
      });
      onBeforeUpdate(() => {
        console.log("before update");
      });
      onUpdated(() => {
        console.log("updated");
      });
      onBeforeUnmount(() => {
        console.log("before unmount");
      });
      onUnmounted(() => {
        console.log("unmounted");
      });

      console.log("hello"); // setup 함수 상의 라이프사이클 함수들이 등록되는 시점에 실행됨. 이후 라이프사이클함수가 실행됨
      const route = useRoute();
      const router = useRouter();
      const todo = ref({
        subject: "",
        completed: false,
        body: "",
      });
      const originalTodo = ref(null);
      const loading = ref(false);
      const SERVER_URL = "http://localhost:3000/todos";
      const todoId = route.params.id;

      const {showToast, triggerToast, toastMessage, toastType} = useToast();

      const getTodo = async () => {
        loading.value = true;
        try {
          const res = await axios.get(`${SERVER_URL}/${todoId}`);
          originalTodo.value = {...res.data};
          todo.value = {...res.data};
          loading.value = false;
        } catch (error) {
          triggerToast("에러 발생", "danger");
          loading.value = false;
        }
      };

      if (props.editing) {
        getTodo();
      }

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
        try {
          if (props.editing) {
            if (!todoUpdated.value) return;
            await axios.patch(`${SERVER_URL}/${todoId}`, todo.value);
          } else {
            await axios.post(SERVER_URL, todo.value);
          }
          triggerToast("저장 완료");
        } catch (error) {
          triggerToast("에러 발생", "danger");
        }
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
