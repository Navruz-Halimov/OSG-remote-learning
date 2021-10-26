<template>
  <div class="columns order-create">
    <div class="column is-5">
      <div class="section__list h-100 flex-column">
        <div class="order__create">
          <div class="columns padding-sm-x" style="align-items: center">
            <div class="column is-10">
              <h4 class="title">Cотрудник</h4>
            </div>
            <!-- <div class="column">
              <d-dropdown class="right flex-row justify-content-end">
                
                <template #body>
                  <a href="javascript:void(0)">
                    <d-icon
                      class="sm-icon icon-btn icon-more-btn"
                      icon="more"
                      style="transform: rotate(90deg)"
                    />
                  </a>
                </template>
                <template #dropdown-menu>
                  <li>
                    <a href="javascript:void(0)">
                      <d-icon
                        class="dd-small__icon rotate-minus-90 width-18 mr-4"
                        icon="delete"
                      />
                      Удалить
                    </a>
                  </li>
                </template>
              </d-dropdown>
            </div> -->
          </div>
          <!-- <div class="mb-4 pl-3">
            
          </div> -->
          <d-lists no-header class="no-hover">
            <template #content>
              <div class="columns padding-sm-x is-vcentered">
                <div class="pt-1">
                  <div class="pt-1 flex-row align-items-center">
                    <d-avatar
                      cover
                      width="56"
                      height="56"
                      :src="pickedEmployeeProps.photo"
                    />
                  </div>
                </div>
                <div class="column py-0 pr-0">
                  <d-select
                    class="grey-2 rounded"
                    placeholder="Выберите сотрудника"
                    :options="employeeList"
                    label="name"
                    ml
                    v-model="pickedEmployeeProps"
                    @change="handlePickEmployee"
                    :reduce="(item) => item"
                  ></d-select>
                  <!-- <div>{{ (pickedEmployeeProps || {}).name || "" }}</div> -->
                  <!-- <div class="text-gray">Преподаватель</div> -->
                </div>
              </div>
            </template>
          </d-lists>
        </div>
        <div
          class="mt-4 attestation-id-right flex-1 padding-sm-x"
          style="height: unset"
        >
          <h4 class="title" v-show="employeeDocs != 0">Файлы</h4>
          <div
            class="columns py-2 is-vcentered profile-detail padding-sm-x"
            v-for="(item, i) in employeeDocs"
            :key="i"
          >
            <div class="icon-container">
              <img :src="require('@/assets/icons/word.png')" alt="" />
            </div>
            <div class="column py-0">
              <div>{{ item.name }}</div>
              <div class="text-gray time-div">
                <d-icon icon="time" class="icon-clock" />
                <span class="mx-1">
                  {{ $moment(item.date).format("HH:mm DD.MM.YYYY") }}
                </span>
                <!-- |
                <a href="#" class="ml-1 download-link">
                  Скачать &nbsp;
                  <d-icon class="ml-1" icon="download" />
                </a> -->
              </div>
            </div>
            <d-dropdown>
              <!-- dropdown types -->
              <template #body>
                <div class="icon-rotate-90">
                  <d-icon class="sm-icon icon-btn icon-more-btn" icon="more" />
                </div>
              </template>
              <template #dropdown-menu>
                <li>
                  <a href="javascript:void(0)" @click.stop="removeDoc(i)">
                    <d-icon
                      class="dd-small__icon rotate-minus-90 width-18 mr-4"
                      icon="delete"
                    />
                    Удалить
                  </a>
                </li>
              </template>
            </d-dropdown>
          </div>
        </div>

        <div class="file__upload__label flex-row">
          <div class="flex-1">
            Для загрузки документа перетащите файл или
            <a
              href="javascript:void(0)"
              @click="$refs.docsRef.click()"
              style="color: #275395"
              >кликните</a
            >
          </div>
          <input
            id="order__create-file"
            @change="handleDocs($event)"
            ref="docsRef"
            type="file"
            multiple
            hidden
            accept=".doc, .docx"
          />
          <d-icon
            class="dd-small__icon rotate-minus-90 width-18"
            icon="paper-clip"
            style="fill: #9aa6bb"
          />
          <!-- <a href="javascript:void(0)" class="flex-row align-items-center">
          </a> -->
        </div>
      </div>
    </div>
    <div class="column is-7 order__create-left">
      <div class="section__list order-create-right">
        <div class="columns padding-sm-x">
          <div class="column">
            <h4 class="title">Приказ</h4>
          </div>
        </div>
        <div class="columns padding-sm-x flex-wrap">
          <!-- Тип приказа -->
          <div class="column is-6">
            <div class="secondary-title">Тип приказа</div>
            <d-select
              class="grey-2 rounded"
              placeholder="Введите текст"
              :options="erderTypes"
              label="name"
              :reduce="(item) => item.id"
            ></d-select>
          </div>

          <!-- Номер приказа -->
          <div class="column is-6">
            <div class="secondary-title">Номер приказа</div>
            <d-input
              placeholder="Введите текст"
              size
              type="number"
              class="grey"
              rounded
              v-model="form.order_number"
            />
          </div>

          <!-- Номер трудового договора -->
          <div class="column is-6">
            <div class="secondary-title">Номер трудового договора</div>
            <d-input
              placeholder="Введите текст"
              size
              type="text"
              class="grey"
              v-model="trudovoyNumber"
              rounded
            />
          </div>

          <!-- Дата начала работы -->
          <div class="column is-6">
            <div class="secondary-title">Дата начала работы</div>
            <d-date-selector
              class="modal-variant-1"
              grey
              placeholder="Введите текст"
              :options="options"
              label="title"
              color="grey"
              v-model="form.start_date"
              :reduce="(item) => item.id"
            ></d-date-selector>
          </div>

          <!-- Ставка -->
          <div class="column is-6">
            <div class="secondary-title">Ставка</div>
            <d-input
              placeholder="Введите текст"
              size
              type="number"
              class="grey"
              rounded
              v-model="form.rate"
            />
          </div>

          <!-- Дата приказа -->
          <div class="column is-6">
            <div class="secondary-title">Дата приказа</div>
            <d-date-selector
              class="modal-variant-1"
              grey
              placeholder="Введите текст"
              :options="options"
              label="title"
              color="grey"
              v-model="form.register_date"
              :reduce="(item) => item.id"
            ></d-date-selector>
          </div>

          <!-- Оклад -->
          <div class="column is-6">
            <div class="secondary-title">Оклад</div>
            <d-input
              placeholder="Введите текст"
              size
              type="text"
              class="grey"
              rounded
              v-model="form.salary"
            />
          </div>

          <!-- Дата окончания -->
          <div class="column is-6">
            <div class="secondary-title">Дата окончания</div>
            <d-date-selector
              class="modal-variant-1"
              grey
              placeholder="Введите текст"
              :options="options"
              label="title"
              color="grey"
              v-model="form.expiration_date"
              :reduce="(item) => item.id"
            ></d-date-selector>
          </div>

          <!-- Надбавка -->
          <div class="column is-6">
            <div class="secondary-title">Надбавка</div>
            <d-input
              placeholder="Введите текст"
              size
              type="number"
              class="grey"
              rounded
              v-model="form.premium"
            />
          </div>

          <!-- Вид занятости -->
          <div class="column is-6">
            <div class="secondary-title">Вид занятости</div>
            <!-- <d-select
              class="grey-2 rounded"
              placeholder="Введите текст"
              :options="options"
              label="title"
              v-model="id"
              :reduce="(item) => item.id"
            ></d-select> -->
            <d-input
              placeholder="Введите текст"
              size
              type="text"
              class="grey"
              rounded
            />
          </div>
        </div>

        <div class="has-text-danger padding-sm-x">
          <div v-for="(err, i) in errors" :key="i">
            <em class="is-size-4">*</em>
            {{ err }}
          </div>
        </div>

        <div class="columns mt-auto">
          <div class="column is-6">
            <!-- <d-button text="Отменить" rounded color="is-grey"></d-button> -->
          </div>
          <div class="column is-6 right">
            <!-- <d-button text="Скачать" rounded color="blue"></d-button> -->
            <d-button
              text="Сохранить"
              @click="submitForm"
              rounded
              color="blue"
              :loading="pending"
            ></d-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DDropdown from "@/components/Dropdown";
