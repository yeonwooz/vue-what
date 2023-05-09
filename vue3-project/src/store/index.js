import {createStore} from "vuex";

export default createStore({
  state: {
    toastMessage: "",
    toastType: "",
    showToast: false,
    timeout: null,
  },
});

