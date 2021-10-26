<template>
  <div class="item-acc">
    <div class="item-acc__header">
      <div>№:</div>
      <div>Модуль</div>
      <div>Преподаватель:</div>
      <div>Аудитория:</div>
      <div>Начало:</div>
      <div>Окончание:</div>
      <div></div>
    </div>
    <div class="item-acc__body" v-if="dataArr">
      <div class="item-acc__body__row" v-for="item in dataArr" :key="item.id">
        <div>{{ item.id }}</div>
        <div>{{ item.module }}</div>
        <div>
          <div>{{ item.teacher.avatar }} {{ item.teacher.name }}</div>
          <div :class="[item.seen ? 'active' : null]">
            <div>
              <div>Звание:</div>
              <div>{{ item.rank }}</div>
            </div>
            <div>
              <div>Место работы:</div>
              <div>{{ item.work_place }}</div>
            </div>
            <div>
              <div>Должность:</div>
              <div>{{ item.position }}</div>
            </div>
          </div>
        </div>
        <div>№ {{ item.audience }}</div>
        <div>{{ item.start }}</div>
        <div>{{ item.end }}</div>
        <div @click="item.seen = !item.seen">
          <d-icon-wrapper
            icon="arow-down"
            :class="[item.seen ? 'active' : '']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataArr: {
      type: Array,
    },
  },
  components: {
    "d-icon-wrapper": () => import("./icons/iconWrapper"),
  },
  data() {
    return {
      seenInfo: false,
    };
  },
};
</script>

<style lang="scss">
.item-acc {
  &__header {
    display: flex;
    padding: 0 10px;
    div {
      color: #a6b1c3;
      &:nth-child(1) {
        flex: 0.5;
        //  color: #3D6AB7;
      }
      &:nth-child(2) {
        flex: 2;
      }
      &:nth-child(3) {
        flex: 1.5;
      }
      &:nth-child(4) {
        flex: 1;
      }
      &:nth-child(5) {
        flex: 1;
      }
      &:nth-child(6) {
        flex: 1;
      }
      &:nth-child(7) {
        flex: 0.5;
      }
    }
  }
  &__body {
    font-size: 15px;
    &__row {
      display: flex;
      border-bottom: 1.5px dashed #cecece;
      padding: 20px 0 20px 20px;
      & > div {
        &:nth-child(1) {
          flex: 0.5;
          color: #3d6ab7;
          font-weight: 600;
        }
        &:nth-child(2) {
          flex: 2;
        }
        &:nth-child(3) {
          flex: 1.5;
          & > div:nth-child(2) {
            display: block;
            height: 0;
            opacity: 0;
            transition: 0.2s all ease;
            &.active {
              opacity: 1;
              height: 85px;
              margin-top: 10px;
            }
            div {
              display: flex;
              & > div:nth-child(1) {
                flex: 1;
                color: #a6b1c3;
              }
              & > div:nth-child(2) {
                flex: 1;
              }
            }
          }
        }
        &:nth-child(4) {
          flex: 1;
        }
        &:nth-child(5) {
          flex: 1;
        }
        &:nth-child(6) {
          flex: 1;
        }
        &:nth-child(7) {
          flex: 0.5;
          cursor: pointer;
          display: flex;
          justify-content: center;
          svg {
            transition: 0.5s all;
            margin-top: 10px;
            &.active {
              transform: rotate(180deg);
            }
          }
        }
      }
    }
    &__row:last-child {
      border: 0 none
    }
  }
}
</style>
