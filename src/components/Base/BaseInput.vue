<template>
  <div class="input-box">
    <div class="input-box__icon">
      <slot name="icon"></slot>
    </div>

    <input
      :type="type"
      id="input"
      :class="['input-box__input', 'input', input_class]"
      :value="modelValue"
      @input="input($event)"
    />
    <label class="input-box__label">{{ labelText }}</label>

    <div class="input-box__select">
      <slot name="select"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  type: {
    type: String,
    required: false,
    default: "text",
    validator(value) {
      return [
        "date",
        "email",
        "text",
        "number",
        "search",
        "tel",
        "time",
        "url",
        "weel",
        "month",
      ].includes(value);
    },
  },
  labelText: {
    type: String,
    required: false,
    default: "",
  },
  modelValue: {
    type: String,
    required: false,
  },
});

const inputValue = ref("");

const input = function (event) {
  inputValue.value = event.target.value;
  emits("update:modelValue", event.target.value);
};

const input_class = computed(() => {
  if (inputValue.value !== "") {
    return "input--active";
  } else {
    return "";
  }
});
</script>

<style lang="scss" scoped>
.input-box {
  position: relative;
  &__label {
    position: absolute;
    top: 50%;
    left: 4.8rem;
    transform: translateY(-50%);
    font-size: 1.6rem;
    color: #3d7141;
    pointer-events: none;
    transition: all 0.3s;
  }
  &__icon {
    position: absolute;
  }
  &__select {
    position: absolute;
    top: 50%;
    right: 2rem;
    transform: translateY(-50%);
  }
}

.input {
  background-color: #e0f2e2;
  border-radius: 2rem;
  padding: 0.4em 12rem 0.4rem 4.8rem;
  color: #0a130b;
  font-size: 1.6rem;
  width: 100%;
  height: 5rem;
  transition: all 0.3s;
  border: 0.2rem solid transparent;
  &:hover,
  &:active,
  &--active {
    border: 0.2rem solid #47844c;
    padding: 0.8rem 12rem 0 4.8rem;
    & + .input-box__label {
      top: 1rem;
      font-weight: 900;
      font-size: 1rem;
    }
  }
}
</style>
