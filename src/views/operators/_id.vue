<template>
  <div class="myprofile" @click="closeEdit()">
    <Loading-progress v-if="loading" />

    <template v-if="!loading && detail">
      <button @click="toBack" class="primary-btn button back-button">
        <d-icon class="left-arrow" icon="left-arrow" />
        Назад
      </button>

      <h3 class="myprofile__title">Ваш профиль</h3>
      <div class="myprofile__ava">
        <div class="myprofile__ava__img">
          <d-avatar :src="ava || null" />
          <label for="upload" class="myprofile__ava__upload">
            <d-icon icon="camera" class="myprofile__ava__avasvg" />
          </label>
          <input type="file" id="upload" @change="imgHandler" />
        </div>
        <div class="myprofile__ava__name">
          <h3>
            {{ name(detail) }}
          </h3>
        </div>

        <d-btn
          @click="update()"
          text="Сохранить"
          color="blue"
          class="myprofile__ava__btn"
        />
      </div>
      <div class="myprofile__info">
        <div class="myprofile__info__fio">
          <span>Имя:</span>
          <span v-if="!editItemDetail.first_name">{{
            detail.first_name || "Не заполнено"
          }}</span>
          <input
            v-if="editItemDetail.first_name"
            type="text"
            v-model="detail.first_name"
            class="myprofile__info__input"
            @click.stop
          />
          <div
            class="myprofile__info__edit"
            @click.stop="editItemDetail.first_name = !editItemDetail.first_name"
          >
            <d-icon icon="edit-circle-pen" class="myprofile__info__icon" />
          </div>
        </div>
        <div class="myprofile__info__fio">
          <span>Фамилия:</span>
          <span v-if="!editItemDetail.last_name">{{
            detail.last_name || "Не заполнено"
          }}</span>
          <input
            v-if="editItemDetail.last_name"
            type="text"
            class="myprofile__info__input"
            v-model="detail.last_name"
            @click.stop
          />
          <div
            class="myprofile__info__edit"
            @click.stop="editItemDetail.last_name = !editItemDetail.last_name"
          >
            <d-icon icon="edit-circle-pen" class="myprofile__info__icon" />
          </div>
        </div>
        <div class="myprofile__info__fio">
          <span>Логин:</span>
          <span v-if="!editItemDetail.username">{{
            detail.username || "Не заполнено"
          }}</span>
          <input
            v-if="editItemDetail.username"
            type="text"
            class="myprofile__info__input"
            v-model="detail.username"
            @click.stop
          />
          <div
            class="myprofile__info__edit"
            @click.stop="editItemDetail.username = !editItemDetail.username"
          >
            <d-icon icon="edit-circle-pen" class="myprofile__info__icon" />
          </div>
        </div>
        <div class="myprofile__info__fio">
          <span>Email:</span>
          <span v-if="!editItemDetail.email">{{
            detail.email || "Не заполнено"
          }}</span>
          <input
            v-if="editItemDetail.email"
            type="email"
            class="myprofile__info__input"
            v-model="detail.email"
            @click.stop
          />
          <div
            class="myprofile__info__edit"
            @click.stop="editItemDetail.email = !editItemDetail.email"
          >
            <d-icon icon="edit-circle-pen" class="myprofile__info__icon" />
          </div>
        </div>
        <div class="myprofile__info__fio">
          <span>Пароль:</span>
          <span
            v-if="!editItemDetail.password"
            class="myprofile__info__password"
          >
            ...
          </span>
          <input
            v-if="editItemDetail.password"
            type="password"
            class="myprofile__info__input"
            :placeholder="detail.email"
            v-model="detail.password"
            @click.stop
          />
          <div
            class="myprofile__info__edit"
            @click.stop="editItemDetail.password = !editItemDetail.password"
          >
            <d-icon icon="edit-circle-pen" class="myprofile__info__icon" />
          </div>
        </div>
        <div class="myprofile__info__fio myprofile__info__fio_time">
          <span>Последний сеанс:</span>
          <span>{{
            detail.last_login
              ? $moment(detail.last_login).format("HH:mm, DD.MM.YYYY")
              : "Сеанса еще не было"
          }}</span>
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import loaderButton from "@/components/buttons/loaderButton";
import iconWrapper from "@/components/icons/iconWrapper";

