<template>
  <div>{{ obj }}</div>
  <div class="name">{{ refName }}</div>
  <input
    v-bind:type="refType"
    v-bind:value="refName"
    v-model="refName"
    v-on:change="updateName(refName)"
  />
  <!-- 양방향 바인딩??? -->
  <button class="btn btn-primary" v-on:click="initName()">초기화</button>
</template>

<script>
  /*
  // composition API:
  Composition API is a set of APIs that allows us to author Vue components using imported functions instead of declaring options. 
  */
  import {ref, reactive} from "vue";

  export default {
    setup() {
      const obj = reactive({cnt: 1});
      let name = "su";
      let refName = ref("su"); // ref 의 값은 문자열, 숫자, 배열, 오브젝트 타입 모두 가능
      let refType = ref("text"); // ref 의 값은 문자열, 숫자, 배열, 오브젝트 타입 모두 가능
      const greeting = name => {
        return `Hello! ${name}`;
      };

      function initName() {
        updateName("이름없음");
      }

      function updateName(newName) {
        name = newName; // 템플릿에 바로 반영되지는 않음
        refName.value = newName; // 템플릿에 바로 반영됨( reactive )

        obj.cnt++;
        console.log(name);
        console.log(refName);
      }

      return {
        name,
        greeting,
        initName,
        updateName,
        refName,
        refType,
        obj,
      };
    },
  };
</script>

<style scoped>
  .name {
    color: rgb(84, 141, 255);
  }
</style>
