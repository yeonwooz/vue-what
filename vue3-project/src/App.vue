<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand px-2" :to="{name: 'Home'}">
      SEAN's TODO
    </router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{name: 'Todos'}">Todos</router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view />
  </div>
  <transition name="fade">
  <Toast v-if="showToast" :message="toastMessage" :type="toastType" />
  </transition>
</template>

<script>
  import Toast from "@/components/Toast.vue";
  import {useToast} from "./composables/toast";

  export default {
    components: {
      Toast,
    },
    setup() {
      const {showToast, triggerToast, toastMessage, toastType} = useToast();
      return {
        showToast,
        triggerToast,
        toastMessage,
        toastType,
      };
    },
  };
</script>