export default {
  components: {
    "d-btn": loaderButton,
    "d-icon": iconWrapper,
    "d-avatar": () => import("@/components/Avatar"),
    LoadingProgress: () => import("@/components/Loading-progress")
  },
  data() {
    return {
      loading: false,
      detail: null,
      copyDetail: {},
      editItemDetail: {},
      defAva: require("@/assets/images/ava_fish.png")
    };
  },

  watch: {
    $route: {
      handler: "fetchData",
      immediate: true
    }
  },

  computed: {
    ava() {
      if (this.detail.image && typeof this.detail.image !== "string") {
        const t = URL.createObjectURL(this.detail.image);
        return t;
      }
      return this.detail.image;
    }
  },

  methods: {
    ...mapActions("operators", ["getDetailOperator", "updateUser"]),
    closeEdit() {
      Object.keys(this.editItemDetail).forEach(key => {
        this.editItemDetail[key] = false;
      });
    },
    update() {
      let obj = {};
      Object.keys(this.detail).forEach(key => {
        if (this.detail[key] !== this.copyDetail[key]) {
          obj[key] = this.detail[key];
        }
      });
      this.updateUser({ id: this.$route.params.id, params: obj }).then(
        response => {
          if (response && response.data) {
            this.$store.dispatch("myprofile/getProfileData");
            this.getDetailOperator(this.$route.params.id).then(res => {
              if (res && res.data) {
                this.detail = res.data;
                Object.keys(this.detail).forEach(key => {
                  this.copyDetail[key] = this.detail[key];
                });
              }
            });
          }
        }
      );
    },
    name(item) {
      if (item.first_name || item.last_name) {
        return item.first_name + " " + item.last_name;
      } else {
        return "Не заполнено";
      }
    },

    fetchData() {
      this.loading = true;
      return this.getDetailOperator(this.$route.params.id)
        .then(res => {
          if (res && res.data) {
            this.detail = res.data;
            this.$set(this.editItemDetail, "password", false);
            this.$set(this.detail, "password", "");
            this.$set(this.copyDetail, "password", "");
            Object.keys(this.detail).forEach(key => {
              this.$set(this.editItemDetail, key, false);
              this.copyDetail[key] = this.detail[key];
            });
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    imgHandler(e) {
      if (e.target.files && e.target.files[0]) {
        this.detail.image = e.target.files[0];
      }
    }
  }
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
  &__back {
    color: $blue;
  }
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
      position: relative;
      height: 70px;
      width: 70px;
      min-width: 70px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;

      input {
        display: none;
      }
      .avatar-block {
        @include img;
      }
      &:hover .myprofile__ava__upload {
        bottom: 0;
      }
    }
    &__upload {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      bottom: -100%;
      left: 0;
      background: rgba(0, 0, 0, 0.4);
      transition: 0.4s;
      width: 100%;
      height: 30%;
      cursor: pointer;
    }
    &__avasvg {
      width: auto;
      height: 80%;
      fill: $white;
      &:active {
        transform: scale(0.95);
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
    &__btn {
      margin-left: auto;
      margin-bottom: auto;
      height: 34px;
    }
  }
  &__info {
    &__fio {
      display: flex;
      align-items: center;
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
    &__edit {
      margin-left: auto;
    }
    &__input {
      border: none;
      border-bottom: 1px solid $blue;
      font-size: 16px !important;
      font-weight: 400;
    }
    &__icon {
      width: 25px;
      height: 25px;
      cursor: pointer;
      &:active {
        transform: scale(0.95);
      }
    }
  }
}
</style>