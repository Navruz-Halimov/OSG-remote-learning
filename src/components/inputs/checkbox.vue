<template>
  <div class="field">
    <input
      :class="
        `
          is-checkradio 
          is-blue
          ${
            size === 'small'
              ? 'is-small'
              : size === 'medium'
              ? 'is-medium'
              : size === 'large'
              ? 'is-large'
              : ''
          }
        `
      "
      type="checkbox"
      name="exampleCheckbox"
      :id="randomId"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('change', $event.target.checked)"
    />
    {{ text && textAlign === "left" ? text : "" }}
    <label
      class="
            custom-checkbox
            pr-1
          "
      :for="randomId"
      :class="[textAlign === 'left' ? 'ml-4' : null]"
    ></label>
    <span v-if="text && textAlign === 'right'">
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  model: {
    event: "change",
    prop: "checked",
  },
  props: {
    text: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textAlign: {
      type: String,
      default: "right",
    },
    checked: {
      type: Boolean,
    },
    size: {
      type: String,
    },
  },
  data() {
    return {
      randomId: null,
    };
  },
  beforeMount() {
    this.randomId = Math.random()
      .toString()
      .slice(2);
  },
};
</script>

<style>
.black-text .is-checkradio[type="checkbox"]:not([checked]) + label + span {
  color: black;
}

.is-checkradio[type="checkbox"]:checked + label::before,
.is-checkradio[type="checkbox"]:checked + label:before {
  border: 1px solid #224e92 !important;
}

/* .is-checkradio[type="checkbox"]:not([checked]) + label + span{
  color: #c7c7c7;
} */

.is-checkradio[type="checkbox"]:checked + label + span {
  color: black;
}

.is-checkradio[type="checkbox"] + label::after,
.is-checkradio[type="checkbox"] + label:after {
  border-color: #224e92 !important;
}

.is-checkradio[type="checkbox"].is-blue:hover:not([disabled]) + label::before,
.is-checkradio[type="checkbox"].is-blue:hover:not([disabled]) + label:before {
  border-color: #224e92 !important;
}

.field:not(:last-child) {
  margin: 0 !important;
}
.is-checkradio[type="checkbox"].is-blue.is-small + label::after,
.is-checkradio[type="checkbox"].is-blue.is-small + label:after {
  width: 0.38125rem;
  height: 0.65rem;
  top: 0.20375rem;
  left: 0.37rem;
}
</style>
