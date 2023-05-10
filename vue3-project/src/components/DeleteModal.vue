<template>
  <Modal>
    <template #title>할일 삭제</template>
    <template #body>삭제하시겠습니까?</template>
    <template #footer>
      <button type="button" class="btn btn-secondary" @click="onClose">
        취소
      </button>
      <button
        type="button"
        class="btn btn-danger"
        @click="[onDelete(), onClose()]"
      >
        삭제
      </button>
    </template>
  </Modal>
</template>

<script>
  import Modal from "@/components/Modal.vue";

  export default {
    components: {
      Modal,
    },
    setup(props, {emit}) {
      const onDelete = () => {
        emit("delete");
      };

      const onClose = () => {
        emit("close");
      };
      return {
        onDelete,
        onClose,
      };
    },
  };
</script>

<style></style>
