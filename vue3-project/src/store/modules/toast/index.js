export default {
  namespaced: true,
  state: {
    toastMessage: "",
    toastType: "",
    showToast: false,
    timeout: null,
  },

  mutations: {
    UPDATE_TOAST_MESSAGE(state, payload) {
      state.toastMessage = payload;
    },
    UPDATE_TOAST_TYPE(state, payload) {
      state.toastType = payload;
    },
    UPDATE_TOAST_STATUS(state, payload) {
      state.showToast = payload;
    },
    UPDATE_TOAST_TIMEOUT(state, payload) {
      state.timeout = payload;
    },
  },

  actions: {
    triggerToast({commit}, msg, type = "success") {
      commit("UPDATE_TOAST_MESSAGE", msg);
      commit("UPDATE_TOAST_TYPE", type);
      commit("UPDATE_TOAST_STATUS", true);

      setTimeout(() => {
        commit("UPDATE_TOAST_MESSAGE", "");
        commit("UPDATE_TOAST_TYPE", "");
        commit("UPDATE_TOAST_STATUS", false);
      }, 3000);
    },
  },
  getters: {
    toastMessageWithSmile(state) {
      return state.toastMessage + " :)";
    },
  },
};
