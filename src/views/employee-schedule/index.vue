<template>
  <div class="flex-1 columns">
    <!-- left main blocks -->
    <div class="mb-0 column columns flex-column">
      <!-- company structure -->
      <div class="section__list overflow-hidden company-structure-row">
        <!-- title, select, add button -->
        <div class="columns">
          <div class="column pt-0">
            <h4 class="title text-black">Cтруктура предприятия</h4>
          </div>

          <div class="column pt-0 right">
            <div class="d-columns">
              <!-- <d-select
                :options="options"
                class="whitout_close grey-border height-min"
                label="title"
                v-model="id"
                :reduce="(item) => item.id"
              />
              <span class="mx-2"></span>
              <d-select
                :options="options2"
                class="whitout_close grey-border height-min"
                label="title"
                v-model="id"
                :reduce="(item) => item.id"
              /> -->

              <d-add-btn
                class="pt-2 mx-3 justify-content-end"
                @click="openModalAction"
              />
            </div>
          </div>
        </div>
        <!-- list -->
        <d-lists
          class="emp-schedule-list-wrapper"
          :loading="loading"
          emp-header
        >
          <template #header>
            <div class="columns">
              <div class="column is-4"><span>Подразделения</span></div>
              <div class="column is-4"><span>Должность</span></div>
              <div class="column is-2"><span>Рабочих мест</span></div>
            </div>
          </template>

          <template #content>
            <div
              class="columns is-vcentered emp-schedule-list-item"
              v-for="item in workplaceList"
              :key="item.id"
            >
              <div class="column is-4">
                <div class="columns">
                  <div class="column pl-0">
                    {{ item.department.name["ru"] }}
                  </div>
                </div>
              </div>
              <div class="column is-4">
                {{ item.position.name["ru"] }}
              </div>
              <div class="column is-3">{{ item.workplace_count }}</div>
              <div class="column has-text-centered">
                <d-dropdown>
                  <template #body>
                    <d-icon
                      icon="more"
                      class="custom-dropdown__trigger size-1"
                      @click="open = !open"
                    />
                  </template>
                  <template #dropdown-menu>
                    <li @click="deleteWorkplace(item.id)">
                      <a href="#">
                        <d-icon icon="delete" class="rotate-minus-90"></d-icon>
                        Удалить
                      </a>
                    </li>
                  </template>
                </d-dropdown>
              </div>
            </div>
          </template>
        </d-lists>
      </div>
      <d-modal
        :seen="openModal"
        title="Добавить рабочее место"
        class="tmodal"
        @closemodal="openModal = false"
      >
        <div class="mt-3">
          <p class="ml-2">Подразделение</p>
          <d-select
            :options="departmentList"
            class="whitout_close grey-2 rounded mb-2"
            label="name"
            ml
            v-model="form.department"
            :reduce="(item) => item.id"
          />
          <p class="ml-2 mt-2">Должность</p>
          <d-select
            :options="positionList"
            class="whitout_close rounded grey-2 mb-2"
            label="name"
            ml
            v-model="form.position"
            :reduce="(item) => item.id"
          />
          <p class="ml-2 mt-2">Сотрудники</p>
          <d-select
            :options="employeeList"
            class="whitout_close rounded grey-2 mb-2"
            label="name"
            ml
            v-model="form.employee"
            :reduce="(item) => item.id"
          />
          <p class="ml-2 mt-2">Ставка</p>
          <d-input type="text" rounded placeholder="Ставка" 
            v-model="form.salary_rate" class="grey" />
        </div>
        <div class="tmodal__btns mt-5 columns">
          <div class="column">
            <d-btn
              rounded
              color="is-grey"
              text="Отменить"
              @click="openModal = false"
            />
          </div>
          <div class="column right">
            <d-btn
              class="add-group-modal--btn"
              color="blue"
              rounded
              text="Сохранить"
              @click="createWorkPlace"
            />
          </div>
        </div>
      </d-modal>
      <!-- 2nd row -->
      <div class="columns flex-1 mt-3">
        <div class="column is-5">
          <div class="section__list h-100 px-5 pt-3 attestation-id-right">
            <h4 class="title text-black">
              Список оформленных трудовых договоров
            </h4>
            <div
              class="columns py-2 profile-detail padding-sm-x"
              v-for="item in docList"
              :key="item.id"
            >
              <div class="icon-container">
                <img
                  :src="require('@/assets/icons/word.png')"
                  width="24"
                  alt=""
                />
              </div>
              <div class="column py-0">
                <div>{{ item.name.split("/").pop() }}</div>
                <div class="text-gray time-div justify-content-start">
                  <d-icon icon="time" class="icon-clock size-1 mt-1" />
                  <span class="mx-1">{{
                    $moment(item.created_at).format("HH:mm DD.MM.YYYY")
                  }}</span>
                  |
                  <a :href="item.document" class="download-link ml-1">
                    <span class="mr-2">Скачать</span>
                    <d-icon icon="download" class="size-1" />
                  </a>
                </div>
              </div>
              <d-dropdown>
                <template #body>
                  <d-icon
                    icon="more"
                    class="custom-dropdown__trigger size-1"
                    @click="open = !open"
                  />
                </template>
                <template #dropdown-menu>
                  <li @click="deleteDoc(item.id)">
                    <a href="#">
                      <d-icon icon="delete" class="rotate-minus-90"></d-icon>
                      Удалить
                    </a>
                  </li>
                </template>
              </d-dropdown>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="section__list pt-3 pl-5 h-100">
            <div class="columns">
              <div class="column pb-0">
                <h4 class="title text-black">Список вакансий</h4>
              </div>

              <div class="column pb-0 flex-row justify-content-end">
                <!-- <d-icon class="add-btn icon-btn" icon="add-btn" /> -->
                <!-- <d-add-btn class="ml-3 mb-0 justify-content-end" /> -->
              </div>
            </div>

            <!-- list -->
            <d-lists class="emp-schedule-list-wrapper" emp-header>
              <template #header>
                <div class="columns">
                  <div class="column is-6">
                    <span>Подразделения/Должность</span>
                  </div>
                  <div class="column is-4"><span>Вакантных мест</span></div>
                  <div class="column is-2"></div>
                </div>
              </template>

              <template #content>
                <router-link to="#">
                  <div
                    class="emp-schedule-list-item"
                    v-for="item in workplaceAvailableList"
                    :key="item.id"
                  >
                    <div class="columns is-vcentered">
                      <div class="column is-6">
                        <div class="column pl-0">
                          {{ item.department.name["ru"] }}
                        </div>
                        <div class="text-gray">
                          {{ item.position.name["ru"] }}
                        </div>
                      </div>
                      <div class="column is-4">{{ item.workplace_count }}</div>

                      <div class="column is-2 has-text-centered">
                        <!-- <div class="icon-rotate-90">
                          <d-icon
                            class="sm-icon icon-btn icon-more-btn"
                            icon="more"
                          />
                        </div> --><d-dropdown>
                          <template #body>
                            <d-icon
                              icon="more"
                              class="custom-dropdown__trigger size-1"
                              @click="open = !open"
                            />
                          </template>
                          <template #dropdown-menu>
                            <li @click="deleteWorkplace(item.id)">
                              <a href="#">
                                <d-icon
                                  icon="delete"
                                  class="rotate-minus-90"
                                ></d-icon>
                                Удалить
                              </a>
                            </li>
                          </template>
                        </d-dropdown>
                      </div>
                    </div>
                  </div>
                </router-link>
              </template>
            </d-lists>
          </div>
        </div>
      </div>
    </div>

    <!-- company right block -->
    <div class="column is-3 ml-3 pt-0">
      <div
        class="section__list company-structure-detail sticky-block h-100 pt-3"
        v-if="
          organizationInfo && organizationInfo.length && organizationInfo[0]
        "
      >
        <h4 class="title text-black">Информация о предприятии</h4>
        <div class="columns flex-wrap is-vcentered mx-0">
          <div class="column is-3">
            <div class="d-avatar-wrapper">
              <d-avatar
                cover
                width="72"
                height="72"
                :src="organizationInfo[0].image"
              />
              <span class="d-avatar-edit-icon">
                <!-- <d-icon icon="edit-circle-pen" /> -->
              </span>
            </div>
          </div>
          <div class="column py-0">
            <div class="text-gray">
              {{ organizationInfo[0].name["ru"] }}
            </div>
          </div>
        </div>

        <div class="mb-4">
          Область: {{ organizationInfo[0].district.city.name["ru"] }}
        </div>
        <div class="mb-4">
          Район: {{ organizationInfo[0].district.name["ru"] }}
        </div>
        <div class="mb-4">
          Общее кол-во рабочих мест: {{ organizationInfo[0].workplace_count }}
        </div>
        <div class="mb-4">
          Общее кол-во вакантных мест:
          {{ organizationInfo[0].free_workplace_count }}
        </div>
        <div class="mb-4">
          ИНН:
          {{ organizationInfo[0].inn }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lists from "@/components/Lists";

import { mapActions } from "vuex";

export default {
  components: {
    "d-lists": Lists,
    "d-avatar": () => import("@/components/Avatar"),
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-select": () => import("@/components/inputs/select"),
    "d-dropdown": () => import("@/components/Dropdown"),
    "d-modal": () => import("@/components/Modal"),
    "d-btn": () => import("@/components/buttons/loaderButton"),
    "d-input": () => import("@/components/inputs/input"),
    DAddBtn: () => import("@/components/AddButton"),
  },

  data() {
    return {
      id: 1,
      options: [{ title: "Подразделение", id: 1 }],
      options2: [{ title: "Должность", id: 1 }],
      workplaceList: [],
      workplaceAvailableList: [],
      organizationInfo: null,
      positionList: [],
      docList: [],
      departmentList: [],
      employeeList: [],
      openModal: false,
      loading: false,
      form: {
        department: "",
        position: "",
        employee: "",
        salary_rate: ""
      },
    };
  },
  methods: {
    ...mapActions("employeeSchedule", [
      "getWorkplaceList",
      "getWorkplaceAvailableList",
      "getOrganizationInfo",
      "getPositionList",
      "getDocList",
      "removeWorkplace",
      "removeDoc",
      "createOrUpdate",
      "getDepartmentList",
      "getEmployeeList",
    ]),
    createWorkPlace() {
      try {
        if (
          this.organizationInfo &&
          this.organizationInfo.length &&
          this.organizationInfo[0]
        ) {
          this.form.organization = this.organizationInfo[0].id;
          this.form.inn = this.organizationInfo[0].inn;

          this.createOrUpdate(this.form).then(() => {
            this.loading = true;
            this.getWorkplaceList()
              .then((res) => {
                this.workplaceList = res;
                this.getWorkplaceAvailableList().then((res) => {
                  this.workplaceAvailableList = res;
                  this.loading = false;
                });
              })
              .then(() => {
                this.openModal = false;
              });
          });
        }
      } catch (err) {
        console.error(err);
      }
    },
    async deleteWorkplace(id) {
      try {
        await this.removeWorkplace(id);
        this.workplaceList = await this.getWorkplaceList();
      } catch (err) {
        console.error(err);
      }
    },
    async deleteDoc(id) {
      try {
        await this.removeDoc(id);
        this.docList = await this.getDocList();
      } catch (err) {
        console.error(err);
      }
    },
    openModalAction() {
      this.openModal = true;
    },
  },
  async mounted() {
    try {
      this.loading = true;
      this.getWorkplaceList().then((res) => {
        this.workplaceList = res;
        this.loading = false;
      });
      this.workplaceAvailableList = await this.getWorkplaceAvailableList();
      this.organizationInfo = await this.getOrganizationInfo();
      this.docList = await this.getDocList();
      this.departmentList = await this.getDepartmentList();
      this.positionList = await this.getPositionList();
      this.getEmployeeList().then((res) => {
        if (res) {
          const fullNameKeys = ["first_name", "last_name", "middle_name"];

          this.employeeList = res.map((item) => {
            let name = {
              ru: "",
              uz: "",
            };

            // Object.keys(item).forEach((key) => {
            Object.keys(name).forEach((langKey) => {
              name[langKey] = fullNameKeys
                .map((fullNameKey) => item[fullNameKey][langKey])
                .join(" ");
            });
            // });

            return {
              ...item,
              name,
            };
          });
        }
      });
    } catch (err) {
      console.error(err);
    }
  },
};
</script>

<style lang="scss" scoped>
.emp-schedule-list {
  &-wrapper {
    font-size: 15px;
  }
  &-item {
    border-top: 1px dashed #eaedf3;
    &:first-child {
      border-top-color: transparent;
    }
  }
}

.right {
  display: flex;
  justify-content: flex-end;
}

.d-columns {
  display: flex;
  align-items: center;
}

.icon-container {
  background-color: #e9eef5;
  height: 48px;
  width: 48px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon-clock {
  position: relative;
  bottom: -3px;
}

.d-avatar-wrapper {
  position: relative;
  width: 72px;
  height: 72px;

  .d-avatar-edit-icon {
    position: absolute;
    bottom: -4px;
    right: 10px;
    display: block;
    width: 20px;
    cursor: pointer;
  }
}

.rotate-minus-90 {
  transform: rotate(0deg) !important;
}

.section__list {
  padding: 30px 20px;
  box-shadow: 0px 3px 10px #a1a1a124;
  border-radius: 4px;
  background-color: #fff;
}

.company-structure-row {
  max-height: 400px !important;
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

.attestation {
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

  .pagination {
    margin-top: auto;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
