<template>
  <div class="section__list attestation">
    <d-modal
      :seen="openModal"
      title="Добавить аттестацию"
      class="tmodal"
      @closemodal="openModal = false"
    >
      <d-badge-tabs class="mt-5" v-model="langName" :options="$langPrefixes" />
      <div class="columns">
        <div class="column">
          <div class="mt-4"></div>
          <!-- Департаменты -->
          <p class="mt-4 ml-2"><b>Департамент:</b></p>
          <d-select
            :options="departmentsList"
            class="whitout_close rounded grey-2 grey-border mb-2"
            label="name"
            ml
            v-model="filterForm.department_id"
            :reduce="(item) => item.id"
          />

          <!-- Должности -->
          <p class="mt-4 ml-2"><b>Должность:</b></p>
          <d-select
            :options="positionsList"
            class="whitout_close rounded grey-2 grey-border mb-2"
            label="name"
            ml
            v-model="filterForm.position_id"
            :reduce="(item) => item.id"
          />

          <!-- Сотрудники -->
          <p class="mt-4 ml-2"><b>Сотрудник</b></p>
          <d-select
            :options="employeeList"
            class="whitout_close rounded grey-2 grey-border mb-2"
            label="name"
            ml
            v-model="form.employee"
            :disabled="!filterForm.department_id || !filterForm.position_id"
            :reduce="(item) => item.id"
          />
        </div>
        <div class="column">
          <p class="ml-2 mt-4"><b>Результат аттестации:</b></p>
          <d-input
            type="text"
            v-model="form.result[langName]"
            rounded
            class="grey"
          />

          <p class="ml-2 mt-4"><b>Основание для аттестации:</b></p>
          <d-input
            type="text"
            v-model="form.cause[langName]"
            rounded
            class="grey"
          />

          <p class="ml-2 mt-4"><b>Меры принятые после аттестации:</b></p>
          <d-input
            type="text"
            v-model="form.conclusion[langName]"
            rounded
            class="grey"
          />

          <p class="ml-2"><b>Состав аттестационной комиссии:</b></p>
          <d-input
            type="text"
            v-model="form.commission_team[langName]"
            rounded
            class="grey"
          />
        </div>
      </div>

      <div class="mt-4 mb-2">
        <div
          class="has-text-danger"
          v-for="(error, index) in errors"
          :key="index"
        >
          <em class="is-size-4 mr-2">*</em>{{ error }}
        </div>
      </div>

      <div class="tmodal__btns mt-4 mb-1 columns">
        <div class="column">
          <d-btn
            rounded
            color="is-grey"
            text="Отменить"
            :disabled="loading"
            @click="openModal = false"
          />
        </div>
        <div class="column right">
          <d-btn
            class="add-group-modal--btn"
            color="blue"
            rounded
            text="Создать"
            :loading="loading"
            @click="createAction"
          />
        </div>
      </div>
    </d-modal>
    <!-- top title, search -->
    <div class="columns padding-sm-x mb-0 attestation-header">
      <div class="column pt-0">
        <h4 class="title mb-4">Аттестация</h4>

        <button class="button primary-btn" @click="filterSeen = !filterSeen">
          Фильтр
          <d-icon class="ml-2 right-down" icon="arrow_down1" />
        </button>
      </div>

      <!-- search input -->
      <!-- <div class="column is-one-fifth">
        <d-input
          placeholder="Поиск"
          align-icon="right"
          icon="search"
          icon-width="14"
          :icon-color="iconColor"
          v-model="researchInput"
          @input="research"
        />
      </div> -->
    </div>

    <!-- form search panel -->

    <div class="columns attestation-panel fade-in" v-if="filterSeen">
      <div class="column">
        <d-input
          placeholder="Сотрудники"
          align-icon="right"
          icon="search"
          icon-width="14"
          :icon-color="iconColor"
        />
      </div>
      <div class="column">
        <d-input placeholder="Подразделение" />
      </div>
      <div class="column">
        <d-input placeholder="Дата" />
      </div>
      <div class="column">
        <d-input placeholder="Пункт назначения" />
      </div>
      <div class="column checkboxes">
        <d-checkbox
          text="Проходившие аттестацию"
          text-align="right"
          size="small"
          v-model="checked"
        />
        <d-checkbox
          text="Не проходившие аттестацию"
          text-align="right"
          size="small"
          v-model="checked"
        />
      </div>
    </div>

    <!-- list -->
    <d-lists dashed-header :loading="loading">
      <template #header>
        <div class="columns">
          <div class="column is-5"><span>Ф.И.О</span></div>
          <div class="column is-3"><span>Дата</span></div>
          <div class="column is-3"><span>Результат</span></div>
          <div class="column has-text-centered">
            <d-add-btn @click="openModal = !openModal" />
          </div>
        </div>
      </template>

      <template #content>
        <router-link
          :to="{
            name: 'attestationId',
            params: { id: item.id },
          }"
          v-for="item in list"
          :key="item.id"
        >
          <div class="columns is-vcentered">
            <div class="column is-5">
              <div class="columns is-vcentered">
                <div class="pt-1">
                  <d-avatar
                    cover
                    width="41"
                    height="41"
                    :src="(item.employee && item.employee.photo) || null"
                  />
                </div>
                <div class="column py-0">
                  <div v-if="item.employee">
                    {{
                      item.employee.first_name &&
                      item.employee.first_name[$i18n.locale]
                    }}
                    {{
                      item.employee.middle_name &&
                      item.employee.middle_name[$i18n.locale]
                    }}
                    {{
                      item.employee.first_name &&
                      item.employee.first_name[$i18n.locale]
                    }}
                  </div>
                  <div class="text-gray" v-if="item.employee">
                    {{
                      item.employee.position &&
                      item.employee.position[$i18n.locale]
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-3">
              {{ $moment(item.date).format("DD.MM.YYYY") }}
            </div>
            <div class="column is-3">
              {{ item.result && item.result[$i18n.locale] }}
            </div>
            <div class="column has-text-centered">
              <d-dropdown class="flex-row align-items-center">
                <template #body>
                  <d-icon
                    icon="more"
                    class="custom-dropdown__trigger size-1"
                    @click.prevent="open = !open"
                  />
                </template>
                <template #dropdown-menu>
                  <li @click="deleteAction(item.id)">
                    <a href="javascript:void(0)" class="left">
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
        </router-link>
      </template>
    </d-lists>

    <div class="pagination">
      <d-pagination-input
        @change="
          getList({
            offset: offsetComputed,
            limit: pagination.limit,
          })
        "
        v-model="pagination.page"
        :total="count"
        :limit="pagination.limit"
      />
    </div>
  </div>
</template>

<script>
import variables from "@/assets/scss/base/_variables.scss";

import Lists from "@/components/Lists";
import DAvatar from "@/components/Avatar";

import { mapState, mapActions } from "vuex";
const defaultForm = () => ({
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
});
export default {
  components: {
    "d-lists": Lists,
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-input": () => import("@/components/inputs/input"),
    "d-btn": () => import("@/components/buttons/loaderButton"),
    "d-dropdown": () => import("@/components/Dropdown"),
    "d-checkbox": () => import("@/components/inputs/checkbox"),
    "d-select": () => import("@/components/inputs/select"),
    DAddBtn: () => import("@/components/AddButton"),
    "d-modal": () => import("@/components/Modal"),
    DPaginationInput: () => import("@/components/Pagination-input"),
    DAvatar,
    DBadgeTabs: () => import("@/components/BadgeTabs"),
  },
  data() {
    return {
      iconColor: (variables && variables.grey) || "",
      page: 1,
      checked: false,
      filterSeen: false,
      openModal: false,
      pagination: {
        page: 1,
        limit: 10,
      },
      open: false,
      list: [],
      employeeList: [],
      departmentsList: [],
      positionsList: [],
      form: defaultForm(),

      filterForm: {
        department_id: null,
        position_id: null,
      },

      loading: false,
      langName: "ru",
      errors: [],
    };
  },
  computed: {
    ...mapState({
      count: (state) => state.employeeAttestation.count,
    }),
    offsetComputed() {
      return this.pagination.page < 2
        ? 0
        : this.pagination.page * this.pagination.limit - this.pagination.limit;
    },
  },
  methods: {
    // ...mapActions("employee", ["fetchList"]),
    ...mapActions("catalog", ["get"]),
    ...mapActions("employeeAttestation", [
      "getList",
      "getEmployeeList",
      "createOrUpdate",
      "remove",
    ]),
    callback(arg) {
      console.log("arg", arg);
    },
    isValid() {
      this.errors = [];
      const keysToCheck = ["result", "cause", "conclusion", "commission_team"];

      const r = Object.keys(this.form).some((key) => {
        // console.log(
        //   "key",
        //   key,
        //   this.form[key] && this.form[key][this.langName] || '-'
        // );
        return keysToCheck.includes(key) && !this.form[key][this.langName];
      });

      // console.log("r", r);
      if (r) {
        this.errors = ["Заполните все поля"];
        return false;
      }

      return true;
    },
    createAction() {
      try {
        if (this.form) {
          if (!this.isValid()) {
            this.errors = ["Заполните все поля"];
            return;
          }

          this.loading = true;

          this.createOrUpdate({
            ...this.form,
            date: this.$moment().format("YYYY-MM-DD"),
            result: JSON.stringify(this.form.result),
            cause: JSON.stringify(this.form.cause),
            conclusion: JSON.stringify(this.form.conclusion),
            commission_team: JSON.stringify(this.form.commission_team),
          })
            .then(() => {
              this.loading = false;
              this.openModal = false;
              this.form = defaultForm();
              this.getList({
                offset: this.offsetComputed,
                limit: this.pagination.limit,
              }).then((res) => {
                this.list = res;
              });
            })
            .catch((err) => {
              console.error(err);
              this.loading = false;
              this.openModal = false;
            });
        }
      } catch (err) {
        console.error(err);
        this.form = defaultForm();
      }
    },
    deleteAction(id) {
      try {
        if (id) {
          this.remove(id).then(
            () =>
              (this.list = this.getList({
                offset: this.offsetComputed,
                limit: this.pagination.limit,
              }))
          );
        }
      } catch (err) {
        console.error(err);
      }
    },
    openModalAction() {
      this.openModal = true;
    },

    emitFilter() {
      if (this.filterForm.department_id && this.filterForm.position_id) {
        this.getEmployeeList({
          department_id: this.filterForm.department_id,
          position_id: this.filterForm.position_id,
        }).then((res) => {
          this.employeeList = this.$ArrayNamesTofullName(res || []);
        });
      }
    },
  },
  async mounted() {
    try {
      this.loading = true;
      this.getList({
        offset: this.offsetComputed,
        limit: this.pagination.limit,
      }).then((res) => {
        this.list = res;
        this.loading = false;
      });

      await this.getEmployeeList().then((res) => {
        this.employeeList = this.$ArrayNamesTofullName(res || []);
      });

      await this.get("department").then((res) => (this.departmentsList = res));
      await this.get("position").then((res) => (this.positionsList = res));
    } catch (err) {
      console.error(err);
      return;
    }
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/components/sections";

@keyframes fadeIn {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.left {
  display: flex;
  justify-content: flex-start;
}

.right {
  display: flex;
  justify-content: flex-end;
}

.fade-in {
  animation: 0.2s fadeIn ease-in;
}

.fade-out {
  animation: 0.2s fadeIn ease-in reverse;
}

.attestation {
  display: flex;
  flex-direction: column;
  &-panel {
    align-items: center;
    padding-left: 12px;
    padding-right: 12px;

    .checkboxes {
      .field:last-child {
        margin-top: 5px;
      }
    }
  }
  .rotate-minus-90 {
    transform: rotate(0deg) !important;
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

  svg.check-btn {
    width: 12px;
    fill: green;
    margin-right: 5px;
  }
  .pagination {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
  }
}

.company-structure-row {
  max-height: 400px;
}
</style>
