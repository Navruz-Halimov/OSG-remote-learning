<template>
  <div class="trip-create section__list">
    <d-ghost-loader :active="loading" />

    <div><h4 class="title pt-0 mb-4">Командировка</h4></div>
    <div class="columns">
      <div class="column is-6">
        <div class="secondary-title">Пункт назначения</div>
        <d-input
          placeholder="Введите текст"
          size
          type="text"
          rounded
          class="grey"
          v-model="form.destination_point[currLang]"
        />
      </div>
      <div class="column is-6">
        <div class="secondary-title">Начало командировки</div>
        <d-date-selector
          class="modal-variant-1"
          grey
          v-model="form.trip_end"
        ></d-date-selector>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <div class="secondary-title">Цель командировки</div>
        <d-input
          placeholder="Введите текст"
          size
          type="text"
          rounded
          class="grey"
          v-model="form.trip_cause[currLang]"
        />
      </div>
      <div class="column is-6">
        <div class="secondary-title">Конец командировки</div>
        <d-date-selector
          class="modal-variant-1"
          grey
          v-model="form.trip_start"
        ></d-date-selector>
      </div>
    </div>
    <div class="columns">
      <div class="column is-6">
        <div class="secondary-title">Принимающая сторона</div>
        <d-input
          placeholder="Введите текст"
          size
          type="text"
          rounded
          class="grey"
          v-model="form.host[currLang]"
        />
      </div>
    </div>
    <!-- <div class="columns padding-sm-x">
            <div class="column is-6">
                <div class="secondary-title">
                    Дата приказа
                </div>
                <d-input
                  placeholder="Введите текст"
                  size
                  type="text"
                  rounded
                  class="grey"
                />
            </div>
            <div class="column is-6">
                <div class="secondary-title">
                    Номер приказа
                </div>
                <d-input
                  placeholder="Введите текст"
                  size
                  type="text"
                  rounded
                  class="grey"
                />
            </div>
        </div> -->
    <div class="lang-row">
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
    <div class="columns mt-auto">
      <div class="column is-6">
        <d-button
          @click="$router.go(-1)"
          text="Отменить"
          rounded
          color="is-grey"
        ></d-button>
      </div>
      <div class="column is-6 right">
        <d-button
          text="Сохранить"
          :disabled="!currFieldsFilled"
          rounded
          color="blue"
          @click="update"
        ></d-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "d-input": () => import("@/components/inputs/input"),
    // 'd-select': () => import("@/components/inputs/select"),
    "d-date-selector": () => import("@/components/inputs/date-selector"),
    "d-button": () => import("@/components/buttons/loaderButton"),
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-ghost-loader": () => import("@/components/loaders/ghostLoader"),
  },
  // watch: {
  //     district: {
  //         handler: "fetchEmployeeList",
  //         immediate: true
  //     },
  //     position: {
  //         handler: "fetchEmployeeList",
  //         immediate: true
  //     }
  // },
  data() {
    return {
      loading: false,
      currLang: "ru",
      langOptions: ["ru", "uz"],
      // districtList: [],
      // positionList: [],
      employeeList: [],
      district: null,
      position: null,
      form: {
        id: null,
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
        // order: null
      },
      id: null,
    };
  },
  computed: {
    notLastLang() {
      return this.langOptions[this.langOptions.length - 1] != this.currLang;
    },
    currFieldsFilled() {
      let langFields = ["destination_point", "trip_cause", "host"];
      for (let key in this.form) {
        // console.log("adsdasdasd", langFields.includes(key), key);
        if (langFields.includes(key) && !this.form[key][this.currLang]) {
          return false;
        } else if (!this.form[key]) {
          return false;
        }
      }

      return true;
    },
  },
  mounted() {
    // this.fetchLists()
    this.fetchData();
  },
  methods: {
    onLangClick(langItem) {
      this.currLang = langItem;
      //merged master
    },
    fetchData() {
      this.loading = true;
      this.$store
        .dispatch("businesstrip/fetchDetail", this.$route.params.id)
        .then((result) => {
          if (result && result.data) {
            for (let elem in this.form) {
              if (elem == "employee") {
                this.form[elem] = JSON.parse(
                  JSON.stringify(result.data[elem].id)
                );
                continue;
              }
              this.form[elem] = JSON.parse(JSON.stringify(result.data[elem]));
            }
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log("object", err);
        });
    },
    update() {
      this.loading = true;
      this.$store
        .dispatch("businesstrip/submit", this.form)
        .then((result) => {
          console.log(result);
          if (result) {
            this.loading = false;
            this.$router.go(-1);
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
  },
};
</script>

<style lang="scss">
.trip-create {
  position: relative;
  display: flex;
  flex-direction: column;

  &.section__list {
    flex: none;
    width: 60%;
    margin: 0 auto;
    padding: 30px;
  }

  .secondary-title {
    margin-bottom: 5px;
    color: $text-color;
  }

  .mt-auto {
    margin-top: auto;
  }

  .right {
    display: flex;
    justify-content: flex-end;
    button:last-child {
      margin-left: 20px;
    }
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