<template>
  <div class="login">
    <div class="login__bg"></div>
    <div class="login__wrapper">
      <div class="login__inner">
        <div class="login__form">
          <div class="login__header">
            <div class="login__logo">
              <img src="@/assets/icons/logo.svg" class="login__img" alt="" />
            </div>
            <div class="login__welcome">Добро пожаловать!</div>
          </div>
          <div class="login__body">
            <form @submit.prevent="login">
              <div>
                <d-input
                  icon="user"
                  placeholder="Логин"
                  size
                  type="text"
                  alignIcon="left"
                  class="login__input"
                  v-model="form.username"
                />
              </div>
              <div>
                <d-input
                  icon="password"
                  icon2="see-password"
                  placeholder="Пароль"
                  size
                  type="password"
                  alignIcon="both"
                  class="login__input"
                  v-model="form.password"
                />
              </div>
              <div>
                <d-button
                  :disabled="loading"
                  type="submit"
                  text="Войти"
                  class="blue login__button"
                />
              </div>
            </form>

            <div
              class="mt-4 has-text-centered p-2 has-text-danger"
              v-show="errorResponseText"
            >
              {{ errorWords[errorResponseText] }}
            </div>
          </div>
          <div class="login__footer">
            <small> Разработка: Online Service Group </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const errorWords = {
  "No active account found with the given credentials":
    "Не найден пользователь с таким логином и паролем",
};
export default {
  components: {
    "d-input": () => import("@/components/inputs/input"),
    "d-button": () => import("@/components/buttons/loaderButton"),
  },

  data() {
    return {
      errorWords,
      form: {
        username: null,
        password: null,
      },
      loading: false,

      errorResponseText: null,
    };
  },

  methods: {
    login() {
      this.errorResponseText = "";

      this.loading = true;
      this.$store
        .dispatch("auth/login", this.form)
        .then(() => {
          this.loading = false;
          this.$router.push({ path: this.$route.query.redirect || "/" });
        })
        .catch((err) => {
          this.errorResponseText =
            ((err.response || {}).data || {}).detail || null;
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.control.has-icons-right .input {
  padding-left: 3em;
}

.login {
  display: flex;
  flex-wrap: wrap;
  height: 100vh;
  div {
    flex: 1;
    min-width: 360px;
  }
  &__bg {
    background-image: url("../assets/images/login_bg.png");
    background-size: cover;
  }
  &__wrapper {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    height: 100vh;
    .login__inner {
      width: 40%;
      height: 80vh;
      display: flex;
      justify-content: center;
      align-items: center;
      .login__form {
        height: 20vh;
        .login__header {
          .login__logo {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 10px;
            .login__img {
              width: 80px;
              height: 80px;
            }
          }
          .login__welcome {
            text-align: center;
            margin-bottom: 20px;
          }
        }
        .login__body {
          form {
            div {
              display: flex;
              justify-content: center;
              margin-top: 10px;

              &:nth-child(3) {
                margin-top: 30px;
                .login__button {
                  padding: 0 40px;
                }
              }
            }
          }
        }
        .login__footer {
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          small {
            color: #c5cedd;
          }
        }
      }
    }
  }
}
</style>
