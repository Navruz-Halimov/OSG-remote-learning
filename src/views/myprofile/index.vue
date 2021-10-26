<template>
  <div class="myprofile">
    <h3 class="myprofile__title">Ваш профиль</h3>
    <div class="myprofile__ava">
      <div class="myprofile__ava__img">
        <d-avatar :src="info.image || null" alt="Ava" />
      </div>
      <div class="myprofile__ava__name">
        <h3>
          {{ info.first_name || "" }}
          {{ info.last_name || "" }}
        </h3>
      </div>
    </div>
    <div class="myprofile__info" v-if="info">
      <div class="myprofile__info__fio">
        <span>Имя:</span>
        <span>{{ info.first_name || "Не заполнено" }}</span>
      </div>
      <div class="myprofile__info__fio">
        <span>Фамилия:</span>
        <span>{{ info.last_name || "Не заполнено" }}</span>
      </div>
      <div class="myprofile__info__fio">
        <span>Логин:</span>
        <span>{{ info.username || "Не заполнено" }}</span>
      </div>
      <div class="myprofile__info__fio">
        <span>Email:</span>
        <span>{{ info.email || "Не заполнено" }}</span>
      </div>
      <div class="myprofile__info__fio myprofile__info__fio_time">
        <span>Последний сеанс:</span>
        <span>{{ $moment(info.last_login).format("HH:mm DD.MM.YYYY") }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  components: {
    "d-avatar": () => import("@/components/Avatar"),
  },
  computed: {
    ...mapState({
      info: (state) => state.myprofile.info,
    }),
  },
  methods: {
    ...mapActions("myprofile", ["getProfileData"]),
  },
  async mounted() {
    await this.getProfileData();
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/base/_mixins.scss";
.myprofile {
  width: 60%;
  min-height: 100%;
  padding: 25px 32px;
  box-shadow: 0 3px 10px rgba(161, 161, 161, 0.14);
  border-radius: 4px;
  background-color: #ffffff;
  margin: 0 auto;
  &__title {
    color: #275395 !important;
    font-size: 18px !important;
    font-weight: 600 !important;
  }
  &__ava {
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 18px;
    border-bottom: 1px dashed $grey;
    &__img {
      height: 70px;
      width: 70px;
      min-width: 70px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
      img {
        @include img;
      }
    }
    &__name {
      display: flex;
      flex-direction: column;
      span {
        &:first-child {
          margin-bottom: 5px;
          color: $text-color;
          font-size: 16px;
          font-weight: 400;
        }
        &:last-child {
          color: $grey;
          font-size: 15px;
          font-weight: 400;
          text-transform: uppercase;
        }
      }
    }
  }
  &__info {
    &__fio {
      display: flex;
      margin-bottom: 18px;
      span {
        margin-right: 10px;
        &:first-child {
          display: block;
          color: #9aa6bb;
          font-size: 17px;
          font-weight: 400;
          width: 25%;
        }
        &:last-child {
          color: $text-color;
          font-size: 16px;
          font-weight: 400;
        }
      }
      &_time {
        span {
          &:last-child {
            color: $blue;
          }
        }
      }
    }
  }
}
</style>
