<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  className: {
    type: String,
  },
  color: {
    type: String,
    default: "#333",
  },
});
const svgName = computed(() => {
  if (props.name.includes("/")) {
    return `#${props.name}`;
  } else {
    return `#/${props.name}`;
  }
});
const svgClass = computed(() =>
  props.className ? "svg-icon " + props.className : "svg-icon"
);
</script>
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="svgName" :fill="color" />
  </svg>
</template>

<style scoped>
.svg-icon {
  width: 100%;
  height: 100%;
  fill: currentColor;
  overflow: hidden;
}
.svg-small-icon{
  width: 24px;
  height: 24px;
  fill: currentColor;
  overflow: hidden;
}
</style>
