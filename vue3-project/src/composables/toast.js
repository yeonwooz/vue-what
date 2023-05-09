import {ref} from "vue";

export const useToast = () => {
  const showToast = ref(false);
  const toastMessage = ref("");
  const toastType = ref("");
  const timeout = ref(null);
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
  return {
    showToast,
    triggerToast,
    toastMessage,
    toastType,
  };
};
