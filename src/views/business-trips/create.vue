<template>
  <div class="trip-create section__list">
    <d-ghost-loader :active="loading" />

    <div class="mb-4">
      <h4 class="title pt-0">Командировка</h4>
    </div>
    <div class="columns">
      <div class="column is-6">
        <div class="secondary-title">Подразделение</div>
        <d-select
          class="grey-2 rounded"
          placeholder="Введите текст"
          :options="mappedDistricts || options"
          label="name"
          v-model="district"
          :reduce="(item) => item.id"
        ></d-select>
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
        <div class="secondary-title">Должность</div>
        <d-select
          :disabled="!district"
          class="grey-2 rounded"
          :placeholder="district ? 'Выберите' : 'Выберите подразделение'"
          :options="mappedPositions || options"
          label="name"
          v-model="position"
          :reduce="(item) => item.id"
        ></d-select>
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
        <div class="secondary-title">Ф.И.О сотрудника</div>
        <d-select
          :disabled="!position"
          class="grey-2 rounded"
          :placeholder="position ? 'Выберите' : 'Выберите должность'"
          :options="mappedEmployees || options"
          label="name"
          v-model="form.employee"
          :reduce="(item) => item.id"
        ></d-select>
      </div>
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
    </div>
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
          :text="notLastLang ? 'Далее' : 'Сохранить'"
          :disabled="!currFieldsFilled"
          rounded
          color="blue"
          @click="create"
        ></d-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    "d-input": () => import("@/components/inputs/input"),
    "d-select": () => import("@/components/inputs/select"),
    "d-date-selector": () => import("@/components/inputs/date-selector"),
    "d-button": () => import("@/components/buttons/loaderButton"),
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-ghost-loader": () => import("@/components/loaders/ghostLoader"),
  },
  watch: {
    district: {
      handler() {
        this.position = null;
        this.fetchEmployeeList();
      },
      immediate: true,
    },
    position: {
      handler() {
        this.employeeList = [];
        this.fetchEmployeeList();
      },
      immediate: true,
    },
  },
  data() {
    return {
      currLang: "ru",
      langOptions: ["ru", "uz"],
      districtList: [],
      positionList: [],
      employeeList: [],
      district: null,
      position: null,
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
        // order: null
      },
      id: null,
    };
  },
  computed: {
    mappedDistricts() {
      return (
        this.districtList.map((item) => {
          return { name: item.name[this.currLang], id: item.id };
        }) || []
      );
    },
    mappedPositions() {
      return (
        this.positionList.map((item) => {
          return { name: item.name[this.currLang], id: item.id };
        }) || []
      );
    },
    mappedEmployees() {
      return (
        this.employeeList.map((item) => {
          return {
            name: `${item.first_name[this.currLang]} ${
              item.last_name[this.currLang]
            }`,
            id: item.id,
          };
        }) || []
      );
    },
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
    this.fetchLists();
  },
  methods: {
    fetchLists() {
      this.loading = true;
      this.$store
        .dispatch("businesstrip/fetchCatalog", "district")
        .then((result) => {
          console.log("the Lists", result);
          if (result && result.data && result.data.results)
            this.districtList = result.data.results;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
      this.$store
        .dispatch("businesstrip/fetchCatalog", "position")
        .then((result) => {
          console.log("the Lists", result);
          if (result && result.data && result.data.results)
            this.positionList = result.data.results;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    fetchEmployeeList() {
      this.loading = true;
      this.$store
        .dispatch("employee/fetchList", {
          department_id: this.district,
          position: this.position,
        })
        .then((result) => {
          console.log("the Lists", result);
          if (result && result.data && result.data.results)
            this.employeeList = result.data.results;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    create() {
      if (this.notLastLang) {
        this.currLang = this.langOptions[
          this.langOptions.indexOf(this.currLang) + 1
        ];
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("businesstrip/submit", this.form)
        .then((result) => {
          console.log(result);
          if (result) {
            this.$router.go(-1);
          }
          this.loading = false;
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
  display: flex;
  flex-direction: column;

  &.section__list {
    flex: none;
    width: 60%;
    margin: 0 auto;
    padding: 30px;
    position: relative;
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