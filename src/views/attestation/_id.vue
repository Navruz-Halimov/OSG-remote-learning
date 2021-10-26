<template>
  <div class="columns attestation-id padding-sm-x">
    <d-modal
      :seen="openModal"
      title="Изменение аттестации"
      class="tmodal"
      @closemodal="openModal = false"
    >
      <d-badge-tabs v-model="langName" :options="$langPrefixes" />

      <p class="mt-2 ml-2"><b>Результат аттестации:</b></p>
      <div class="columns" v-if="detail.result">
        <div class="column">
          <!-- <p class="ml-2">RU</p> -->
          <d-input
            type="text"
            v-model="detail.result[langName]"
            :key="langName"
            rounded
            placeholder="Ставка"
            class="grey"
          />
        </div>
        <!-- <div class="column">
          <p class="ml-2">UZ</p>
          <d-input
            type="text"
            v-model="detail.result[$i18n.locale]"
            rounded
            placeholder="Ставка"
            class="grey"
          />
        </div> -->
      </div>
      <p class="ml-2"><b>Основание для аттестации:</b></p>
      <div class="columns" v-if="detail.cause">
        <div class="column">
          <!-- <p class="ml-2">RU</p> -->
          <d-input
            type="text"
            v-model="detail.cause[langName]"
            :key="langName"
            rounded
            placeholder="Ставка"
            class="grey"
          />
        </div>
        <!-- <div class="column">
          <p class="ml-2">UZ</p>
          <d-input
            type="text"
            v-model="detail.cause[$i18n.locale]"
            rounded
            placeholder="Ставка"
            class="grey"
          />
        </div> -->
      </div>
      <p class="ml-2"><b>Меры принятые после аттестации:</b></p>
      <div class="columns" v-if="detail.conclusion">
        <div class="column">
          <!-- <p class="ml-2">RU</p> -->
          <d-input
            type="text"
            v-model="detail.conclusion[langName]"
            :key="langName"
            rounded
            placeholder="Ставка"
            class="grey"
          />
        </div>
        <!-- <div class="column">
          <p class="ml-2">UZ</p>
          <d-input
            type="text"
            v-model="detail.conclusion[$i18n.locale]"
            rounded
            placeholder="Ставка"
            class="grey"
          />
        </div> -->
      </div>
      <p class="ml-2"><b>Состав аттестационной комиссии:</b></p>
      <div class="columns" v-if="detail.commission_team">
        <div class="column">
          <!-- <p class="ml-2">RU</p> -->
          <d-input
            type="text"
            v-model="detail.commission_team[langName]"
            :key="langName"
            rounded
            placeholder="Ставка"
            class="grey"
          />
        </div>
        <!-- <div class="column">
          <p class="ml-2">UZ</p>
          <d-input
            type="text"
            v-model="detail.commission_team[$i18n.locale]"
            rounded
            placeholder="Ставка"
            class="grey"
          />
        </div> -->
      </div>
      <div class="tmodal__btns mt-4 mb-1 columns">
        <div class="column">
          <d-btn
            rounded
            color="is-grey"
            text="Отменить"
            @click="openModal = false"
            :disabled="modalPending"
          />
        </div>
        <div class="column right">
          <d-btn
            class="add-group-modal--btn"
            color="blue"
            rounded
            text="Сохранить"
            @click="updateAction"
            :loading="modalPending"
          />
        </div>
      </div>
    </d-modal>

    <div class="column is-8">
      <div class="section__list attestation-id-left">
        <Loading-progress v-if="loading" />
        <template v-if="!loading && detail && detail.employee">
          <div class="columns padding-sm-x">
            <div class="column">
              <button @click="toBack" class="primary-btn button back-button">
                <d-icon class="left-arrow" icon="left-arrow" />
                Назад
              </button>
              <h4 class="title">Сотрудники</h4>
              <h5 class="secondary-title">Данные о сотруднике</h5>
              <div class="columns py-3 profile-detail">
                <div class="pt-1 pl-3">
                  <d-avatar
                    cover
                    :src="(detail.employee || {}).photo || null"
                    height="64"
                    width="64"
                  />
                </div>
                <div class="column py-0">
                  <h3 class="mb-0">
                    {{
                      ((detail.employee || {}).first_name || {})[$i18n.locale]
                    }}
                    {{
                      ((detail.employee || {}).last_name || {})[$i18n.locale]
                    }}
                    {{
                      ((detail.employee || {}).middle_name || {})[$i18n.locale]
                    }}
                  </h3>
                  <div class="text-gray">
                    ID: {{ (detail.employee || {}).register_number || "" }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column">
              <d-dropdown>
                <template #body>
                  <d-icon
                    icon="more"
                    class="custom-dropdown__trigger"
                    @click="open = !open"
                  />
                </template>
                <template #dropdown-menu>
                  <li @click="openModalAction">
                    <a>
                      <d-icon
                        icon="teacher-pen"
                        class="rotate-minus-90 mr-4"
                      ></d-icon>
                      Изменить
                    </a>
                  </li>

                  <li @click="deleteAction">
                    <a>
                      <d-icon
                        icon="delete"
                        class="rotate-minus-90 mr-4"
                      ></d-icon>
                      Удалить
                    </a>
                  </li>
                </template>
              </d-dropdown>
            </div>
          </div>
          <div class="columns padding-sm-x attestation-id-left__body">
            <div class="column is-4">
              <div class="py-2">Подразделение:</div>
              <div class="py-2">Должность:</div>
            </div>
            <div class="column">
              <div class="py-2">
                {{ ((detail.employee || {}).department || {})[$i18n.locale] }}
              </div>
              <div class="py-2">
                {{ ((detail.employee || {}).position || {})[$i18n.locale] }}
              </div>
            </div>
          </div>
          <h5 class="secondary-title padding-sm-x">Данные об аттестации</h5>
          <div class="columns padding-sm-x attestation-id-left__body">
            <div class="column is-4">
              <div class="py-2">Дата:</div>
              <div class="py-2">Основание для аттестации:</div>
              <div class="py-2">Результат аттестации:</div>
              <div class="py-2">Меры принятые после аттестации:</div>
            </div>
            <div class="column">
              <div class="py-2">
                {{ $moment(detail.date).format("DD.MM.YYYY") }}
              </div>
              <div class="py-2">{{ (detail.cause || {})[$i18n.locale] }}</div>
              <div class="py-2">{{ (detail.result || {})[$i18n.locale] }}</div>
              <div class="py-2">
                {{ (detail.conclusion || {})[$i18n.locale] }}
              </div>
            </div>
          </div>
          <h5 class="secondary-title padding-sm-x">
            Состав аттестационной комиссии:
          </h5>
          <div class="columns py-1 profile-detail padding-sm-x">
            <div class="column">{{ (detail.commission_team || {})[$i18n.locale] }}</div>
          </div>
        </template>
      </div>
    </div>
    <div class="column is-4">
      <div class="section__list attestation-id-right">
        <h4 class="title">Документы</h4>
        <center v-if="detail.employeeattestationdocument_set">
          <h4 class="mt-5">Пусто</h4>
        </center>
        <div
          v-else
          class="columns py-2 profile-detail is-vcentered padding-sm-x"
          v-for="item in detail.employeeattestationdocument_set"
          :key="item.id"
        >
          <div class="icon-container">
            <img :src="require('@/assets/icons/word.png')" alt="" />
          </div>
          <div class="column py-0">
            <div>{{ item.document.split("/").pop() }}</div>
            <div class="text-gray time-div">
              <d-icon icon="time" class="icon-clock grey" />
              {{ $moment(item.created_at).format("HH:mm DD.MM.YYYY") }}
              <span class="mx-2">|</span>
              <a
                :href="item.document"
                class="download-link"
                download="download"
              >
                Скачать &nbsp;
                <d-icon icon="download" class="size-1 ml-1" />
              </a>
            </div>
          </div>
          <d-dropdown>
            <template #body>
              <d-icon
                icon="more"
                class="custom-dropdown__trigger size-1"
                @click="open = !open"
              />
            </template>
            <template #dropdown-menu>
              <li @click="deleteDocAction(item.id)" class="pb-2">
                <a>
                  <d-icon
                    icon="delete"
                    class="rotate-minus-90 width-18 mx-4"
                  ></d-icon>
                  Удалить
                </a>
              </li>
            </template>
          </d-dropdown>
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
    "d-modal": () => import("@/components/Modal"),
    "d-avatar": () => import("@/components/Avatar"),
    "d-btn": () => import("@/components/buttons/loaderButton"),
    "d-input": () => import("@/components/inputs/input"),
    DBadgeTabs: () => import("@/components/BadgeTabs"),
    LoadingProgress: () => import("@/components/Loading-progress"),
  },

  watch: {
    $route: {
      handler: "fetchData",
      immediate: true,
    },
  },

  data: () => ({
    detail: {},
    openModal: false,
    open: false,
    form: {
      id: null,
      date: "",
      result: {
        ru: "",
        uz: "",
      },
      cause: {
        ru: "",
        uz: "",
      },
      conclusion: {
        ru: "",
        uz: "",
      },
      employee: null,
      commission_team: {
        ru: "",
        uz: "",
      },
    },
    langName: "ru",

    modalPending: false,
    loading: false,
  }),
  methods: {
    ...mapActions("employeeAttestation", [
      "getDetail",
      "createOrUpdate",
      "removeDoc",
      "remove",
    ]),
    updateAction() {
      try {
        this.form.id = this.detail.id;
        this.form.date = this.detail.date;
        this.form.result = JSON.stringify(this.detail.result);
        this.form.employee = this.detail.employee.id;
        this.form.cause = JSON.stringify(this.detail.cause);
        this.form.conclusion = JSON.stringify(this.detail.conclusion);
        this.form.commission_team = JSON.stringify(this.detail.commission_team);

        if (this.form && this.form.id) {
          this.modalPending = true;
          this.createOrUpdate(this.form)
            .then(() => {
              this.openModal = false;
              this.modalPending = false;
            })
            .catch(() => {
              this.openModal = false;
              this.modalPending = false;
            });
        }
      } catch (err) {
        console.error(err);
      }
    },
    deleteAction() {
      try {
        if (this.$route.params.id) {
          this.remove(this.$route.params.id).then(() => {
            this.$router.push({ name: "attestation" });
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    deleteDocAction(id) {
      try {
        if (id) {
          this.removeDoc(id).then(() =>
            this.getList({
              offset: this.offsetComputed,
              limit: this.pagination.limit,
            }).then((res) => {
              this.detail = res;
            })
          );
        }
      } catch (err) {
        console.error(err);
      }
    },
    openModalAction() {
      this.openModal = true;
    },

    async fetchData() {
      try {
        this.loading = true;
        this.detail = await this.getDetail(this.$route.params.id);
        this.loading = false;

        // console.log(this.detail);
      } catch (err) {
        console.error(err);
        return;
      }
    },
  },
};
</script>

<style lang="scss">
.rotate-minus-90 {
  transform: rotate(0deg) !important;
}

.width-18 {
  width: 18px !important;
}

.right {
  display: flex;
  justify-content: flex-end;
}
.left {
  display: flex;
  justify-content: flex-start;
}

.attestation-id {
  width: 100%;

  &-left {
    height: 100%;

    &__body {
      border-bottom: 1px dashed $lightgrey;
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
      color: #9aa6bb;
      margin-top: 20px;
      font-weight: 400;
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

  &-right {
    height: 100%;
    box-shadow: 0px 3px 10px #a1a1a124;
    font-size: 15px;

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

    .icon-clock {
      width: 16px;
    }
    .icon-more {
      width: 20px;
      transform: rotate(90deg);

      fill: $lightgrey;
    }
  }
}
</style>
