<template>
  <div class="section__list">
    <div class="work-time">
      <div class="work-time__header">
        <div class="work-time__header--left">
          <button @click="toBack" class="primary-btn button back-button">
            <d-icon class="left-arrow" icon="left-arrow" />
            Назад
          </button>
        </div>
        <div class="work-time__header--right right">
          <d-dropdown>
            <!-- dropdown types
      1) default -> dropdown
      2) props "up" -> dropup
       -->
            <template #body>
              <d-icon
                icon="more"
                style="width: 30px"
                class="custom-dropdown__trigger"
              />
            </template>
            <template #dropdown-menu>
              <li>
                <a href="#"> Экспорт </a>
              </li>
              <li>
                <a href="#"> Распечатать </a>
              </li>

              <li>
                <a href="#"> Удалить </a>
              </li>
              <li>
                <a href="#"> Редактировать </a>
              </li>
            </template>
          </d-dropdown>
        </div>
      </div>
      <div class="work-time__body">
        <h4 class="title mt-4 mb-4">Учет рабочего времени</h4>
        <Loading-progress v-if="loading" />
        <div class="work-time__profile" v-if="!loading">
          <p class="work-time__profile--greyInfo grey-text">
            Данные о сотруднике
          </p>
          <div class="work-time__group">
            <div class="columns is-vcentered py-3 work-time__profile--ava-name">
              <div class="pt-1 pl-3">
                <d-avatar
                  cover
                  :src="require('@/assets/images/unnamed.jpg')"
                  height="64"
                  width="64"
                />
              </div>
              <div class="column py-0">
                <h3 class="mb-0">{{ detail.name }}</h3>
                <div class="text-gray pt-1">
                  ID: {{ detail.register_number }}
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column">Подразделение:</div>
              <div class="column">
                {{
                  detail.department === null
                    ? "Не заполнено"
                    : detail.department[$i18n.locale]
                }}
              </div>
            </div>
            <div class="columns">
              <div class="column">Должность:</div>
              <div class="column">
                {{
                  detail.position === null
                    ? "Не заполнено"
                    : detail.position[$i18n.locale]
                }}
              </div>
            </div>
            <div class="columns">
              <div class="column">Данные о местонахождении рабочего места:</div>
              <div class="column">
                {{
                  detail.district === null
                    ? "Не заполнено"
                    : detail.district[$i18n.locale]
                }}
              </div>
            </div>
          </div>
          <div class="work-time__group">
            <p class="work-time__profile--greyInfo grey-text">
              Данные учета рабочего времени
            </p>
            <template v-if="detail.attendance_list.length">
              <div class="columns">
                <div class="column">Дата/время поступления информации:</div>
                <div class="column blue-text">
                  {{
                    detail.attendance_list
                      ? $moment(detail.attendance_list[0].created_at).format(
                          "DD.MM.YYYY HH:mm"
                        )
                      : "Неизвестно"
                  }}
                </div>
              </div>
              <div
                class="columns"
                v-for="item in detail.attendance_list"
                :key="item.id"
              >
                <div class="column">
                  {{ item.event_type ? "Вход:" : "Выход:" }}
                </div>
                <div class="column">
                  {{ $moment(item.created_at).format("HH:mm") }}
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-dropdown": () => import("@/components/Dropdown"),
    "d-avatar": () => import("@/components/Avatar"),
    LoadingProgress: () => import("@/components/Loading-progress")
  },
  data() {
    return {
      loading: true,
      detail: []
    };
  },
  watch: {
    $route: {
      handler() {
        this.getDetailEmp(this.$route.params.id)
          .then(res => {
            if (res && res.data) {
              this.detail = res.data;
              this.detail.name = this.name;
              this.loading = false;
            }
          })
          .catch(err => {
            console.error(err);
          });
      },
      immediate: true
    }
  },
  computed: {
    name() {
      let name;
      if (
        this.detail.first_name[this.$i18n.locale] ||
        this.detail.last_name[this.$i18n.locale] ||
        this.detail.middle_name[this.$i18n.locale]
      ) {
        name = `${this.detail.first_name[this.$i18n.locale]}
        ${this.detail.last_name[this.$i18n.locale]}
        ${this.detail.middle_name[this.$i18n.locale]}`;
      }

      return name || "Не заполнено";
    }
  },

  methods: {
    ...mapActions("workTime", ["getDetailEmp"])
  }
};
</script>

<style lang="scss" scoped>
.blue-text {
  color: #345d9b;
}

.grey-text {
  color: #9faabe;
  font-size: 18px;
}

.right {
  display: flex;
  justify-content: flex-end;
  padding-right: 12px;
}

.custom-dropdown__trigger {
  transform: rotate(90deg);
  fill: #9aa6bb;
  width: 18px !important;
  position: relative;
  right: -10px;
}

.work-time {
  padding: 0 10px;
  &__header {
    display: flex;
    &--left {
      flex: 1;
    }
    &--right {
      flex: 1;
    }
  }
  &__body {
    .work-time__profile {
      .work-time__group {
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px dashed #9aa6bb;
        width: 60%;
        &:last-child {
          border-bottom: 0 none;
        }

        .work-time__profile--ava-name {
          display: flex;
          width: 50%;
          margin-top: 20px;
          margin-bottom: 20px;
          .work-time__profile--ava {
            flex: 1;
            img {
              display: block;
              border-radius: 50%;
              height: 60px;
              width: 60px;
              margin: auto;
            }
          }
          .work-time__profile--name {
            flex: 3;
          }
        }
      }
    }
  }
}
</style>
