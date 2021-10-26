<template>
  <div class="lang-row mt-3">
    <div
      class="lang-row__item"
      v-for="(item, index) in options"
      :key="item"
      @click="emitItem(item)"
    >
      <div
        class="lang-row__item__circle"
        v-if="![item].includes(selectedItem || value)"
      >
        {{ index + 1 }}
      </div>

      <d-icon v-else icon="check" />

      <div class="lang-row__item__code">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "d-icon": () => import("@/components/icons/iconWrapper"),
  },

  model: {
    prop: "value",
    event: "change",
  },

  props: {
    value: {
      type: [String, Number, Object],
      default: () => null,
    },

    options: {
      type: [Array, Object],
      default: () => [],
    },
  },

  methods: {
    emitItem(element) {
      this.selectedItem = element;
      this.$emit("change", element);
    },
  },

  data() {
    return {
      selectedItem: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.lang-row {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;

  &::after {
    content: "";
    position: absolute;
    top: 16px;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px dashed $lightgrey;
    z-index: -1;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    svg {
      fill: $blue;
      width: 32px;
      height: 32px;
      background-color: white;
    }

    &__circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background-color: #e4e9f1;
      border-radius: 50%;
      text-align: center;
      cursor: pointer;

      // &.active {
      // }
    }

    &__code {
      margin-top: 5px;
      color: #9aa6bb;
      text-transform: capitalize;
    }
  }
}
</style>