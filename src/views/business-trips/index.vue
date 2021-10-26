<template>
  <div class="section__list businesstrip">
    <!-- top title, search -->
    <div class="columns padding-sm-x mb-0 businesstrip-header">
      <div class="column pt-0">
        <h4 class="title mb-4">Командировки</h4>

        <button class="button primary-btn">
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
        />
      </div> -->
    </div>

    <!-- detail search panel -->

    <!-- <div class="columns businesstrip-panel">
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
          text="Сотрудники в командировках"
          text-align="left"
          size="small"
          v-model="checked"
        />
      </div>
    </div> -->

    <!-- list -->
    <d-lists dashed-header :loading="loading">
      <template #header>
        <div class="columns">
          <div class="column is-5"><span>Ф.И.О</span></div>
          <div class="column is-3"><span>Подразделение</span></div>
          <div class="column is-3"><span>Цель командировки</span></div>
          <div class="column has-text-centered">
            <router-link :to="{ name: 'businessTripsCreate' }">
              <d-add-btn />
            </router-link>
          </div>
        </div>
      </template>

      <template #content>
        <router-link
          :to="{ name: 'businessTripsId', params: { id: item.id } }"
          v-for="item in list"
          :key="item.id"
        >
          <div class="columns is-vcentered">
            <div class="column is-5">
              <div class="columns is-vcentered" v-if="item && item.employee">
                <div class="pt-1" style="align-self: center">
                  <d-avatar
                    cover
                    width="41"
                    height="41"
                    :src="item.employee.photo || null"
                  />
                </div>
                <div class="column py-0">
                  <div>
                    {{
                      (item.employee.last_name &&
                        item.employee.last_name[$i18n.locale]) ||
                      ""
                    }}
                    {{
                      (item.employee.first_name &&
                        item.employee.first_name[$i18n.locale]) ||
                      ""
                    }}
                    {{
                      (item.employee.middle_name &&
                        item.employee.middle_name[$i18n.locale]) ||
                      ""
                    }}
                  </div>
                  <div class="text-gray">
                    {{
                      item.employee.current_workplace &&
                      item.employee.current_workplace[$i18n.locale]
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-3">
              {{
                item.employee.current_department &&
                item.employee.current_department[$i18n.locale]
              }}
            </div>
            <div class="column is-3">
              {{ item.trip_cause && item.trip_cause[$i18n.locale] }}
            </div>
            <!-- <div class="column has-text-centered">
              <d-dropdown>
                  <template #body>
                    <div class="icon-rotate-90">
                      <d-icon class="sm-icon icon-btn icon-more-btn" icon="more" />
                    </div>relative
                  </template>
                  <template #dropdown-menu>
                    <li>
                      <router-link to="#">
                        <d-icon icon="delete"></d-icon>
                        Удалить
                      </router-link>
                    </li>
                  </template>
              </d-dropdown>
            </div> -->
          </div>
        </router-link>
      </template>
    </d-lists>
    <d-pagination-input v-model="page" right :limit="10" :total="count" />
  </div>
</template>

<script>
import variables from "@/assets/scss/base/_variables.scss";

import Lists from "@/components/Lists";

export default {
  components: {
    "d-lists": Lists,
    "d-icon": () => import("@/components/icons/iconWrapper"),
    // "d-input": () => import("@/components/inputs/input"),
    // "d-checkbox": () => import("@/components/inputs/checkbox"),
    // "d-dropdown": () => import("@/components/Dropdown"),
    // "d-button": () => import("@/components/buttons/loaderButton"),
    // "d-select": () => import("@/components/inputs/select"),
    // "d-ghost-loader": () => import('@/components/loaders/ghostLoader'),
    DAddBtn: () => import("@/components/AddButton"),
    DPaginationInput: () => import("@/components/Pagination-input"),
    DAvatar: () => import("@/components/Avatar"),
    // DModal: () => import('@/components/Modal'),
    // DDateSelector: () => import('@/components/inputs/date-selector'),
  },
  data() {
    return {
      // langOptions: ["ru", "uz"],
      iconColor: (variables && variables.grey) || "",
      page: 1,
      count: 0,
      list: [],

      checked: false,
      loading: false,
      requesting: false,

      openModal: false,

      form: {
        destination_point: {
          ru: "",
          uz: "",
        },
        trip_cause: {
          ru: "",
          uz: "",
        },
        trip_start: "",
        trip_end: "",
        host: {
          ru: "",
          uz: "",
        },
        employee: null,
        order: null,
      },
    };
  },
  mounted() {
    this.fetchList();
  },
  methods: {
    fetchList() {
      this.loading = true;
      this.$store
        .dispatch("businesstrip/fetchList")
        .then((res) => {
          this.list = (res && (res.data || {}).results) || [];
          this.count = (res && (res.data || {}).count) || 0;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.error("fetchList", err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/components/sections";

.businesstrip {
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

  svg.check-btn {
    width: 12px;
    fill: green;
    margin-right: 5px;
  }

  .d-pagination {
    margin-top: auto !important;
  }
}
.lang-row {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  &::after {
    content: "";
    position: absolute;
    top: 16px;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px dashed $lightgrey;
    z-index: -1;
  }

  &__item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;

    svg {
      fill: $blue;
      width: 32px;
      height: 32px;
      background-color: white;
    }

    &__circle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background-color: #e4e9f1;
      border-radius: 50%;
      text-align: center;
      cursor: pointer;

      // &.active {

      // }
    }

    &__code {
      margin-top: 5px;
      color: #9aa6bb;
      text-transform: capitalize;
    }
  }
}
</style>