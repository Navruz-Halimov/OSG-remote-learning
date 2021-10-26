<template>
  <div class="field">
    <p v-if="title" class="mb-2">{{ title }}</p>
    <p class="control has-icons-left has-icons-right" v-if="type == 'number'">
      <input
        :class="`input 
        ${rounded ? 'is-rounded' : ''} 
        ${
          size === 'small'
            ? 'is-small'
            : size === 'medium'
            ? 'is-medium'
            : size === 'large'
            ? 'is-large'
            : ''
        }
        ${alignIcon === 'left' || alignIcon === 'both' ? 'right-space' : ''}`"
        :id="uniqueId"
        @input="isNumber($event)"
        :placeholder="placeholder"
        :disabled="status || disabled"
        :value="value"
        v-bind="$attrs"
      />

      <span
        v-if="alignIcon !== 'both'"
        :class="`icon 
            ${
              alignIcon === 'left'
                ? 'is-left'
                : alignIcon === 'right'
                ? 'is-right'
                : null
            }
            `"
      >
        <d-icon-wrapper
          :icon="icon"
          :style="[{ width: iconWidth }, { fill: iconColor }]"
        />
      </span>
    </p>
    <p class="control has-icons-left has-icons-right" v-else>
      <input
        :class="`input 
        ${rounded ? 'is-rounded' : ''} 
        ${
          size === 'small'
            ? 'is-small'
            : size === 'medium'
            ? 'is-medium'
            : size === 'large'
            ? 'is-large'
            : ''
        }
        ${alignIcon === 'left' || alignIcon === 'both' ? 'right-space' : ''}`"
        :id="uniqueId"
        :type="type || 'text'"
        :placeholder="placeholder"
        :disabled="status || disabled"
        :value="value"
        @input="$emit('input', $event.target.value)"
        v-bind="$attrs"
      />

      <span
        v-if="alignIcon !== 'both'"
        :class="`icon 
            ${
              alignIcon === 'left'
                ? 'is-left'
                : alignIcon === 'right'
                ? 'is-right'
                : null
            }
            `"
      >
        <d-icon-wrapper
          :icon="icon"
          :style="[{ width: iconWidth }, { fill: iconColor }]"
        />
      </span>
      <span
        v-if="alignIcon === 'both'"
        class="icon is-left"
        @click="togglePass"
      >
        <d-icon-wrapper :icon="icon" />
      </span>
      <span
        v-if="alignIcon === 'both'"
        class="icon is-left"
        @click="togglePass"
      >
        <d-icon-wrapper :icon="icon" />
      </span>
      <span
        v-if="alignIcon === 'both'"
        class="icon is-left"
        @click="togglePass"
      >
        <d-icon-wrapper :icon="icon" />
      </span>
      <span
        v-if="alignIcon === 'both'"
        :class="['icon is-right', icon2 === 'see-password' ? 'pointer' : null]"
        @click="togglePass"
      >
        <d-icon-wrapper :icon="icon2" />
      </span>
    </p>
    <!-- using -->
    <!-- <d-input
            icon="search"
            placeholder="Поиск"
            size
            type="text"
            alignIcon="right"
            title
            :disabled="true"
          /> -->
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "input",
  },
  props: {
    value: {
      type: [String, Number],
    },
    icon: {
      type: String,
    },
    icon2: {
      type: String,
    },
    alignIcon: {
      type: String,
    },
    iconWidth: {
      type: String,
    },
    iconColor: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    size: {
      type: String,
    },
    type: {
      type: String,
    },
    rounded: {
      type: Boolean,
    },
    title: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: () => false,
    },
  },
  components: {
    "d-icon-wrapper": () => import("@/components/icons/iconWrapper"),
  },
  computed: {
    uniqueId() {
      return Math.random().toString().slice(2);
    },
  },
  methods: {
    togglePass() {
      this.type = this.type === "password" ? "text" : "password";
    },
    isNumber(event) {
      event.target.value = (event.target.value.match(/\d+/g) || []).join("");
      this.$emit("input", event.target.value);
    },
  },
};
</script>

<style lang="scss">
.input {
  padding-left: 1em !important;
}

.shadow {
  input.input {
    box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.04);
    border: 0 none;
  }
}

.grey {
  input.input {
    background-color: #f4f5f8;
    border: 0 none;
  }
}

.right-space {
  padding-left: 3em !important;
}

.pointer {
  cursor: pointer;
}

.width-260 {
  input.input {
    width: 260px;
  }
}

.login__input {
  input.input {
    border: 1px solid #e8e6f1;
    border-radius: 10px;
    background-color: #f7f7f8;
    &:-webkit-autofill {
      box-shadow: inset 0 0 0 50px #f7f7f8;
      -moz-box-shadow: inset 0 0 0 50px #f7f7f8;
      --box-shadow: inset 0 0 0 50px #f7f7f8;
    }
    // &::placeholder {
    //   color: #BEBCC9;
    //   padding-left: 10px;
    // }
    // &::-moz-placeholder {
    //   color: #BEBCC9;
    //   padding-left: 10px;
    // }
  }
  span.is-left {
    border-right: 1px solid #e8e6f1;
    margin-right: 5px;
  }
  .control.has-icons-left .icon,
  .control.has-icons-right .icon {
    z-index: 999;
    pointer-events: unset;
  }
}
</style>
