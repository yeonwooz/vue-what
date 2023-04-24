<template>
  <div class="name">{{ refName }}</div>
  <button
    class="btn btn-primary"
    v-on:click="updateName(refName === 'su' ? 'sean' : 'su')"
  >
    Click
  </button>
</template>

<script>
  // composition API
  import {ref} from "vue";

  export default {
    setup() {
      let name = "su";
      let refName = ref("su");   // ref 의 값은 문자열, 숫자, 배열, 오브젝트 타입 모두 가능
      const greeting = name => {
        return `Hello! ${name}`;
      };

      function updateName(newName) {
        name = newName; // 템플릿에 바로 반영되지는 않음
        refName.value = newName; // 템플릿에 바로 반영됨( reactive )
        console.log(name);
        console.log(refName);
      }

      return {
        name,
        greeting,
        updateName,
        refName,
      };
    },
  };
</script>

<style scoped>
  .name {
    color: rgb(84, 141, 255);
  }
</style>
