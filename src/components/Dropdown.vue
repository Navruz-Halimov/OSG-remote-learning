<template>
  <div
    class="custom-dropdown"
    style="position: relative"
    @click.stop="checkTab"
  >
    <slot name="body"></slot>

    <div :class="[{ active: open || null }, classToggle]">
      <ul class="dd-ul-container my-0">
        <slot name="dropdown-menu"></slot>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    up: Boolean,
  },
  data() {
    return {
      open: false,
    };
  },
  mounted() {
    document.addEventListener(
      "hello",
      function (event) {
        // console.log(event.detail.open);
        if (this.open) {
          this.open = event.detail.open;
        }
      }.bind(this)
    );
  },
  methods: {
    checkTab() {
      // console.log('checkTab', this.open);
      this.open = !this.open;
      document.dispatchEvent(
        new CustomEvent("hello", {
          detail: { open: this.open },
        })
      );
    },
    onMouseLeave() {
      setTimeout(() => {
        this.open = false;
      }, 300);
    },
  },
  computed: {
    classToggle() {
      if (this.up) {
        return "custom-dropup__content";
      }

      return "custom-dropdown__content";
    },
  },
};
</script>

<style lang="scss">
@mixin ddContentMixin {
  z-index: 1000;
  position: absolute;
  min-width: 200px;
  right: 0;
  margin: 0;
  border-radius: 10px;
  background: #fff;
  user-select: none;
  //   overflow: hidden;

  /* Styles */
  border: 1px solid #eaedf3;
  transition: all 0.15s ease-in;
  list-style: none !important;

  opacity: 0;
  pointer-events: none;
  border-radius: 10px;
}
.custom-dropdown__trigger {
  cursor: pointer;

  * {
    pointer-events: none;
    list-style: none !important;
  }
}
.custom-dropup__content {
  @include ddContentMixin;
  /* Size & position */
  bottom: 120%;
  right: 0;

  &.active {
    opacity: 1;
    pointer-events: auto;
    border-radius: 10px;
  }

  &:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: 100%;
    right: 15px;
    border-width: 6px 6px 0 6px;
    border-style: solid;
    border-color: #fff transparent;
  }
  &:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    top: 100%;
    right: 13px;
    border-width: 8px 8px 0 8px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.1) transparent;
  }

  li {
    margin-top: 0 !important;
    a {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      text-decoration: none;
      border-bottom: 1px solid rgba(230, 232, 234, 0.6);
      transition: all 0.15s ease-out;
      font-size: 15px;
      color: black;

      svg {
        fill: $blue !important;
        stroke: $blue !important;
        margin-right: 15px;

        * {
          stroke: $blue;
        }
      }
    }
    &:last-of-type {
      a {
        border: none;
      }
    }
    &:hover {
      a {
        background: #f3f8f8;
      }
    }
  }
}
.custom-dropdown__content {
  @include ddContentMixin;
  /* Size & position */
  top: 120%;
  margin: 0 !important;

  &.active {
    opacity: 1;
    pointer-events: auto;
  }

  &:after {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    bottom: 100%;
    right: 15px;
    border-width: 0 6px 6px 6px;
    border-style: solid;
    border-color: #fff transparent;
  }
  &:before {
    content: "";
    width: 0;
    height: 0;
    position: absolute;
    bottom: 100%;
    right: 13px;
    border-width: 0 8px 8px 8px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.1) transparent;
  }

  .dd-ul-container {
    overflow: hidden;
    border-radius: inherit;
  }

  li {
    margin-top: 0 !important;
    a {
      display: flex;
      align-items: center;
      padding: 10px 20px;
      text-decoration: none;
      border-bottom: 1px solid rgba(230, 232, 234, 0.6);
      transition: all 0.15s ease-out;
      font-size: 15px;
      color: black;

      svg {
        fill: $blue !important;
        margin-right: 15px;

        * {
          stroke: $blue;
        }
      }
    }
    &:last-of-type {
      a {
        border: none;
      }
    }
    &:hover {
      a {
        background: #f3f8f8;
      }
    }
  }
}

.dd-item {
  &.dd-list-item {
    padding: 6px 12px;
    cursor: pointer;
    // border-radius: inherit;

    &:first-child {
      border-radius: inherit inherit 0 0;
    }
    &:hover {
      background-color: $blue;
      color: #fff;
    }
  }
}

.dd-small__icon {
  position: relative;
  display: inline-block;
  // transform: rotate(90deg);
  width: 15px;
  fill: #1761aa;
}
</style>