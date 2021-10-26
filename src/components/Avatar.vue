<template>
  <img
    :class="[
      'avatar-block',
      { bordered: border, rectangled: rectangle, cover: cover },
    ]"
    :style="[
      {
        minWidth: width || 'inherit',
        width: (width && width + 'px') || 'auto',
        height: (height && height + 'px') || 'auto',
      },
    ]"
    :src="computedSrc"
    :alt="alt"
  />
</template>

<script>
const defaultAvatarSrc = require("@/assets/images/no-image.png");
export default {
  props: {
    border: Boolean,
    rectangle: Boolean,
    cover: Boolean,
    width: [String, Number],
    height: [String, Number],
    src: {
      type: String,
      default: () => defaultAvatarSrc,
      required: false,
    },
    alt: {
      type: String,
      default: () => "",
    },
  },

  computed: {
    computedSrc() {
      return this.src || defaultAvatarSrc;
    },
  },
};
</script>
