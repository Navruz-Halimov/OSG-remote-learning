<template>
  <div class="section__list attestation flex-column">
    <!-- <d-modal
      :seen="openModal"
      title="Добавить аттестацию"
      class="tmodal"
      @closemodal="openModal = false"
    >
      <d-badge-tabs class="mt-5" v-model="langName" :options="$langPrefixes" />
      <div class="columns">
        <div class="column">
          <div class="mt-4"></div>
           Департаменты 
          <p class="mt-4 ml-2"><b>Департамент:</b></p>
          <d-select
            :options="departmentsList"
            class="whitout_close rounded grey-2 grey-border mb-2"
            label="name"
            ml
            v-model="filterForm.department_id"
            :reduce="(item) => item.id"
          />

           Должности 
          <p class="mt-4 ml-2"><b>Должность:</b></p>
          <d-select
            :options="positionsList"
            class="whitout_close rounded grey-2 grey-border mb-2"
            label="name"
            ml
            v-model="filterForm.position_id"
            :reduce="(item) => item.id"
          />

           Сотрудники
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
    </d-modal> -->
    <!-- top title, search -->
    <div class="columns padding-sm-x mb-0 attestation-header">
      <div class="column pt-0">
        <h4 class="title">Приказы</h4>

        <button class="button primary-btn">
          Фильтр
          <d-icon class="ml-2 right-down" icon="arrow_down1" />
        </button>
      </div>

      <!-- search input -->
      <div class="column to-right is-flex">
        <button class="button primary-btn">Отчет по ротации</button>
        <!-- <d-input
          placeholder="Поиск"
          align-icon="right"
          icon="search"
          icon-width="14"
          :icon-color="iconColor"
        /> -->
      </div>
    </div>

    <!-- list -->
    <d-lists dashed-header class="flex-1" :loading="loading">
      <template #header>
        <div class="columns">
          <div class="column is-5"><span class="ml-4">Создатель</span></div>
          <div class="column is-3"><span>Номер приказа</span></div>
          <div class="column is-3"><span>Тип приказа</span></div>
          <div class="column has-text-centered">
            <router-link :to="{ name: 'ordersCreate' }"
              ><d-add-btn
            /></router-link>
          </div>
        </div>
      </template>

      <template #content>
        <router-link
          :to="$route.path + `/${order.id}`"
          v-for="order in results"
          :key="order.id"
        >
          <div class="columns is-vcentered">
            <div class="column is-5">
              <div class="columns is-vcentered">
                <div class="pt-1">
                  <d-avatar
                    cover
                    width="41"
                    height="41"
                    :src="order.employee.photo"
                  />
                </div>
                <div class="column py-0">
                  <div>
                    {{
                      ((order.employee || {}).first_name || {})[$i18n.locale]
                    }}
                    {{ ((order.employee || {}).last_name || {})[$i18n.locale] }}
                    {{
                      ((order.employee || {}).middle_name || {})[$i18n.locale]
                    }}
                  </div>
                  <div class="text-gray">
                    {{
                      ((order.employee || {}).current_workplace || {})[
                        $i18n.locale
                      ]
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-3">{{ order.order_number }}</div>
            <div class="column is-3">{{ order.order_type }}</div>
            <div class="column has-text-centered">
              <div class="icon-rotate-90">
                <d-icon class="sm-icon icon-btn icon-more-btn" icon="more" />
              </div>
            </div>
          </div>
        </router-link>
      </template>
    </d-lists>

    <d-pagination-input
      right
      v-model="page"
      @change="fetchData"
      :limit="$_perPage"
      :total="count"
    />
  </div>
</template>

<script>
import variables from "@/assets/scss/base/_variables.scss";
import paginationMixin from "@/mixins/pagination.mixin";

import Lists from "@/components/Lists";
import DAvatar from "@/components/Avatar";
import { mapActions } from "vuex";
// const defaultForm = () => ({
//   id: null,
//   date: "",
//   result: {
//     ru: "",
//     uz: "",
//   },
//   cause: {
//     ru: "",
//     uz: "",
//   },
//   conclusion: {
//     ru: "",
//     uz: "",
//   },
//   employee: null,
//   commission_team: {
//     ru: "",
//     uz: "",
//   },
// });
export default {
  mixins: [paginationMixin],
  components: {
    "d-lists": Lists,
    "d-icon": () => import("@/components/icons/iconWrapper"),
    // "d-btn": () => import("@/components/buttons/loaderButton"),
    // "d-modal": () => import("@/components/Modal"),
    // DBadgeTabs: () => import("@/components/BadgeTabs"),
    // "d-input": () => import("@/components/inputs/input"),
    DAddBtn: () => import("@/components/AddButton"),
    DPaginationInput: () => import("@/components/Pagination-input"),
    DAvatar,
  },
  data() {
    return {
      iconColor: (variables && variables.grey) || "",
      checked: false,
      openModal: false,
      loading: false,
    };
  },

  methods: {
    ...mapActions("employee", ["fetchOrder"]),
    openModalAction() {
      this.openModal = true;
    },
    fetchData() {
      this.loading = true;
      return this.fetchOrder({
        limit: this.$_perPage,
        offset: this.$_pageOffset,
      })
        .then((res) => {
          if (res && res.data) {
            // console.log(res.data.results);
            this.results = res.data.results || [];
            this.count = res.data.count || 0;
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/components/sections";

.attestation {
  &-header {
    .to-right {
      justify-content: flex-end;

      button.button.is-link.is-rounded.custom-button {
        margin-right: 20px;
      }
    }
  }
}
</style>
