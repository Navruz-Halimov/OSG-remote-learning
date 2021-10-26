<template>
  <div class="columns attestation-id padding-sm-x">
    <div class="column is-9">
      <div class="section__list attestation-id-left">
        <Loading-progress v-if="loading" />

        <template v-if="!loading && form && form.employee">
          <div class="columns padding-sm-x">
            <div class="column">
              <button @click="toBack" class="primary-btn button back-button">
                <d-icon class="left-arrow" icon="left-arrow" />
                Назад
              </button>
              <h4 class="title">Сотрудники</h4>
              <!-- <pre>{{ form }}</pre> -->
              <h5 class="secondary-title">Данные о сотруднике</h5>
              <div class="columns py-3 profile-detail">
                <template v-if="form.employee">
                  <div class="pt-1 pl-3">
                    <d-avatar
                      cover
                      :src="form.employee.photo"
                      height="64"
                      width="64"
                    />
                  </div>
                  <div class="column py-0">
                    <h3 class="mb-0">
                      {{
                        ((form.employee || {}).last_name || {})[$i18n.locale] ||
                        ""
                      }}
                      {{
                        ((form.employee || {}).first_name || {})[
                          $i18n.locale
                        ] || ""
                      }}
                      {{
                        ((form.employee || {}).middle_name || {})[
                          $i18n.locale
                        ] || ""
                      }}
                    </h3>
                    <div class="text-gray pt-1">
                      ID:
                      {{
                        (form.employee && form.employee.register_number) || ""
                      }}
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <div class="column">
              <d-dropdown class="businetrip-dropdowm">
                <template #body>
                  <d-icon
                    icon="more"
                    class="custom-dropdown__trigger"
                    @click="open = !open"
                  />
                </template>
                <template #dropdown-menu>
                  <li>
                    <router-link
                      :to="{ name: 'holidaysIdEdit', id: form.id }"
                    >
                      <d-icon class="no-rotate" icon="teacher-pen"></d-icon>
                      Редактирпвать
                    </router-link>
                  </li>
                  <li>
                    <a>
                      <d-icon class="no-rotate" icon="delete"></d-icon>
                      Удалить
                    </a>
                  </li>
                </template>
              </d-dropdown>
            </div>
          </div>

          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">
              <div class="py-1">Подразделение:</div>
            </div>

            <div class="column">
              <div class="py-1">
                {{
                  ((form.employee || {}).current_department || {})[
                    $i18n.locale
                  ] || ""
                }}
              </div>
            </div>
          </div>

          <div class="columns padding-sm-x">
            <div class="column is-4">
              <div class="py-1">Должность:</div>
            </div>

            <div class="column">
              <div class="py-1">
                {{
                  ((form.employee || {}).current_workplace || {})[
                    $i18n.locale
                  ] || ""
                }}
              </div>
            </div>
          </div>

          <h5 class="secondary-title padding-sm-x">Данные об отпуске</h5>

          <div class="columns padding-sm-x">
            <div class="column is-4">Тип отпуска:</div>
            <div class="column">
              {{ ((form.vacation_type || {}).name || {})[$i18n.locale] }}
            </div>
          </div>

          <div class="columns padding-sm-x">
            <div class="column is-4">Дата начала отпуска:</div>
            <div class="column">
              {{ $moment(form.date_from).format("DD.MM.YYYY") }}
            </div>
          </div>

          <div class="columns padding-sm-x">
            <div class="column is-4">Дата прихода:</div>
            <div class="column">
              {{ $moment(form.date_to).format("DD.MM.YYYY") }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="column is-3">
      <div class="section__list attestation-id-right">
        <h4 class="title">Документы</h4>
        <center v-if="!employeevacationdocument_set.length">
          <h4 class="mt-5">Пусто</h4>
        </center>

        <div
          class="columns py-2 profile-detail padding-sm-x"
          v-for="item in employeevacationdocument_set"
          :key="item.id"
        >
          <div class="icon-container">
            <img :src="require('@/assets/icons/word.png')" alt="" />
          </div>
          <div class="column py-0">
            <div>{{ item.document.slice().split("/").pop() }}</div>
            <div class="text-gray time-div">
              <d-icon icon="time" class="icon-clock" />{{
                $moment(item.updated_at || item.created_at).format(
                  "HH:MM DD.MM.YYYY"
                )
              }}
              |
              <a :href="item.document" class="download-link" download>
                Скачать &nbsp;
                <d-icon icon="download" />
              </a>
            </div>
          </div>
          <d-icon icon="more" class="icon-more" @click="open = !open" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    "d-dropdown": () => import("@/components/Dropdown"),
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-avatar": () => import("@/components/Avatar"),
    LoadingProgress: () => import("@/components/Loading-progress"),
  },

  methods: {
    ...mapActions("employeeVacation", ["fetchDetail"]),
  },

  watch: {
    $route: {
      handler(arg) {
        if (arg.params.id) {
          this.loading = true;
          this.fetchDetail(arg.params.id)
            .then((res) => {
              if (res && res.data) {
                this.form = res.data || {};
              }
              this.loading = false;
            })
            .catch((err) => {
              this.loading = false;
              console.error(err);
            });
        }
      },
      immediate: true,
    },
  },

  computed: {
    employeevacationdocument_set() {
      return (this.form || {}).employeevacationdocument_set || [];
    },
  },

  data() {
    return {
      form: {},
      open: false,
      loading: false,
    };
  },
};
</script>

<style lang="scss">
.attestation-id {
  width: 100%;

  &-left {
    height: 100%;

    &__body {
      border-bottom: 1px dashed $lightgrey;

      &:last-child {
        border-bottom: none;
      }

      &:last-child {
        border-bottom: none;
      }
    }

    .back-button {
      svg {
        fill: white;
        width: 9px;
      }
    }

    .title {
      margin-top: 10px;
    }

    .secondary-title {
      margin-top: 20px;
      color: #9aa6bb;
      font-weight: 400;
      font-size: 16px;
    }

    .profile-detail {
      align-items: center;
    }

    .custom-dropdown,
    .custom-dropup {
      float: right;

      svg {
        position: relative;
        display: inline-block;
        transform: rotate(90deg);
        width: 15px;
        fill: $grey;
      }

      &__content {
        list-style: none !important;
      }
    }
  }
  .icon-more {
    width: 20px;
    transform: rotate(90deg);

    fill: $lightgrey;
  }

  &-right {
    height: 100%;
    box-shadow: 0px 3px 10px #a1a1a124;
    font-size: 15px;

    .download-link {
      color: $blue;
      svg {
        width: 12px;
        fill: $blue;
      }
    }

    .icon-container {
      height: 48px;
      width: 48px;
      background-color: #2a56991a;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 25px;
      }
    }

    .profile-detail {
      border-radius: 8px;

      &:hover {
        background-color: #f6f7f8;
      }
      .column {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }

    .time-div {
      display: flex;
      justify-content: space-between;
    }

    .icon-clock {
      width: 13px;
    }
    .icon-more {
      width: 20px;
      transform: rotate(90deg);

      fill: $lightgrey;
    }
  }
}
</style>