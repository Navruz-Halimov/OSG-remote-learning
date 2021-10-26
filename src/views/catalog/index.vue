<template>
  <div class="directory">
    <div class="directory__left ml-2">
      <div class="directory__list">
        <div class="directory__list--title pl-2 mb-4">
          <h4 class="title">Справочник</h4>
        </div>
        <div
          v-for="(item, key) in listHeader"
          :key="key"
          :class="[
            'directory__list--item',
            { active: key == $route.query.tab },
          ]"
          @click="tabChange(key)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>

    <div class="directory__right mr-2">
      <d-ghost-loader :active="loading" />
      <div class="directory__info">
        <div class="directory__info--title pl-3 mb-4">
          <h4 class="title">{{ selectedTab.title }}</h4>
        </div>
        <div class="directory__list__content">
          <d-lists>
            <template #header>
              <div class="columns">
                <div
                  class="column"
                  v-for="header in selectedTab.headers"
                  :key="header"
                >
                  {{ header }}
                </div>
                <div
                  class="column pr-0 is-2 has-text-centered flex-row justify-content-end"
                >
                  <button class="add-btn icon-btn" @click="onCreateClick">
                    <d-icon icon="accordion_plus" />
                    <span> Добавить </span>
                  </button>
                </div>
              </div>
            </template>
            <template #content>
              <div
                v-for="(item, index) in selectedTabList"
                :key="index"
                class="directory__list--item px-0"
              >
                <div class="columns" v-if="currTabName == 'district'">
                  <div class="column">
                    {{ (item && item.name[mainLang]) || "Нет названия" }}
                  </div>
                  <div class="column">{{ mainLang || "Нет данных" }}</div>
                  <div class="column">
                    {{
                      (item.city && item.city.name[mainLang]) || "Нет названия"
                    }}
                  </div>
                  <div class="column is-2 directory__list--item__icons">
                    <div>
                      <d-icon
                        icon="teacher-pen"
                        @click.native.prevent="onEditClick(item)"
                      />
                    </div>
                    <div>
                      <d-icon
                        icon="bin"
                        @click.native.prevent="onDeleteClick(item)"
                      />
                    </div>
                  </div>
                </div>
                <div class="columns" v-else>
                  <div class="column">
                    {{ (item && item.name[mainLang]) || "Нет названия" }}
                  </div>
                  <div class="column">{{ mainLang || "Нет данных" }}</div>
                  <div class="column is-2 directory__list--item__icons">
                    <div>
                      <d-icon
                        icon="teacher-pen"
                        @click.native.prevent="onEditClick(item)"
                      />
                    </div>
                    <div>
                      <d-icon
                        icon="bin"
                        @click.native.prevent="onDeleteClick(item)"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </d-lists>
          <!-- <component 
            :is="currTabName" 
            :list="selectedTabList" 
            :title="selectedTab.title"
            @createOrUpdate="createOrUpdate"
            @deleteItem="onDeleteClick"
            @enterLang="enterLang"
          ></component> -->
        </div>
      </div>
    </div>

    <d-modal
      :seen="openModal"
      size="small"
      title="Добавить"
      @closemodal="openModal = false"
    >
      <div class="add-group-modal">
        <d-input
          class="grey rounded mt-3"
          placeholder="Введите текст"
          v-model="form.name[currLang]"
        ></d-input>
        <div class="lang-row mt-3">
          <div
            class="lang-row__item"
            v-for="(item, index) in langOptions"
            :key="item"
            @click="onLangClick(item)"
          >
            <div class="lang-row__item__circle" v-if="item != currLang">
              {{ index + 1 }}
            </div>
            <d-icon v-else icon="check" />
            <div class="lang-row__item__code">
              {{ item }}
            </div>
          </div>
        </div>
        <div v-if="currTabName == 'district'">
          <div class="custom-title mt-0">Область</div>
          <d-select
            class="grey-2"
            placeholder="Введите текст"
            :options="cityOptionsLang"
            label="name"
            no-title
            v-model="form.city_id"
            :reduce="(item) => item.id"
          ></d-select>
        </div>
        <d-button
          class="directory__modal-btn mb-0"
          @click="createOrUpdate"
          color="blue"
          :disabled="requesting"
          rounded
          :text="isCreating && langIsNotLast ? 'Далее' : 'Сохранить'"
        >
        </d-button>
      </div>
    </d-modal>

    <d-modal
      :seen="deleteConfirm"
      size="small"
      title="Вы действительно хотите удалить?"
      @closemodal="deleteConfirm = false"
    >
      <div class="is-flex">
        <d-button
          class="directory__modal-delete"
          @click="deleteItem"
          color="blue"
          :disabled="deleting"
          rounded
          text="Да"
        />
        <d-button
          class="directory__modal-delete ml-3"
          @click="deleteConfirm = false"
          color="grey"
          rounded
          text="Нет"
        />
      </div>
    </d-modal>
  </div>
