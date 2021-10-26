<template>
  <div class="field">
    <input
      id="switch"
      type="checkbox"
      name="switch"
      :class="`
        switch 
        ${rounded ? 'is-rounded' : null} 
        ${outline ? 'is-outlined' : null}
      `"
    />
    <label for="switch">{{ text }}</label>

    <!-- using -->
    <!-- <d-switcher :rounded="true" :outline="true" class="is-danger"/> -->
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
    type: {
      type: String,
    },
    // color: {
    //   type: String,
    // },
    // borderColor: {
    //   type: String,
    // },
    rounded: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/base/variables";

.blue {
  .switch[type="checkbox"].is-outlined:checked + label::before,
  .switch[type="checkbox"].is-outlined:checked + label:before {
    border-color: $blue;
  }
  .switch[type="checkbox"].is-outlined:checked + label::after,
  .switch[type="checkbox"].is-outlined:checked + label:after {
    background: $blue;
  }
}
</style>
