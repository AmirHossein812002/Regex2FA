<template>
  <input type="text" v-model="regularExpression" />

  <div class="graph">
    <automata-graph :automata="nfa" v-if="nfa"></automata-graph>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { FiniteAutomata } from "@/utilities/finiteAutomata.js";
import AutomataGraph from "@/components/AutomataGraph.vue";

const regularExpression = ref("");
const nfa = computed(() => {
  const nfa = new FiniteAutomata();
  if (nfa.validateRegularExpression(regularExpression.value)) {
    return nfa.parseRegularExpression(regularExpression.value);
  } else {
    return null;
  }
});
</script>
<style scoped lang="scss">
.graph {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
