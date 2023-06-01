<template>
  <div class="select">
    <div class="select__active">{{ options[activeOption] }}</div>
    <lord-icon
      src="https://cdn.lordicon.com/rvuqcvqy.json"
      trigger="click"
      colors="primary:#3d7141,secondary:#3d7141"
      stroke="100"
      class="select__icon"
      @click="forward"
    >
    </lord-icon>
  </div>
</template>

<script setup>
import "https://cdn.lordicon.com/bhenfmcm.js";
import { ref } from "vue";

const emits = defineEmits(["input"]);

const props = defineProps({
  options: {
    type: Array,
    required: false,
    default: [],
  },
});

const activeOption = ref(0);

const forward = () => {
  activeOption.value++;
  if (activeOption.value === props.options.length) {
    activeOption.value = 0;
  }
  emits("input", props.options[activeOption.value]);
};
</script>

<style lang="scss" scoped>
.select {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  &__icon {
    cursor: pointer;
  }
  &__active {
    font-size: 1.6rem;
    color: #3d7141;
  }
}
</style>
