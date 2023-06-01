<template>
  <main class="main">
    <header>
      <h1 class="main__header">Regular expression to finite automata</h1>
    </header>

    <div class="container">
      <section class="main__section section">
        <base-input
          type="text"
          v-model="regularExpression"
          class="section__input"
          labelText="Regular Expression"
        >
          <template #icon>
            <lord-icon
              src="https://cdn.lordicon.com/dtgezzsi.json"
              trigger="hover"
              colors="primary:#3d7141,secondary:#3d7141"
              class="icon"
              stroke="100"
            >
            </lord-icon>
          </template>
        </base-input>

        <div class="section__graph">
          <automata-graph :automata="nfa" v-if="nfa"></automata-graph>
        </div>
      </section>

      <p class="equal">{{ isEqual }}</p>

      <section class="main__section section">
        <base-input
          type="text"
          v-model="regularExpressionCompare"
          class="section__input"
          labelText="Regular Expression"
        >
          <template #icon>
            <lord-icon
              src="https://cdn.lordicon.com/dtgezzsi.json"
              trigger="hover"
              colors="primary:#3d7141,secondary:#3d7141"
              class="icon"
              stroke="100"
            >
            </lord-icon>
          </template>
        </base-input>

        <div class="section__graph">
          <automata-graph
            :automata="nfaCompare"
            v-if="nfaCompare"
          ></automata-graph>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import "https://cdn.lordicon.com/bhenfmcm.js";
import { computed, ref } from "vue";
import { FiniteAutomata } from "@/utilities/finiteAutomata.js";
import AutomataGraph from "@/components/AutomataGraph/AutomataGraph.vue";

const regularExpression = ref("");
const regularExpressionCompare = ref("");

const nfa = computed(() => {
  const nfa = new FiniteAutomata();
  if (nfa.validateRegularExpression(regularExpression.value)) {
    return nfa.parseRegularExpression(regularExpression.value).toDFA();
  } else {
    return null;
  }
});
const nfaCompare = computed(() => {
  const nfaCompare = new FiniteAutomata();
  if (nfaCompare.validateRegularExpression(regularExpressionCompare.value)) {
    return nfaCompare.parseRegularExpression(regularExpressionCompare.value);
  } else {
    return null;
  }
});

const isEqual = computed(() => {
  let isEqual = false;
  if (regularExpression.value && regularExpressionCompare.value) {
    const nfa = new FiniteAutomata();
    isEqual = nfa.compare(
      regularExpression.value,
      regularExpressionCompare.value
    );
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
    line-height: 6.4rem;
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
.section {
  height: 48rem;
  &:first-child {
    .section__input {
      margin-right: 1.6rem;
      margin-left: auto;
    }
  }
  &:last-child {
    .section__input {
      margin-left: 1.6rem;
    }
  }

  &__input {
    width: 65%;
  }

  &__graph {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.equal {
  font-size: 4.8rem;
  color: #d1ebd3;
}
.icon {
  width: 4.8rem;
  height: 4.8rem;
}
</style>
