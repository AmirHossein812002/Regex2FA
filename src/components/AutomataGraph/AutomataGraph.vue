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
    color: {
      background: "#66bd6d",
      border: "transparent",
      hover: { background: "#5caa62", border: "transparent" },
      highlight: {
        background: "#529757",
        border: "transparent",
      },
    },
    font: {
      face: "Gloria Hallelujah",
      color: "#0a130b",
      size: 18,
    },
  }));
  for (let index = 0; index < props.automata.finalStates.length; index++) {
    nodes[props.automata.finalStates[index]].color = {
      background: "#f0f8f0",
      border: "transparent",
      hover: { background: "#e0f2e2", border: "transparent" },
      highlight: {
        background: "#c2e5c5",
        border: "transparent",
      },
    };
  }

  const edges = [];
  for (let index = 0; index < props.automata.states.length; index++) {
    const transitions = props.automata.states[index];
    const mappedTransitions = transitions.map((transition) => ({
      from: index,
      to: transition.to,
      label: transition.value,
      arrows: "to",
      color: { color: "#e0f2e2", hover: "#a3d7a7", highlight: "#b3deb6" },
      dashes: true,
      font: {
        face: "Gloria Hallelujah",
        background: "transparent",
        strokeWidth: "0",
        color: "#fff",
        size: 18,
      },
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
  @import url("https://fonts.googleapis.com/css2?family=Gloria+Hallelujah&display=swap");
  background-color: #18191a;
  width: 100%;
  height: 100%;
}
</style>
