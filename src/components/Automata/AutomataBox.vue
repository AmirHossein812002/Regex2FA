<template>
  <section class="section">
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
      <template #select>
        <base-select :options="options" @input="changeType"></base-select>
      </template>
    </base-input>

    <div class="section__graph">
      <automata-graph :automata="nfa" v-if="nfa"></automata-graph>
    </div>
  </section>
</template>

<script setup>
import "https://cdn.lordicon.com/bhenfmcm.js";
import { computed, ref, watch } from "vue";
import { FiniteAutomata } from "@/utilities/finiteAutomata.js";
import AutomataGraph from "@/components/Automata/AutomataGraph.vue";

const emits = defineEmits(["input"]);

const regularExpression = ref("");
const type = ref("nfa");
const options = ["nfa", "dfa", "mini dfa"];

const changeType = (option) => (type.value = option);

const nfa = computed(() => {
  let nfa = new FiniteAutomata();
  if (nfa.validateRegularExpression(regularExpression.value)) {
    nfa = nfa.parseRegularExpression(regularExpression.value);
    if (type.value === "nfa") {
      return nfa;
    } else if (type.value === "dfa") {
      return nfa.toDFA();
    } else if (type.value === "mini dfa") {
      return nfa.toMiniDFA();
    }
  } else {
    return null;
  }
});

watch(regularExpression, () => emits("input", regularExpression.value));
</script>

<style lang="scss" scoped>
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
    width: 95%;
  }

  &__graph {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.icon {
  width: 4.8rem;
  height: 4.8rem;
}
</style>
