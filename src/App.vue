<template>
  <input type="text" v-model="regularExpression" />
  <div v-if="nfa">
    <div>alphabets: {{ nfa.alphabets }}</div>
    <div>finialStates: {{ nfa.finalStates }}</div>
    <div v-for="(state, index) in nfa.states">{{ index }} : {{ state }}</div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { FiniteAutomata } from "@/utilities/finiteAutomata.js";
const regularExpression = ref("");
const nfa = computed(() => {
  if (regularExpression.value) {
    return new FiniteAutomata().parseRegularExpression(regularExpression.value);
  }
});
</script>
<style></style>
