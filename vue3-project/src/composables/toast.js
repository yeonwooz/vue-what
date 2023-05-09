import {computed, onUnmounted} from "vue";
import {useStore} from "vuex";

export const useToast = () => {
  const store = useStore();
  const toastMessage = computed(()=>store.state.toastMessage)
  const toastType = computed(()=>store.state.toastType)
  const showToast = computed(()=>store.state.showToast)
  const timeout = computed(()=>store.state.timeout)

  const triggerToast = (msg, type = "success") => {
    showToast.value = true;
    toastMessage.value = msg;
    toastType.value = type;
    timeout.value = setTimeout(() => {
      console.log("타임아웃");
      showToast.value = false;
      toastMessage.value = "";
      toastType.value = "";
    }, 3000);
  };

  onUnmounted(() => {
    clearTimeout(timeout.value);
  });

  return {
    showToast,
    triggerToast,
    toastMessage,
    toastType,
  };
};
