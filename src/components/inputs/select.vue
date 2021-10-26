<template>
  <span>
    <div class="select-title" v-if="!noTitle">{{ title }}</div>
    <v-select
      v-bind="$props"
      @input="$emit('change', arguments[0])"
      :options="optionsComputed"
    />
  </span>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    options: {
      type: Array,
    },

    title: {
      type: String,
    },

    label: {
      type: String,
    },

    placeholder: {
      type: String,
    },

    value: {
      type: [String, Number, Object],
    },
    
    noTitle: {
      type: Boolean,
    },

    reduce: {
      type: Function,
      default: (item) => item.id,
    },

    ml: Boolean,
    disabled: Boolean,
  },
  computed: {
    optionsComputed() {
      if (this.ml) {
        return (this.options || []).map((item) => {
          return {
            ...item,
            [this.label]: item[this.label][this.$i18n.locale],
          };
        });
      }
      return this.options || [];
    },
  },
};
</script>

<style lang="scss">
.content ul {
  margin-left: 0;
  margin-top: 0.5em;
}

.select-title {
  margin-bottom: 5px;
}

.white .vs__dropdown-menu {
  margin-top: 0;
}

.white .vs__dropdown-toggle {
  background: white !important;
  box-shadow: 0px 3px 10px #a1a1a124 !important;
  border: none;
}

.rounded .vs__dropdown-toggle {
  border-radius: 30px !important;
}

.grey .vs__dropdown-toggle {
  background-color: #eff4fc;
  border: 0 none;
}
.grey-2 {
  .vs__dropdown-toggle {
    background-color: #f4f5f8;
    border: 0 none;
  }
  // .vs__selected {
  //   // color: #9BA7BC;
  //   // font-size: 14px;
  // }
  .vs__selected-options input.vs__search::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #bebfc1;
  }
}

.grey .vs__selected-options input.vs__search::placeholder {
  color: #9aa6bb;
}

.vs__dropdown-toggle {
  border-color: #d3d7db;
  background-color: #fff;
  padding: 5px 8px !important;
}

.vs__actions {
  cursor: pointer;
}

.whitout_close {
  .vs__clear svg {
    display: none;
  }
}

.vs__clear svg {
  fill: #d3d7db;
}

.grey-border {
  .vs__dropdown-toggle {
    border-color: #dae0e9;
  }
  .vs__selected {
    // color: #bebfc1;
    font-size: 15px;
  }
}

.width-230 {
  .vs__dropdown-toggle {
    width: 230px;
  }
}

.height-min {
  .vs__dropdown-toggle {
    padding: 0px 8px !important;
  }
}

.grey .vs__clear svg {
  fill: #bacae8 !important;
  position: relative;
}

.vs__open-indicator {
  fill: rgba(0, 0, 0, 0) !important;
  transform: scale(1.2);
  cursor: pointer;
  width: 8px;
  background-image: url(../../assets/icons/arow-down.svg);
  background-repeat: no-repeat;
  background-position: center right;
  position: relative;
  top: -1px;
}

.grey .vs__open-indicator {
  fill: rgba(0, 0, 0, 0) !important;
  cursor: pointer;
  width: 15px;
  height: 15px;
  background-image: url(../../assets/icons/arow-down.svg);
  background-repeat: no-repeat;
  background-position: center center;
  margin-right: 5px;
}

.grey .vs--open .vs__open-indicator {
  transform: rotate(180deg) scale(1.2);
}

.vs--open .vs__open-indicator {
  transform: rotate(180deg) scale(1.2);
}

.vs__selected-options input.vs__search::placeholder {
  color: #c6d3e5;
}
</style>
