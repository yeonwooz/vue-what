<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <div>
      <p>
        <input type="text" v-model="first" />
        <input type="text" v-model="second" />
      </p>
    </div>
    <div>
      <p>
        <input type="button" value="더하기" @click="plus(first, second)" />
      </p>
      <p>
        <input type="button" value="빼기" @click="minus(first, second)" />
      </p>
      <p>
        <input type="button" value="곱하기" @click="multiply(first, second)" />
      </p>
      <p>
        <input
          type="button"
          value="나누기(반올림)"
          @click="divide(first, second)"
        />
      </p>
    </div>

    <h2>결과 : {{ total }}</h2>
  </div>
</template>

<script>
export default {
  name: "Calculate",
  data() {
    return {
      message: "정수 사칙연산",
      first: 0,
      second: 0,
      total: 0
    };
  },
  methods: {
    plus(first, second) {
      this.total = parseInt(first) + parseInt(second);
      return this.total;
    },
    minus(first, second) {
      this.total = parseInt(first) - parseInt(second);
      return this.total;
    },
    multiply(first, second) {
      this.total = parseInt(first) * parseInt(second);
      return this.total;
    },
    divide(first, second) {
      if (parseInt(first) === 0 || parseInt(second) === 0) {
        return NaN;
      }
      this.total = parseInt(first) / parseInt(second);
      return this.total;
    }
  }
};
</script>
