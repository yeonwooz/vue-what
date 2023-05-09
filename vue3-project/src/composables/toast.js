import {useStore} from "vuex";

export const useToast = () => {
  const store = useStore();
  const toasts = store.state.toast.toasts;
  // const toastMessage = computed(
  //   () => store.getters["toast/toastMessageWithSmile"],
  // );
  // const toastMessage = computed(() => store.state.toast.toastMessage);
  // const toastType = computed(() => store.state.toast.toastType);
  // const showToast = computed(() => store.state.toast.showToast);

  const triggerToast = (msg, type = "success") => {
    store.dispatch("toast/triggerToast", {msg, type});
  };

  return {
    // showToast,
    toasts,
    triggerToast,
    // toastMessage,
    // toastType,
  };
};
