<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title"><slot name="title" /></h5>
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="onClose"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body"><slot name="body" /></div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getCurrentInstance} from "vue";

  export default {
    setup() {
      const {emit} = getCurrentInstance();

      const onClose = () => {
        emit("close");
      };
      return {
        onClose,
      };
    },
  };
</script>

<style scoped>
  .modal-wrapper {
    z-index: 2;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