import { mapActions } from "vuex";

const orderRegister = () => ({
  register_date: null, // Дата регистрации
  expiration_date: null, // Дата окончания договора
  start_date: null, // Дата начало
  rate: null, //
  salary: null,
  premium: null,
  position: 1,
  empl_id: null,
  order_number: null,
});

// const orderEnd = () => ({
//   fire_date: null,
//   reason: { ru: "", uz: "" },
//   empl_id: null,
//   order_number: null,
// });

// const orderExtra = () => ({
//   extra_agree_number: null,
//   extra_agree_date: null,
//   extra_agree_expiration_date: null,
//   empl_id: null,
//   order_number: null,
// });

// const orderUniversal = () => ({
//   empl_id: null,
//   order_number: null,
//   start_date: null,
//   expiration_date: null,
//   description: { ru: "", uz: "" },
// });

export default {
  components: {
    DDropdown,
    "d-input": () => import("@/components/inputs/input"),
    "d-select": () => import("@/components/inputs/select"),
    "d-date-selector": () => import("@/components/inputs/date-selector"),
    "d-button": () => import("@/components/buttons/loaderButton"),
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-lists": () => import("@/components/Lists"),
    "d-avatar": () => import("@/components/Avatar"),
  },
  data() {
    return {
      form: orderRegister(),

      pickedEmployeeProps: "",
      open: false,
      id: null,
      options: [
        {
          title: "adas",
          id: 1,
        },
        {
          title: "adas",
          id: 2,
        },
        {
          title: "adas",
          id: 3,
        },
      ],

      employeeList: [],

      employeeDocs: [],

      erderTypes: [
        {
          id: 1,
          name: "Поступление",
        },
        {
          id: 2,
          name: "Увольнение",
        },
        {
          id: 3,
          name: "Продление",
        },
        {
          id: 4,
          name: "Отпуск",
        },
      ],

      pending: false,

      trudovoyNumber: "",

      errors: [],

      loading: false,
    };
  },

  methods: {
    ...mapActions("employee", ["fetchList"]),
    ...mapActions("employeeOrderregister", ["create"]),

    handlePickEmployee(props) {
      this.pickedEmployeeProps = props;
      this.form.empl_id = (props || {}).id || null;
    },

    handleDocs(e) {
      if (e.target.files && e.target.files.length) {
        const t = Array.from(e.target.files).map((item) => ({
          name: item.name,
          date: new Date(),
        }));
        this.employeeDocs = t;
      }
    },

    removeDoc(index) {
      this.employeeDocs = [
        ...this.employeeDocs.slice(0, index),
        ...this.employeeDocs.slice(index + 1),
      ];
    },

    isValid() {
      return !Object.keys(this.form).some((key) => !this.form[key]);
    },

    submitForm() {
      this.pending = true;
      this.errors = [];

      if (!this.isValid()) {
        this.errors = ["Заполните все поля"];
        return;
      }

      this.create(this.form)
        .then((res) => {
          console.log("res", res);
          this.pending = false;
          this.$router.push({ name: "orders" });
        })
        .catch((err) => {
          console.error(err);
          this.pending = false;
        });
    },
  },

  mounted() {
    this.fetchList().then((res) => {
      console.log(22, res);
      this.employeeList = this.$ArrayNamesTofullName(
        (res && res.data && res.data.results) || []
      );
    });
  },
};
</script>

