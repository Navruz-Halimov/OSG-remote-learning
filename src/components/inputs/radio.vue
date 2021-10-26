<template>
  <div class="control">
    <label class="radio">
      {{ text && textAlign === "left" ? text : "" }}
      <input
        type="radio"
        :name="name"
        :value="info"
        :disabled="disabled"
        :checked="checked"
        @change="$emit('change', $event.target.value)"
      />
      {{ text && textAlign === "right" ? text : "" }}
    </label>
  </div>
</template>

<script>
export default {
    model: {
        prop: "value",
        event: "change"
    },
    methods: {},
  props: {
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
    },
    textAlign: {
      type: String,
    },
    info: {
        type: String
    },
    value: {
        type: String
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    checked: {
      type: Boolean,
    },
    
  },
};
</script>

<style></style>
