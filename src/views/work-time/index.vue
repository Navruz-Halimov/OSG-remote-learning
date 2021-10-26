<template>
  <div class="section__list worktime">
    <!-- top title, search -->
    <div class="columns padding-sm-x mb-0">
      <div class="column pt-0">
        <h4 class="title mb-4">Учет рабочего времени</h4>

        <button class="button primary-btn">
          Фильтр
          <d-icon class="ml-2 right-down" icon="arrow_down1" />
        </button>
      </div>

      <!-- search input -->
      <div class="column is-3 pb-0">
        <!--        <d-input-->
        <!--          size="small"-->
        <!--          placeholder="Поиск"-->
        <!--          align-icon="right"-->
        <!--          icon="search"-->
        <!--          icon-width="14"-->
        <!--          :icon-color="iconColor"-->
        <!--          type="text"-->
        <!--          v-model="search"-->
        <!--        />-->
        <div class="report-button">
          <button class="button primary-btn mt-3">
            Отчеты
          </button>
        </div>
      </div>
    </div>

    <!-- list -->
    <d-lists dashed-header :loading="loading">
      <template #header>
        <div class="columns">
          <div class="column is-5"><span>Сотрудник</span></div>
          <div class="column is-3"><span>Статус</span></div>
          <div class="column is-3"><span>Дата и время входа/выхода</span></div>
          <div class="column has-text-centered"></div>
        </div>
      </template>

      <template #content>
        <router-link
          :to="{ name: 'workTimeId', params: { id: item.id } }"
          v-for="item in list"
          :key="item.id"
        >
          <div class="columns is-vcentered">
            <div class="column is-5">
              <div class="columns">
                <div class="pt-1">
                  <d-avatar cover width="41" height="41" :src="item.photo" />
                </div>
                <div class="column py-0">
                  <div>
                    {{ name(item) }}
                  </div>
                  <div class="text-gray">
                    {{
                      item.position !== null ? item.position[$i18n.locale] : ""
                    }}
                  </div>
                </div>
              </div>
            </div>
            <div class="column is-3 red" :class="{ green: item.status }">
              {{ item.status ? "Вход" : "Выход" }}
            </div>
            <div class="column is-3">
              {{
                item.date !== null
                  ? $moment(item.date).format("HH:mm DD.MM.YYYY")
                  : "Неизвестно"
              }}
            </div>
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
      @change="turnPage"
      v-model="pagination.page"
      :total="count"
      :loading="loading"
      :limit="pagination.limit"
    />
  </div>
</template>

<script>
import variables from "@/assets/scss/base/_variables.scss";

import Lists from "@/components/Lists";
import DAvatar from "@/components/Avatar";
import { mapActions } from "vuex";
export default {
  components: {
    "d-lists": Lists,
    "d-icon": () => import("@/components/icons/iconWrapper"),
    // "d-input": () => import("@/components/inputs/input"),
    DPaginationInput: () => import("@/components/Pagination-input"),
    DAvatar
  },
  data() {
    return {
      iconColor: (variables && variables.grey) || "",
      pagination: {
        page: 1,
        limit: 10
      },
      loading: false,
      list: [],
      count: null
    };
  },
  computed: {
    offsetComputed() {
      return this.pagination.page < 2
        ? 0
        : this.pagination.page * this.pagination.limit - this.pagination.limit;
    },
    name() {
      return function(item) {
        let name = "";
        if (
          item.first_name[this.$i18n.locale] ||
          item.last_name[this.$i18n.locale] ||
          item.middle_name[this.$i18n.locale]
        ) {
          name = `${item.first_name[this.$i18n.locale]}
          ${item.last_name[this.$i18n.locale]} 
          ${item.middle_name[this.$i18n.locale]}`;
        }

        return name || "Не заполнено";
      };
    }
  },
  methods: {
    ...mapActions("workTime", ["getListEmp"]),
    turnPage() {
      this.loading = true;
      this.getListEmp({
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
    this.loading = true;
    this.getListEmp({
      offset: this.offsetComputed,
      limit: this.pagination.limit
    }).then(res => {
      if (res && res.data) {
        this.list = res.data.results;
        this.count = res.data.count;
        this.loading = false;
      }
    });
  }
};
</script>

<style lang="scss">
.report-button {
  display: flex;
  justify-content: flex-end;
}
.worktime {
  display: flex;
  flex-direction: column;
  .red {
    color: $lred;
  }
  .green {
    color: $green;
  }
  .field {
    .icon {
      height: 100%;
    }
  }
  .d-pagination {
    margin-top: auto !important;
  }
}

@import "~@/assets/scss/components/sections";
</style>
