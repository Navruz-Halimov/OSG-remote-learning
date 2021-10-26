<template>
  <div
    class="loading-progress"
    :key="pinned"
    :class="[{ pinned }, { active }]"
  />
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: () => false,
    },

    pinned: {
      type: Boolean,
      default: () => false,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-progress {
  position: relative;
  height: 4px;
  width: 100%;
  overflow: hidden;

  &.pinned {
    opacity: 0;
    transition: opacity 0.3s;

    &.active {
      opacity: 1;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: $blue;
    opacity: 0.6;
    pointer-events: none;
    width: 100%;
    animation: leftToRight 1.6s infinite;
    border-radius: 4px;
  }
}
</style>