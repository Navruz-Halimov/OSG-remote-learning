<template>
  <div class="tab-content" :class="{ active: name == $parent.activeTab.name }">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: [String, Number],
      default: "",
    },

    tab: {
      type: String,
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.$parent.$emit("handle-tab-props", {
        name: this.name,
        tab: this.tab,
      });
    });
  },
};
</script>