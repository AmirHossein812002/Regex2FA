<template>
  <main class="main">
    <header>
      <h1 class="main__header">Regular expression to finite automata</h1>
    </header>

    <div class="container">
      <automata-box
        @input="changeRegularExp"
        class="automata-box"
      ></automata-box>
      <p class="equal">{{ isEqual }}</p>
      <automata-box
        @input="changeRegularExpCompare"
        class="automata-box"
      ></automata-box>
    </div>
  </main>
</template>

<script setup>
import AutomataBox from "@/components/Automata/AutomataBox.vue";
import { ref, computed } from "vue";
import { FiniteAutomata } from "@/utilities/finiteAutomata.js";

const regularExp = ref("");
const regularExpCompare = ref("");

const changeRegularExp = (value) => {
  regularExp.value = value;
};
const changeRegularExpCompare = (value) => {
  regularExpCompare.value = value;
};

const isEqual = computed(() => {
  let isEqual = false;
  const nfa = new FiniteAutomata();
  if (
    regularExp.value &&
    regularExpCompare.value &&
    nfa.validateRegularExpression(regularExp.value) &&
    nfa.validateRegularExpression(regularExpCompare.value)
  ) {
    isEqual = nfa.isEqual(regularExp.value, regularExpCompare.value);
  }
  const symbol = isEqual ? "==" : "!=";
  return symbol;
});
</script>
<style scoped lang="scss">
.main {
  width: 100vw;
  height: 100vh;
  padding: 6.4rem 4.8rem 0 4.8rem;
  &__header {
    font-size: 4.8rem;
    line-height: 8.4rem;
    color: #d1ebd3;
    text-align: center;
    margin-bottom: 4.8rem;
  }
}

.container {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr min-content 1fr;
}
.automata-box {
  min-height: 48rem;
  height: 65vh;
}
.equal {
  font-size: 4.8rem;
  color: #d1ebd3;
}
</style>
