<template>
  <div class="layout" v-show="seen">
    <div :class="['modal-window', size]">
      <div class="modal-window__header">
        <div class="modal-header__title">
          {{ title }}
        </div>
        <div class="modal-header__close">
          <div @click="$emit('closemodal', $event)">
            <d-iconWrapper icon="close" class="size-1 is-blue" />
          </div>
        </div>
      </div>
      <div class="modal-window__body">
        <slot/>
        <d-item-acc v-if="accArr" :dataArr="accArr" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    size: {
      type: String,
      default: () => "medium",
    },
    seen: {
      type: Boolean,
      default: false
    },
    accArr: {
      type: Array
    }
  },
  components: {
    "d-iconWrapper": () => import("@/components/icons/iconWrapper"),
    "d-item-acc": () => import("@/components/ItemAccordion"),
  },
  data() {
    return {
      // accArr: [
      //   {
      //     id: 1,
      //     module: "Коституционное право",
      //     teacher: {
      //       avatar: "",
      //       name: "Алимов Т.У.",
      //     },
      //     audience: "154",
      //     work_place: "МВД",
      //     rank: "Полковник",
      //     position: "",
      //     start: "8:30",
      //     end: "9:30",
      //     seen: false,
      //   },
      //   {
      //     id: 2,
      //     module: "Коституционное право",
      //     teacher: {
      //       avatar: "",
      //       name: "Алимов Т.У.",
      //     },
      //     audience: "154",
      //     work_place: "МВД",
      //     rank: "Полковник",
      //     position: "",
      //     start: "8:30",
      //     end: "9:30",
      //     seen: false,
      //   },
      // ],
    };
  },
};
</script>

<style lang="scss">
.layout {
  top: 0;
  left: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 998;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal-window {
    background-color: #fff;
    border-radius: 3px;
    padding: 12px 35px;
    z-index: 999;
    height: auto;
    &.small {
      width: 40%;
      max-width: 600px;
      min-width: 300px;
    }
    &.medium {
      width: 60%;
      max-width: 800px;
      min-width: 400px;
    }
    &.large {
      width: 80%;
      max-width: 1200px;
      min-width: 600px;
    }
    &__header {
      display: flex;
      .modal-header__title {
        color: #3d6ab7;
        font-size: 16px;
        font-weight: 600;
        flex: 1;
      }
      .modal-header__close {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        div {
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          width: 30px;
          height: 30px;
          background-color: #fff;
          box-shadow: -1px 1px 3px rgba(0, 0, 0, 0.1);
          border-radius: 3px;
          position: relative;
          top: -18px;
          right: -40px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
