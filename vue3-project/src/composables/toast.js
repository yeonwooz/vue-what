import {computed} from "vue";
import {useStore} from "vuex";

export const useToast = () => {
  const store = useStore();
  const toastMessage = computed(() => store.getters.toastMessageWithSmile);
  const toastType = computed(() => store.state.toastType);
  const showToast = computed(() => store.state.showToast);

  const triggerToast = (msg, type = "success") => {
    store.dispatch("triggerToast", msg, type);
  };

  return {
    showToast,
    triggerToast,
    toastMessage,
    toastType,
  };
};
