<template>
  <div class="tabs-underline-wrapper">
    <div class="tabs-underline-container" :class="[tabClass || null]">
      <div
        :class="[
          { active: activeTab.name == item.name },
          btnClass || 'tab-item',
        ]"
        v-for="item in tabsList"
        :key="item.name"
        :title="item.tab"
        @click="$emit('change', item)"
      >
        {{ item.tab }}
      </div>

      <slot name="extra-tab"></slot>
    </div>

    <div class="pt-2">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabClass: {
      type: String,
    },
    btnClass: {
      type: String,
    },
  },
  data() {
    return {
      activeTab: {},
      tabsList: [],
    };
  },

  mounted() {
    this.$on("handle-tab-props", (tab) => {
      this.tabsList.push(tab);

      if (!this.activeTab || (this.activeTab && !this.activeTab.name)) {
        this.activeTab = tab;
      }
    });

    this.$on("change", (tab) => {
      this.activeTab = tab;
    });
  },
};
</script>

<style lang="scss">
.tabs {
  &-underline {
    &-container {
      display: flex;
      flex-flow: row nowrap;
    }

    &-wrapper {
      display: flex;
      flex-flow: column nowrap;

      .tab-item {
        cursor: pointer;
        display: flex;
        flex-flow: row nowrap;
        padding: 0.25em 0.5em;
        position: relative;
        font-size: 18px;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          transition: height 0.15s, background-color 0.1s;
          height: 1px;
          background-color: $tabUnderlineColor;
        }

        &.active {
          color: $tabActiveTextColor;
          &::before {
            height: 2px;
            background-color: $tabActiveTextColor;
          }
        }
      }

      .tab-content {
        display: none;
        opacity: 0;
        transition: opacity 0.15s;

        &.active {
          display: block;
          flex: 1;
          opacity: 1;
        }
      }
    }
  }
}
</style>