<template>
  <div class="section__list attestation">
    <!-- top title, search -->
    <div class="columns padding-sm-x mb-0 attestation-header">
      <div class="column pt-0">
        <h4 class="title">Логирование</h4>
      </div>
    </div>
    <!-- list -->
    <d-lists :loading="loading" dashed-header>
      <template #header>
        <div class="columns">
          <div class="column is-4"><span class="ml-4">Название</span></div>
          <div class="column"><span>Изменено</span></div>
          <div class="column"><span>Дата</span></div>
          <div class="column"><span>Действия</span></div>
          <div class="column"><span>Информация</span></div>
        </div>
      </template>

      <template #content>
        <router-link to="/" v-for="item in list" :key="item.id">
          <div class="columns">
            <div class="column py-3 is-4">
              {{ item.object_repr }}
            </div>
            <div class="column py-3">
              {{ (item.changed_fields || {})[$i18n.locale] }}
            </div>
            <div class="column py-3">
              {{ $moment(item.datetime).format("HH:mm YYYY-MM-DD") }}
            </div>
            <div class="column py-3">
              {{
                item.event_type == 1
                  ? "Создание"
                  : item.event_type == 2
                  ? "Изменение"
                  : item.event_type == 3
                  ? "Удаление"
                  : item.event_type == 4
                  ? "Изменение взаим-зи"
                  : item.event_type == 5
                  ? "Изменение обратной вз-зи"
                  : ""
              }}
            </div>
            <div class="column py-3">{{ item.user_info }}</div>
          </div>
        </router-link>
      </template>
    </d-lists>
    <div class="pagination">
      <d-pagination-input
        @change="fetchList"
        v-model="pagination.page"
        :total="count"
        :loading="loading"
        :limit="pagination.limit"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import variables from "@/assets/scss/base/_variables.scss";

import Lists from "@/components/Lists";

export default {
  components: {
    "d-lists": Lists,
    // "d-input": () => import("@/components/inputs/input"),
    DPaginationInput: () => import("@/components/Pagination-input"),
  },
  data() {
    return {
      iconColor: (variables && variables.grey) || "",
      // page: 1,
      checked: false,
      list: [],
      researchInput: "",
      loading: false,
      pagination: {
        page: 1,
        limit: 10,
      },
    };
  },
  computed: {
    ...mapState({
      count: (state) => state.logging.count,
    }),
    offsetComputed() {
      return this.pagination.page < 2
        ? 0
        : this.pagination.page * this.pagination.limit - this.pagination.limit;
    },
  },
  methods: {
    ...mapActions("logging", ["getList"]),
    fetchList() {
      this.loading = true;
      this.getList({
        offset: this.offsetComputed,
        limit: this.pagination.limit,
      })
        .then((res) => {
          this.list = res;
          this.loading = false;
        })
        .catch((err) => console.error(err));
    },
  },
  mounted() {
    try {
      this.fetchList();
    } catch (err) {
      console.error(err);
    }
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/components/sections";

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.attestation {
  display: flex;
  flex-direction: column;
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
