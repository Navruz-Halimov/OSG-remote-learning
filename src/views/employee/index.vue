<template>
  <div class="section__list">
    <!-- top title, search -->
    <div class="columns padding-sm-x mb-0">
      <div class="column">
        <h4 class="title">Сотрудники</h4>

        <button class="primary-btn button">
          Фильтр
          <d-icon class="mt-1 right-arrow" icon="right-arrow" />
        </button>
      </div>

      <!-- search input -->
      <div class="column is-3">
        <d-input
          size="small"
          placeholder="Поиск"
          align-icon="right"
          icon="search"
          icon-width="14"
          :icon-color="iconColor"
        />
      </div>
    </div>

    <!-- list -->
    <d-lists dashed-header>
      <template #header>
        <div class="columns">
          <div class="column is-5"><span>Ф.И.О</span></div>
          <div class="column is-3"><span>Ставка</span></div>
          <div class="column is-3"><span>Общий стаж работы</span></div>
          <div class="column has-text-centered">
            <d-add-btn @click="changeRouter()" />
          </div>
        </div>
      </template>

      <template #content>
        <d-spinner-wrapper :loading="loading" :len="results.length">

          <router-link
            :to="{ name: 'employeeId', params: { id: item.id } }"
            v-for="item in results"
            :key="item.id"
          >
            <div class="columns is-vcentered">
              <div class="column is-5">
                <div class="columns">
                  <div class="pt-1">
                    <d-avatar
                      cover
                      width="41"
                      height="41"
                      :src="(item && item.photo) || ''"
                    />
                  </div>
                  <div class="column py-0">
                    <div>
                      {{ (item && item.last_name && item.last_name.ru) || "" }}
                      {{ (item && item.first_name && item.first_name.ru) || "" }}
                      {{
                        (item && item.middle_name && item.middle_name.ru) || ""
                      }}
                    </div>
                    <div class="text-gray">
                      {{
                        (item &&
                          item.current_workplace &&
                          item.current_workplace.ru) ||
                          ""
                      }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="column is-3">
                {{ (item && item.salary_rate) || "" }}
              </div>
              <div class="column is-3">
                {{ (item && item.work_experience) || "" }}
              </div>
              <div class="column has-text-centered">
                <div class="icon-rotate-90">
                  <d-icon class="sm-icon icon-btn icon-more-btn" icon="more" />
                </div>
              </div>
            </div>
          </router-link>
        </d-spinner-wrapper>
      </template>
    </d-lists>

    <d-pagination-input
      right
      v-model="page"
      @change="fetchData"
      :limit="per_page"
      :total="count"
    />
  </div>
</template>

<script>
import variables from "@/assets/scss/base/_variables.scss";
import { mapActions } from "vuex";

import Lists from "@/components/Lists";
import DAvatar from "@/components/Avatar";
import DSpinnerWrapper from "@/components/loaders/spinnerWrapper";

export default {
  components: {
    "d-lists": Lists,
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-input": () => import("@/components/inputs/input"),
    // 'd-button': () => import("@/components/buttons/loaderButton"),
    DPaginationInput: () => import("@/components/Pagination-input"),
    DAddBtn: () => import("@/components/AddButton"),
    DAvatar,
    DSpinnerWrapper,
  },
  data() {
    return {
      iconColor: (variables && variables.grey) || "",
      page: 1,
      per_page: 5,
      count: 0,
      results: [],
      loading: false
    };
  },

  methods: {
    ...mapActions("employee", ["fetchList"]),
    fetchData() {
      this.loading= true
      return this.fetchList({
        limit: this.per_page,
        offset: this.page <= 1 ? 0 : this.per_page * this.page - this.per_page,
      })
        .then((res) => {
          if (res && res.data) {
            console.log(res.data.results);
            this.results = res.data.results || [];
            this.count = res.data.count || 0;
          }
          this.loading= false
        })
        .catch((err) => {
          console.log(err)
          this.loading = false
        });
    },
    changeRouter(){
     this.$router.push( '/employee/create');
    } 
  },

  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss">
@import "~@/assets/scss/components/sections";
</style>
