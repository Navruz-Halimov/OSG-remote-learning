<template>
  <div class="lists-wrapper">
    <div
      :class="[
        'lists-wrapper-header',
        { 'is-blue': blueHeader || null },
        { 'emp-header': empHeader || null },
      ]"
      v-if="!noHeader"
    >
      <slot name="header"></slot>
    </div>
    <div class="lists-wrapper-content">
      <Loading-progress v-if="loading" />

      <span v-show="!loading">
        <slot name="content"></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    blueHeader: Boolean,
    empHeader: Boolean,
    noHeader: Boolean,

    loading: Boolean,
  },

  components: {
    LoadingProgress: () => import("@/components/Loading-progress"),
  },
};
</script>

<style lang="scss">
.lists-wrapper {
  .columns {
    margin: 0 !important;

    .column {
      padding: 4px 20px;
    }
  }

  &-header {
    color: $grey;
    font-weight: 400;
    font-size: 16px;
    border-bottom: 1px dashed $grey;
    margin-bottom: 8px;

    &.is-blue {
      font-size: 19px;
      font-weight: 600;
      color: $blue;
    }

    &.emp-header {
      color: $blueTextLabelColor;
      /* border-bottom: 1px dashed #9aa6bb; */
      margin-bottom: 8px;
      border-radius: 4px;
      background-color: #f4f6f8;
      border-bottom: unset;
    }

    .columns {
      .column {
        padding: 4px 20px;
      }
    }
  }

  &:not(.no-hover) {
    &-content {
      position: relative;
      .columns {
        &:hover {
          background-color: $hovergrey;
          border-radius: 8px;
        }
      }
    }
  }
}
</style>