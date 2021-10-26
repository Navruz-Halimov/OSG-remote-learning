<template>
  <div class="section__list attestation flex-column">
    <!-- top title, search -->
    <div class="columns padding-sm-x mb-0 attestation-header">
      <div class="column pt-0">
        <h4 class="title">Отпуска</h4>
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

    <!-- list -->
    <d-lists class="flex-1" :loading="loading" dashed-header>
      <template #header>
        <div class="columns mx-0">
          <div class="column is-4"><span>Сотрудник</span></div>
          <div class="column is-4"><span>Тип отпуска</span></div>
          <div class="column is-3"><span>Дата</span></div>
          <div class="column has-text-centered">
            <d-add-btn @click="$router.push({ name: 'holidaysCreate' })" />
          </div>
        </div>
      </template>

      <template #content>
        <router-link
          :to="{
            name: 'holidaysId',
            params: {
              id: item.id,
            },
          }"
          v-for="item in results"
          :key="item.id"
        >
          <div class="columns mx-0 is-vcentered">
            <div class="column is-4">
              <div class="columns is-vcentered">
                <div class="flex-row align-items-center">
                  <d-avatar
                    cover
                    width="41"
                    height="41"
                    :src="item.employee.photo"
                  />
                </div>
                <div class="column py-0">
                  <div v-if="item.employee">
                    {{
                      item.employee &&
                      item.employee.first_name &&
                      item.employee.first_name[$i18n.locale]
                    }}
                    {{
                      item.employee &&
                      item.employee.last_name &&
                      item.employee.last_name[$i18n.locale]
                    }}
                    {{
                      item.employee &&
                      item.employee.middle_name &&
                      item.employee.middle_name[$i18n.locale]
                    }}
                  </div>
                  <div
                    class="text-gray"
                    v-if="item.employee && item.employee.current_workplace && item.employee.current_workplace[$i18n.locale]"
                  >
                    {{ item.employee.current_workplace[$i18n.locale] }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-4">
              {{
                item.vacation_type &&
                item.vacation_type.name &&
                item.vacation_type.name[$i18n.locale]
              }}
            </div>

            <div class="column is-3">
              {{ $moment(item.date_from).format("DD.MM.YYYY") }} -
              {{ $moment(item.date_to).format("DD.MM.YYYY") }}
            </div>
            <div class="column has-text-centered" @click.prevent="() => {}">
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
      :limit="$_perPage"
      @change="fetchData"
      :total="count"
    />
  </div>
</template>

<script>
import variables from "@/assets/scss/base/_variables.scss";

import Lists from "@/components/Lists";
import DAvatar from "@/components/Avatar";
// import DTabsUnderline from "@/components/TabsUnderline.vue";
// import DTabsUnderlineItem from "@/components/TabsUnderlineItem.vue";
import paginationProps from "@/mixins/pagination.mixin";

import { mapActions } from "vuex";

export default {
  mixins: [paginationProps],

  components: {
    "d-lists": Lists,
    "d-icon": () => import("@/components/icons/iconWrapper"),
    // "d-input": () => import("@/components/inputs/input"),
    DAddBtn: () => import("@/components/AddButton"),
    DPaginationInput: () => import("@/components/Pagination-input"),
    DAvatar,
    // DTabsUnderline,
    // DTabsUnderlineItem,
  },

  data() {
    return {
      iconColor: (variables && variables.grey) || "",
      checked: false,
      loading: false,
    };
  },

  methods: {
    ...mapActions("employeeVacation", ["fetchList"]),
    callback(arg) {
      console.log("arg", arg);
    },

    fetchData() {
      this.loading = true;
      return this.fetchList({
        limit: this.$_perPage,
        offset: this.$_pageOffset,
      })
        .then((res) => {
          if (res && res.data) {
            Object.keys(res.data).forEach((key) => {
              if (key in this) {
                this[key] = res.data[key];
              }
            });
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.error(err);
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
}
</style>