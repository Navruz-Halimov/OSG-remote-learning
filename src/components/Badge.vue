<template>
  <span
    :class="['badge', `badge-${type}`, `badge-${colorClass}`]"
    v-if="figures.includes(type)"
  >
    <slot>
      <span class="slot-value to-abs-center"> 100 </span>
    </slot>
  </span>
</template>

<script>
export default {
  props: {
    red: {
      type: Boolean,
    },
    yellow: {
      type: Boolean,
    },
    green: {
      type: Boolean,
    },
    type: {
      type: String,
      default: () => "rect",
    },
  },

  data() {
    return {
      figures: ["circle", "rect"],

      colors: ["red", "yellow", "green"],
      colorClass: "",
    };
  },

  beforeMount() {
    this.colorClass =
      Object.keys(this.$props).find(
        (colorName) => this.colors.includes(colorName) && this.$props[colorName]
      ) || "green";
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/base/mixins";

.badge {
  min-width: 30px;
  min-height: 30px;
  color: #fff;
  display: inline-block;
  position: relative;
  text-align: center;
  background-color: $badgeGreen;

  // @include flex;
  // align-items: center;
  // justify-content: center;

  &-circle {
    border-radius: 16px;
  }

  &-rect,
  &-rectangle {
    border-radius: 4px;
  }

  .to-abs-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &-red {
    background-color: $badgeRed;
  }
  &-yellow {
    background-color: $badgeYellow;
  }

  &-green {
    background-color: $badgeGreen;
  }
}
</style>