<style lang="scss">
.attestation-id-right {
  box-shadow: unset !important;
}
.order-create {
  // .order__create-left {
  //   box-shadow: 0px 3px 10px #a1a1a124;
  //   border-radius: 4px;
  // }
  .order__create-file-label {
    width: 100%;
    margin-right: 30px;
    margin-left: 30px;
    padding-left: 18px;
    padding-right: 18px;
    padding-top: 8px;
    padding-bottom: 8px;
    white-space: nowrap;
    display: flex;
    align-items: center;
    font-size: 14px;
    border-radius: 17px;
    // background: rgba(244, 245, 248, 1) 0% 0% no-repeat padding-box;
    span {
      margin-left: 5px;
      color: hsla(216, 59%, 37%, 1);
    }
    img {
      cursor: pointer;
      margin-left: 40px;
    }
    input::-webkit-file-upload-button {
      visibility: hidden;
    }
  }
  .order__create-form {
    display: flex;
    justify-content: space-around;
    width: 100%;
    input {
      width: 0;
      height: 0;
    }
  }
  .section__list {
    width: 100%;
    // padding-left: 31px;
    // padding-right: 31px;
    // padding-bottom: 35px;
  }
  // .order__create {
  //   box-shadow: 0px 3px 10px #a1a1a124;
  //   background: #fff;
  //   border-radius: 4px;
  //   padding-bottom: 40px;
  //   border-radius: 4px;
  // }
  // .order__create-file {
  // padding-bottom: 30px;
  // margin-top: 20px;
  // background: #ffffff;
  // border-radius: 4px;
  // }
  .delete__icon {
    width: 11px;
    height: 14px;
    margin-right: 8px;
  }
  width: 100%;

  &-left {
    height: 100%;
  }

  &-right {
    height: 100%;
    display: flex;
    flex-direction: column;

    // &.section__list {
    //   flex: none;
    //   margin: 0 auto;
    //   padding: 30px;
    // }

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
}
.attestation-id {
  width: 100%;

  &-left {
    height: 100%;

    &__body {
      border-bottom: 1px dashed $lightgrey;

      &:last-child {
        border-bottom: none;
      }
    }

    .back-button {
      svg {
        fill: white;
        width: 9px;
      }
    }

    .title {
      margin-top: 10px;
    }

    .secondary-title {
      margin-top: 20px;
      color: #9aa6bb;
      font-weight: 400;
      font-size: 16px;
    }

    .profile-detail {
      align-items: center;
    }

    .custom-dropdown,
    .custom-dropup {
      float: right;

      svg {
        position: relative;
        display: inline-block;
        transform: rotate(90deg);
        width: 15px;
        fill: $grey;
      }

      &__content {
        list-style: none !important;
      }
    }
  }

  &-right {
    height: 100%;
    // box-shadow: 0px 3px 10px #a1a1a124;
    font-size: 15px;

    .download-link {
      color: $blue;
      svg {
        width: 12px;
        fill: $blue;
      }
    }

    .icon-container {
      height: 48px;
      width: 48px;
      background-color: #2a56991a;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 25px;
      }
    }

    .profile-detail {
      border-radius: 8px;

      &:hover {
        background-color: #f6f7f8;
      }
      .column {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    }

    .time-div {
      display: flex;
      justify-content: unset;
    }

    .icon-clock {
      width: 13px;
    }
    .icon-more {
      width: 20px;
      transform: rotate(90deg);

      fill: $lightgrey;
    }
  }
}

.file__upload__label {
  background: #f4f5f8;
  border-radius: 17px;
  padding: 8px 18px;
  color: #9aa6bb;
}
</style>
