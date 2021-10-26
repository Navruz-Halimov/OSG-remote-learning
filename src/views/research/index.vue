<template>
  <div class="section__list attestation">
    <!-- top title, search -->
    <div class="columns padding-sm-x mb-0 attestation-header">
      <div class="column pt-0">
        <h4 class="title">Общий поиск</h4>
      </div>

      <!-- search input -->
      <div class="column to-right is-flex">
        <d-input
          placeholder="Поиск"
          align-icon="right"
          icon="search"
          icon-width="14"
          :icon-color="iconColor"
          v-model="researchInput"
          @input="initResearch"
        />
      </div>
    </div>
    <!-- list -->
    <d-lists :loading="loading" dashed-header>
      <template #header>
        <div class="columns">
          <div class="column is-4"><span class="ml-4">Название</span></div>
          <div class="column is-4"><span>Описание</span></div>
          <div class="column is-4"><span>Контент</span></div>
        </div>
      </template>

      <template #content>
        <div v-if="!list.length && !loading">
          <center><div class="is-size-5 mt-3">Пусто</div></center>
        </div>
        <router-link to="/" v-for="item in list" :key="item.id">
          <div class="columns is-vcentered">
            <div class="column py-3 is-4">
              <div class="columns">
                <div class="column py-0">
                  <div>{{ item.title }}</div>
                </div>
              </div>
            </div>
            <div class="column py-3 is-4">{{ item.description }}</div>
            <div class="column py-3 is-4">{{ item.content[$i18n.locale] }}</div>
          </div>
        </router-link>
      </template>
    </d-lists>
    <div class="pagination">
      <d-pagination-input
        @change="researchAction"
        v-model="pagination.page"
        :total="count"
        :limit="pagination.limit"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import variables from "@/assets/scss/base/_variables.scss";

import Lists from "@/components/Lists";

import debounce from "lodash/debounce";

export default {
  components: {
    "d-lists": Lists,
    "d-input": () => import("@/components/inputs/input"),
    DPaginationInput: () => import("@/components/Pagination-input"),
  },
  data() {
    return {
      iconColor: (variables && variables.grey) || "",
      page: 1,
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
  watch: {
    $route: {
      handler: "researchInit",
      immediate: true,
    },
  },
  computed: {
    ...mapState({
      count: (state) => state.research.count,
    }),
    offsetComputed() {
      return this.pagination.page < 2
        ? 0
        : this.pagination.page * this.pagination.limit - this.pagination.limit;
    },
  },
  methods: {
    ...mapActions("research", ["getList"]),
    researchAction: debounce(function () {
      if (this.$route.query.q) {
        this.getList({
          q: this.$route.query.q,
          params: {
            offset: this.offsetComputed,
            limit: this.pagination.limit,
          },
        })
          .then((res) => {
            this.list = res || [];
            this.loading = false;
          })
          .catch((err) => {
            console.error(err);
            this.loading = false;
          });
        return;
      }

      this.loading = false;
    }, 600),
    researchInit() {
      this.loading = true;
      this.list = [];
      this.researchAction();
    },
    initResearch() {
      this.$router.push({ query: { q: this.researchInput } });
    },
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
