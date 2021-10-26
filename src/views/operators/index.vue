<template>
  <div class="section__list operators">
    <!-- top title, search -->
    <div class="columns padding-sm-x mb-0">
      <div class="column">
        <h4 class="title">Операторы</h4>
      </div>
    </div>
    <!--    modal-->
    <d-modal
      :seen="openModal"
      size="small"
      title="Регистрация"
      @closemodal="closeModal()"
    >
      <div class="operators__modal">
        <div class="operators__modal__ava">
          <img :src="avatar" alt="Ava" />
          <label for="upload" class="operators__modal__upload">
            <d-icon icon="camera" class="operators__modal__avasvg" />
          </label>
          <input type="file" id="upload" @change="imgHandler" />
        </div>
        <div class="operators__modal__alert" v-if="invalidAva">
          Вы не загрузили фотографию
        </div>
        <d-input
          class="grey"
          title="Логин"
          rounded
          :class="{
            invalid:
              $v.formData.username.$dirty && !$v.formData.username.required
          }"
          placeholder="Введите логин"
          v-model="formData.username"
        />
        <div class="operators__modal__alert" v-if="userExisted">
          Пользователь с таким логином уже существует.
        </div>
        <div
          class="operators__modal__alert"
          v-else-if="
            $v.formData.username.$dirty && !$v.formData.username.required
          "
        >
          Вы не ввели логин
        </div>
        <d-input
          class="grey"
          title="Имя"
          rounded
          :class="{
            invalid:
              $v.formData.first_name.$dirty && !$v.formData.first_name.required
          }"
          placeholder="Введите имя"
          v-model="formData.first_name"
        />
        <div
          class="operators__modal__alert"
          v-if="
            $v.formData.first_name.$dirty && !$v.formData.first_name.required
          "
        >
          Вы не ввели свое имя
        </div>
        <d-input
          class="grey"
          title="Фамилия"
          rounded
          :class="{
            invalid:
              $v.formData.last_name.$dirty && !$v.formData.last_name.required
          }"
          v-model="formData.last_name"
          placeholder="Введите фамилия"
        />
        <div
          class="operators__modal__alert"
          v-if="$v.formData.last_name.$dirty && !$v.formData.last_name.required"
        >
          Вы не ввели свою фамилию
        </div>
        <d-input
          class="grey"
          title="Электронная почта"
          rounded
          :class="{
            invalid:
              ($v.formData.email.$dirty && !$v.formData.email) ||
              ($v.formData.email.$dirty && !$v.formData.email.required)
          }"
          v-model="formData.email"
          placeholder="Введите электронную почту"
        />
        <div
          class="operators__modal__alert"
          v-if="$v.formData.email.$dirty && !$v.formData.email.required"
        >
          Вы не ввели электронную почту
        </div>
        <div
          class="operators__modal__alert"
          v-else-if="$v.formData.email.$dirty && !$v.formData.email.email"
        >
          Вы ввели некорректную электронную почту
        </div>
        <d-input
          class="grey"
          title="Пароль"
          type="password"
          rounded
          v-model="formData.password"
          :class="{
            invalid:
              ($v.formData.password.$dirty && !$v.formData.password.required) ||
              ($v.formData.password.$dirty && !$v.formData.password.minLength)
          }"
          placeholder="Введите пароль"
        />
        <div
          class="operators__modal__alert"
          v-if="$v.formData.password.$dirty && !$v.formData.password.required"
        >
          Вы не ввели пароль
        </div>
        <div
          class="operators__modal__alert"
          v-if="$v.formData.password.$dirty && !$v.formData.password.minLength"
        >
          Длина пароля должна состоять из не менее
          {{ $v.formData.password.$params.minLength.min }} символов
        </div>
        <d-input
          class="grey"
          title="Подтвердите пароль"
          type="password"
          :class="{
            invalid:
              $v.formData.confirmPass.$dirty && !$v.formData.confirmPass.sameAs
          }"
          rounded
          placeholder="Подтвердите пароль"
          v-model="formData.confirmPass"
        />
        <div
          class="operators__modal__alert"
          v-if="
            $v.formData.confirmPass.$dirty && !$v.formData.confirmPass.sameAs
          "
        >
          Пароли должны совпадать
        </div>
        <div class="operators__modal__btns">
          <d-btn
            text="Отмена"
            rounded
            color="grey"
            class="operators__modal__btn"
            @click="closeModal()"
          />
          <d-btn text="Регистрация" rounded color="blue" @click="create()" />
        </div>
      </div>
    </d-modal>
    <!-- list -->
    <d-lists dashed-header :loading="loading">
      <template #header>
        <div class="columns">
          <div class="column is-5"><span>Ф.И.О</span></div>
          <div class="column is-3"><span>Электронная почта</span></div>
          <div class="column is-3"><span>Логин</span></div>
          <div class="column has-text-centered">
            <d-add-btn @click="openModal = !openModal" />
          </div>
        </div>
      </template>

      <template #content>
        <router-link
          :to="{ name: 'operatorsId', params: { id: item.id } }"
          v-for="item in list"
          :key="item.id"
        >
          <div class="columns is-vcentered">
            <div class="column is-5">
              <div class="columns">
                <div class="pt-1">
                  <d-avatar
                    cover
                    width="41"
                    height="41"
                    :src="item.image || null"
                  />
                </div>
                <div class="column centred">
                  <div>
                    {{ name(item) }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-3">{{ item.email || "Не заполнено" }}</div>
            <div class="column is-3">{{ item.username || "Не заполнено" }}</div>
            <div class="column has-text-centered">
              <!-- <div class="icon-rotate-90">
                <d-icon class="sm-icon icon-btn icon-more-btn" icon="more" />
              </div> -->
            </div>
          </div>
        </router-link>
      </template>
    </d-lists>
    <d-pagination-input
      right
      @change="turnPage"
      v-model="pagination.page"
      :total="count"
      :loading="loading"
      :limit="pagination.limit"
    />
  </div>
</template>

<script>
import { email, required, minLength, sameAs } from "vuelidate/lib/validators";
import variables from "@/assets/scss/base/_variables.scss";

import Lists from "@/components/Lists";
import DAvatar from "@/components/Avatar";
import { mapState, mapActions } from "vuex";
import Modal from "@/components/Modal";
import input from "@/components/inputs/input";
import loaderButton from "@/components/buttons/loaderButton";
export default {
  components: {
    "d-lists": Lists,
    "d-icon": () => import("@/components/icons/iconWrapper"),
    DPaginationInput: () => import("@/components/Pagination-input"),
    DAddBtn: () => import("@/components/AddButton"),
    DAvatar,
    "d-modal": Modal,
    "d-input": input,
    "d-btn": loaderButton
  },

  data() {
    return {
      openModal: false,
      iconColor: (variables && variables.grey) || "",
      pagination: {
        page: 1,
        limit: 10
      },
      loading: false,
      userExisted: false,
      invalidAva: false,
      defAva: require("@/assets/images/ava_fish.png"),
      confirmPass: "",
      formData: {
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirmPass: "",
        image: null
      }
    };
  },
  validations: {
    formData: {
      username: { required },
      first_name: { required },
      last_name: { required },
      email: { email, required },
      password: { required, minLength: minLength(6) },
      confirmPass: { sameAs: sameAs("password") }
    }
  },
  computed: {
    ...mapState({
      list: state => state.operators.results || [],
      count: state => state.operators.count
    }),
    avatar() {
      if (this.formData.image) {
        const t = URL.createObjectURL(this.formData.image);
        // this.invalidAva = false;
        return t;
      }
      return this.defAva;
    },
    offsetComputed() {
      return this.pagination.page < 2
        ? 0
        : this.pagination.page * this.pagination.limit - this.pagination.limit;
    }
  },
  watch: {
    avatar(val) {
      if (this.formData.image && val) {
        this.invalidAva = false;
      }
    }
  },
  methods: {
    ...mapActions("operators", ["getListOperators", "createOperator"]),
    name(item) {
      if (item.first_name || item.last_name) {
        return item.first_name + " " + item.last_name;
      } else {
        return "Не заполнено";
      }
    },
    create() {
      this.$v.$touch();
      this.invalidAva = false;
      if (!this.formData.image) {
        this.invalidAva = true;
        return;
      }
      if (!this.$v.formData.$invalid) {
        this.createOperator(this.formData)
          .then(res => {
            if (res.status === 201) {
              this.userExisted = false;
              if (res && res.data) {
                this.getListOperators();
              }
              this.$v.$reset();
              this.closeModal();
              return;
            }
            Object.keys(res.response.data).forEach(key => {
              const [errStr] = res.response.data[key];
              if (errStr === "A user with that username already exists.") {
                this.userExisted = true;
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },

    imgHandler(e) {
      if (e.target.files && e.target.files[0]) {
        this.formData.image = e.target.files[0];
      }
    },
    closeModal() {
      Object.keys(this.formData).forEach(key => {
        this.formData[key] = "";
      });
      this.$v.formData.$reset();
      this.invalidAva = false;
      this.openModal = !this.openModal;
    },
    turnPage() {
      this.loading = true;
      this.getListOperators({
        offset: this.offsetComputed,
        limit: this.pagination.limit
      })
        .then(() => {
          this.loading = false;
        })
        .catch(err => {
          console.error(err);
          this.loading = false;
        });
    }
  },
  mounted() {
    this.turnPage({
      offset: this.offsetComputed,
      limit: this.pagination.limit
    });
  }
};
</script>

<style lang="scss">
@import "~@/assets/scss/components/sections";
.centred {
  align-self: center;
}
.operators {
  display: flex;
  flex-direction: column;
  .d-pagination {
    margin-top: auto !important;
  }
  &__modal {
    padding-top: 10px;
    padding-bottom: 20px;
    &__btns {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    .field {
      margin-bottom: 0;
      margin-top: 15px;
    }
    .invalid {
      .control {
        .input {
          box-shadow: 0.125em 0.125em 0.125em $lred;
        }
      }
    }
    &__ava {
      position: relative;
      margin: 0 auto;
      width: 150px;
      min-width: 150px;
      height: 150px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      overflow: hidden;
      input {
        display: none;
      }
      &:hover .operators__modal__upload {
        bottom: 0;
      }
      img {
        @include img;
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
      transition: 0.3s;
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
    &__alert {
      color: $lred;
      font-size: 13px;
      text-align: center;
      margin-top: 2px;
    }
  }
}
</style>
