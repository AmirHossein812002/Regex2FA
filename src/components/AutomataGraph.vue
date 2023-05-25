<template>
  <div ref="graph" id="graph"></div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { Network } from "vis-network/standalone";

const props = defineProps({
  automata: {
    type: Object,
    required: true,
    validator(value) {
      return value.states;
    },
  },
});

const graph = ref("");

const data = computed(() => {
  const nodes = props.automata.states.map((_, index) => ({
    id: index,
    label: "q" + index,
  }));

  const edges = [];
  for (let index = 0; index < props.automata.states.length; index++) {
    const transitions = props.automata.states[index];
    const mappedTransitions = transitions.map((transition) => ({
      from: index,
      to: transition.to,
      label: transition.value,
      arrows: "to",
    }));
    edges.splice(0, 0, ...mappedTransitions);
  }

  const data = {
    nodes,
    edges,
  };
  return data;
});

const options = {};

const displayNetwork = function () {
  const network = new Network(graph.value, data.value, options);
};

onMounted(() => {
  displayNetwork();
});
watch(
  () => props.automata,
  () => {
    displayNetwork();
  },
  {
    deep: true,
  }
);
</script>

<style scoped lang="scss">
#graph {
  width: 100%;
  height: 100vh;
}
</style>
