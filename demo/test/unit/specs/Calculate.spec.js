import Vue from "vue";
import Calculate from "@/components/Calculate";

let Constructor;
let vm;
let first;
let second;

// 초기화
beforeEach(() => {
  Constructor = Vue.extend(Calculate);
  vm = new Constructor().$mount();
  first = vm._data.first;
  second = vm._data.second;
});

describe("Calculate.vue", () => {
  describe("입력값 검증", () => {
    it("유효한 숫자가 아닌 경우 NaN을 리턴한다.", () => {
      second = "가";
      // NaN값인 경우
      expect(vm.plus(first, second)).toBeNaN();
      expect(vm.minus(first, second)).toBeNaN();
      expect(vm.multiply(first, second)).toBeNaN();
      expect(vm.divide(first, second)).toBeNaN();
    });
    it("0으로 나누면 NaN 리턴한다.", () => {
      second = 0;
      expect(vm.divide(first, 0)).toBeNaN();
    });
  });
  describe("사칙연산 테스트", () => {
    it("두 수의 덧셈 결과는 합과 같다.", () => {
      // toBe : 기본값을 비교할때 사용
      expect(vm.plus(first, second)).toBe(first + second);
    });
    it("두 수의 뺄셈 결과는 차와 같다.", () => {
      expect(vm.minus(first, second)).toBe(first - second);
    });
    it("두 수의 곱셈 결과는 곱과 같다.", () => {
      expect(vm.multiply(first, second)).toBe(first * second);
    });
    it("두 수의 나눗셈 결과는 몫과 같다.", () => {
      if (parseInt(first) === 0 || parseInt(second) === 0) {
        expect(vm.divide(first, second)).toBeNaN();
      } else {
        expect(vm.divide(first, second)).toBe(first / second);
      }
    });
  });
});