</template>

<script>
import DGhostLoader from "@/components/loaders/ghostLoader";

export default {
  components: {
    "d-lists": () => import("@/components/Lists"),
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-input": () => import("@/components/inputs/input"),
    "d-modal": () => import("@/components/Modal"),
    "d-button": () => import("@/components/buttons/loaderButton"),
    "d-select": () => import("@/components/inputs/select"),
    DGhostLoader,
  },
  watch: {
    "$route.query": {
      handler() {
        this.changeForm();
        this.getTabList();
        this.getLists();
      },
    },
    openModal: {
      handler(newVal) {
        if (!newVal) {
          this.form = {};

          this.changeForm();

          this.currLang = "ru";
          this.isCreating = false;
          this.getLists();
          this.getTabList();
        }
      },
    },
    deleteConfirm: {
      handler(newVal) {
        if (!newVal) {
          this.getLists();
          this.getTabList();
        }
      },
    },
  },
  data() {
    return {
      mainLang: "ru",
      currLang: "ru",
      langOptions: ["ru", "uz"],
      cityOptions: [],

      deleteItemId: null,
      deleteConfirm: false,

      openModal: false,
      requesting: false,
      deleting: false,
      loading: false,
      isCreating: false,

      currTabName: "",
      selectedTab: {},
      selectedTabList: [],

      form: {
        id: null,
        name: {
          ru: "",
          uz: "",
        },
      },
      listHeader: {
        city: {
          title: "Города",
          headers: ["Название", "Язык"],
        },
        district: {
          title: "Области, районы",
          headers: ["Название", "Язык", "Область"],
        },
        university: {
          title: "Университеты",
          headers: ["Название", "Язык"],
        },
        faculty: {
          title: "Факультет",
          headers: ["Название", "Кор. Название"],
        },
        speciality: {
          title: "Специальность",
          headers: ["Название", "Язык"],
        },
        category: {
          title: "Категории",
          headers: ["Название", "Язык"],
        },
        nationality: {
          title: "Национальность",
          headers: ["Название", "Язык"],
        },
        party: {
          title: "Партия",
          headers: ["Название", "Язык"],
        },
        position: {
          title: "Позиция",
          headers: ["Название", "Язык"],
        },
        candidate: {
          title: "Кандидаты",
          headers: ["Название", "Язык"],
        },
        language: {
          title: "Языки",
          headers: ["Название", "Язык"],
        },
        department: {
          title: "Департамент",
          headers: ["Название", "Язык"],
        },
      },
    };
  },
  computed: {
    fieldsFilled() {
      for (let elem in this.form) {
        if (elem == "name" && !this.form[elem][this.currLang]) return false;
        else if (elem == "city_id" && !this.form[elem]) return false;
      }

      return true;
    },
    langIsNotLast() {
      return this.currLang != this.langOptions[this.langOptions.length - 1];
    },
    cityOptionsLang() {
      return this.cityOptions.map((item) => {
        let newItem = {
          ...item,
          name: item.name[this.currLang]
            ? item.name[this.currLang]
            : item.name[
                Object.keys(item.name).find((key) => item.name[key] != "")
              ],
        };
        return { ...item, name: newItem.name };
      });
    },
  },
  mounted() {
    console.log(this.$t("message"));
    if (
      !this.$route.query.tab ||
      (this.$route.query && !(this.$route.query.tab in this.listHeader))
    ) {
      this.$router.push({ query: { tab: "city" } });
      // console.log(this.listInfo);
    } else {
      this.getTabList();
      this.getLists();
      this.changeForm();
    }
  },
  methods: {
    changeForm() {
      this.form =
        this.$route.query.tab == "district"
          ? { name: { ru: "", en: "" }, id: null, city_id: null }
          : { name: { ru: "", en: "" }, id: null };
    },
    onLangClick(langItem) {
      if (!this.isCreating) this.currLang = langItem;
    },
    onEditClick(item) {
      this.openModal = true;

      for (let elem in this.form) {
        this.form[elem] =
          elem == "city_id"
            ? (item.city && item.city.id) || null
            : JSON.parse(JSON.stringify(item[elem])) || null;
      }
    },
    onCreateClick() {
      if (!this.langOptions.length) {
        alert("Добавьте хотя бы один вариант языка!");
        return;
      }
      this.isCreating = true;
      this.openModal = true;
    },
    getLists() {
      // if(this.currTabName != 'language')
      //   this.$store.dispatch(`catalog/get`, "language")
      //       .then((res) => {
      //           if(res) {
      //               this.langOptions = res
      //               this.currLang = this.langOptions[0].code
      //               this.mainLang = this.langOptions[0].code
      //               for(let item of this.langOptions) {
      //                   this.form.name = {
      //                       ...this.form.name,
      //                       [item.code]: '',
      //                   }
      //               }
      //           }
      //       })

      if (this.currTabName == "district")
        this.$store.dispatch(`catalog/get`, "city").then((res) => {
          if (res) {
            this.cityOptions = res;
          }
        });
    },
    onDeleteClick(item) {
      this.deleteItemId = item.id;
      this.deleteConfirm = true;
    },
    deleteItem() {
      if (this.deleteItemId) {
        this.deleting = true;
        this.$store
          .dispatch(`catalog/delete`, {
            id: this.deleteItemId,
            key: this.currTabName,
          })
          .then(() => {
            console.log("Req del");
            this.deleting = false;
            this.deleteConfirm = false;
            // this.selectedTab.list = res.results
            this.getTabList();
          })
          .catch((err) => {
            console.log("Req del err", err);
            this.deleting = false;
          });
      }
    },
    createOrUpdate() {
      if (this.fieldsFilled && this.langIsNotLast) {
        this.currLang = this.langOptions[
          this.langOptions.indexOf(this.currLang) + 1
        ];
      }
      if (this.fieldsFilled && !this.langIsNotLast) {
        this.requesting = true;
        this.openModal = true;

        this.$store
          .dispatch(`catalog/createOrUpdate`, {
            payload: this.form,
            key: this.currTabName,
          })
          .then((res) => {
            console.log("Req res", res);
            // this.selectedTab.list = res.results
            if (res) {
              this.getTabList();

              this.requesting = false;
              this.openModal = false;
            }
          })
          .catch((err) => {
            console.log("Req err", err);
            this.requesting = false;
          });
      }
    },
    async getTabList() {
      if (this.$route.query && this.$route.query.tab) {
        if (!(this.$route.query.tab in this.listHeader)) {
          this.$router.push({ query: { tab: "city" } });
          return;
        }
        this.loading = true;
        this.currTabName = this.$route.query.tab;
        let item = JSON.parse(
          JSON.stringify(this.listHeader[this.currTabName])
        );
        if (item) {
          this.selectedTab = JSON.parse(JSON.stringify(item));
          this.$store
            .dispatch(`catalog/get`, this.currTabName)
            .then((res) => {
              if (res) {
                this.selectedTabList = res || [];
              }
              this.loading = false;
              // if(this.currTabName == "city" || this.currTabName == "district") {
              //   this.selectedTabList = this.selectedTabList.map(item => {
              //     return {...item, name: JSON.parse(item.name)}
              //   })

              //   if(this.currTabName == "district") {
              //     this.selectedTabList = this.selectedTabList.map(item => {
              //       return {...item, city: {...item.city, name: JSON.parse(item.city.name)}}
              //     })
              //   }
              // }
            })
            .catch((err) => {
              console.log("Get req err", err);
              this.loading = false;
            });
        }
      }
    },
    tabChange(tab) {
      if (this.$route.query.tab != tab)
        this.$router.push({ query: { tab: tab } });
    },
  },
};
</script>

