<template>
  <div class="modal-wrapper">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">할일 삭제</h5>
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="onClose"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">삭제하시겠습니까?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="onClose">
            취소
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="[deleteTodo(), onClose()]"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    setup(props, {emit}) {
      const deleteTodo = () => {
        emit("delete-todo");
      };

      const onClose = () => {
        emit("close");
      };
      return {
        deleteTodo,
        onClose,
      };
    },
  };
</script>

<style scoped>
  .modal-wrapper {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
</style>
