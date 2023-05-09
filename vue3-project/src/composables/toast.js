import {computed} from "vue";
import {useStore} from "vuex";

export const useToast = () => {
  const store = useStore();
  const toastMessage = computed(
    () => store.getters["toast/toastMessageWithSmile"],
  );
  const toastType = computed(() => store.state.toast.toastType);
  const showToast = computed(() => store.state.toast.showToast);

  const triggerToast = (msg, type = "success") => {
    store.dispatch("toast/triggerToast", msg, type);
  };

  return {
    showToast,
    triggerToast,
    toastMessage,
    toastType,
  };
};