<style lang="scss">
h4.title {
  color: rgba(39, 83, 149, 0.8);
  margin-bottom: 0;
  padding-top: 4px;
}

.directory {
  display: flex;
  flex: 1;

  .modal-window__header {
    margin-bottom: 20px;
  }

  &__modal-delete {
    align-self: flex-end;
  }

  &__modal-btn {
    float: right;
    margin: 20px 0 20px;
  }

  .directory__list {
    // &__content {

    // }
    &--item {
      padding: 10px;
      margin-bottom: 7px;
      border-radius: 3px;
      &__icons {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        & > div {
          &:hover {
            svg {
              fill: $grey;
            }
          }
          &:not(:first-child) {
            margin-left: 20px;
          }
        }

        svg {
          width: 15px;
        }
      }
      &.active {
        background-color: #f6f7f8;
      }
      &:hover {
        background-color: #f6f7f8;
        cursor: pointer;
      }
    }
  }

  &__left {
    box-shadow: 0px 3px 10px #a1a1a124;
    border-radius: 4px;
    flex: 3.5;
    background-color: #fff;
    margin-right: 10px;
    padding: 30px 20px;
  }

  &__right {
    position: relative;
    box-shadow: 0px 3px 10px #a1a1a124;
    border-radius: 4px;
    flex: 8;
    background-color: #fff;
    margin-left: 10px;
    padding: 30px 20px;
  }

  .directory__list {
    .add-group-modal {
      & > div:not(:first-child) {
        margin-top: 20px;
      }
    }
  }
  .lang-row {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: space-between;

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
}
</style>
