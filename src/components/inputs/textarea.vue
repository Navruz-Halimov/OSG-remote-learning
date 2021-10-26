<template>
  <div class="field">
    <p v-if="title" class="mb-2">{{ title }}</p>
    <div
      :class="
        `control ${
          loadingSize === 'small'
            ? 'is-small'
            : loadingSize === 'medium'
            ? 'is-medium'
            : loadingSize === 'large'
            ? 'is-large'
            : ''
        } 
        ${loading ? 'is-loading' : ''}`
      "
    >
      <textarea
        :class="
          `textarea 
        ${
          size === 'small'
            ? 'is-small'
            : size === 'medium'
            ? 'is-medium'
            : size === 'large'
            ? 'is-large'
            : ''
        }
        ${fixed ? 'has-fixed-size' : ''}
        `
        "
        :readonly="readonly"
        :disabled="disabled"
        :placeholder="placeholder"
        :rows="rows"
      ></textarea>
    </div>
    <!-- using -->
    <!-- <d-textarea
      placeholder="Текстовое поле"
      rows="7"
      title="Title"
      loading
      size="medium"
      loadingSize="large"
      :disabled="false"
      :readonly="false"
    /> -->
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    rows: {
      type: [String, Number],
    },
    title: {
      type: String,
    },
    size: {
      type: String,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadingSize: {
      type: String,
    },
  },
};
</script>

<style></style>
