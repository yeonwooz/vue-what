<template>
  <div class="form-group">
    <label>{{ label }}</label>
    <input class="form-control" :value="subject" type="text" @input="onInput" />
    <div v-if="subjectError" class="text-red">{{ subjectError }}</div>
  </div>
</template>

<script>
  import {getCurrentInstance} from "vue";

  export default {
    props: {
      label: {
        type: String,
        required: true,
      },
      error: {
        type: String,
        required: true,
      },
      subject: {
        type: String,
        required: true,
      },
    },
    setup() {
      const {emit} = getCurrentInstance();
      const onInput = e => {
        emit("update:subject", e.target.value);
      };

      return {
        onInput,
      };
    },
  };
</script>

<style scoped>
  /* scoped style : 기본으로 전역설정되는데 scoped 를 추가하면 해당 스코프에만 적용됨 */
  .text-red {
    color: red;
  }
</style>
