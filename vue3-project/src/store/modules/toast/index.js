export default {
  namespaced: true,
  state: {
    // toastMessage: "",
    // toastType: "",
    // showToast: false,
    toasts: [],
  },

  mutations: {
    // UPDATE_TOAST_MESSAGE(state, payload) {
    //   state.toastMessage = payload;
    // },
    // UPDATE_TOAST_TYPE(state, payload) {
    //   state.toastType = payload;
    // },
    // UPDATE_TOAST_STATUS(state, payload) {
    //   state.showToast = payload;
    // },

    ADD_TOAST(state, payload) {
      state.toasts.push(payload);
    },
    REMOVE_TOAST(state) {
      state.toasts.shift();
    },
  },

  actions: {
    triggerToast({commit}, payload) {
      //   commit("UPDATE_TOAST_MESSAGE", msg);
      //   commit("UPDATE_TOAST_TYPE", type);
      //   commit("UPDATE_TOAST_STATUS", true);
      //   const {msg, type} = payload;

      commit("ADD_TOAST", {
        id: Date.now(),
        msg: payload.msg,
        type: payload.type || "success",
      });
      setTimeout(() => {
        // commit("UPDATE_TOAST_MESSAGE", "");
        // commit("UPDATE_TOAST_TYPE", "");
        // commit("UPDATE_TOAST_STATUS", false);
        commit("REMOVE_TOAST");
      }, 10000);
    },
  },
  getters: {
    toastMessageWithSmile(state) {
      return state.toastMessage + " :)";
    },
  },
};
