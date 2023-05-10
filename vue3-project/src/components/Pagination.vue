<template>
  <div class="d-flex justify-content-center">
    <ul class="pagination">
      <li class="page-item" v-if="currentPage !== 1">
        <a
          class="page-link"
          :class="currentPage === page && 'active'"
          style="cursor: pointer"
          @click="onClick(currentPage - 1)"
          >이전</a
        >
      </li>
      <li class="page-item" v-for="page in pageCount" :key="page">
        <a
          class="page-link"
          :class="currentPage === page && 'active'"
          style="cursor: pointer"
          @click="onClick(page)"
          >{{ page }}</a
        >
      </li>
      <li class="page-item" v-if="currentPage < pageCount">
        <a
          class="page-link"
          :class="currentPage === page && 'active'"
          style="cursor: pointer"
          @click="onClick(currentPage + 1)"
          >다음</a
        >
      </li>
    </ul>
  </div>
</template>

<script>
  import {getCurrentInstance} from "vue";

  export default {
    props: {
      pageCount: {
        type: Number,
        required: true,
      },
      currentPage: {
        type: Number,
        required: true,
      },
    },
    emits: ["click"],
    setup() {
      const {emit} = getCurrentInstance();
      const onClick = page => {
        emit("click", page);
      };

      return {
        onClick,
      };
    },
  };
</script>

<style></style>
