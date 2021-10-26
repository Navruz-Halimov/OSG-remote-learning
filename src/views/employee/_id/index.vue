<template>
  <div class="columns flex-1 employee-detail-container">
    <!-- left side -->
    <div class="column p-0">
      <div class="section__list attestation-id-left h-100 pt-5">
        <div class="columns padding-sm-x">
          <div class="column">
            <button @click="toBack" class="primary-btn button back-button">
              <d-icon class="left-arrow" icon="left-arrow" />
              Назад
            </button>
          </div>
          <div class="column">
            <d-dropdown>
              <template #body>
                <d-icon
                  icon="more"
                  class="custom-dropdown__trigger"
                  @click="open = !open"
                />
              </template>
              <template #dropdown-menu>
                <li>
                  <router-link :to="{name: 'employeeIdEdit', id: $route.params.id }">
                       <!-- <d-icon icon="teacher-pen"></d-icon> -->
                    Редактирпвать
                  </router-link>
                </li>
                <li>
                  <a href="javascript:void(0)"> 
                    <!-- <d-icon icon="delete "></d-icon> -->
                    Удалить </a>
                </li>
              </template>
            </d-dropdown>
          </div>
        </div>
        <div class="columns mx-0">
          <div class="column pt-0">
            <h4 class="title mt-0 mb-2">Персональные данные гражданина</h4>
            <!-- <h5 class="secondary-title">Данные о сотруднике</h5> -->
            <div class="columns py-3 profile-detail">
              <div class="pt-1 pl-3">
                <d-avatar
                  cover
                  :src="(results && results.photo) || ''"
                  height="64"
                  width="64"
                />
              </div>
              <div class="column py-0">
                <h3 class="mb-0">
                  {{
                    (results && results.first_name && results.first_name.ru) ||
                      ""
                  }}
                  {{
                    (results &&
                      results.middle_name &&
                      results.middle_name.ru) ||
                      ""
                  }}
                  {{
                    (results && results.last_name && results.last_name.ru) || ""
                  }}
                </h3>
                <div class="text-gray pt-1">
                  ID:{{ (results && results.register_number) || "" }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- form inputs -->
        <div class="columns padding-sm-x attestation-id-left__body">
          <div class="column">
            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Подразделение:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.department&& results.department.ru) || "" }}
                </div>
              </div>
            </div>

            <!-- Должность -->
            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Должность:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.position&& results.position.ru) || "" }}
                </div>
              </div>
            </div>

            <!-- Ставка -->
            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Ставка:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.salary_rate) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Общий стаж работы:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{
                    (results &&
                      parseInt(results.judicial_experience) +
                        parseInt(results.other_experience)) ||
                      ""
                  }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">
                  Стаж работы в судебной системе:
                </div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.judicial_experience) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Стаж работы в другой сфере:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.other_experience) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Период без работы:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.free_experience) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">ПИНФЛ:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">{{ (results && results.pinfl) || "" }}</div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">ИНН:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">{{ (results && results.inn) || "" }}</div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Номер паспорта:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.passport_serial) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Дата рождения:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">{{ (results && results.dob) || "" }}</div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Место рождения:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{
                    (results &&
                      results.birth_place &&
                      results.birth_place.city &&
                      results.birth_place.city.name &&
                      results.birth_place.city.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Адрес проживания:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  <!-- Ташкент, Мирабадский р-он, ул. Амира Темура 74А   -->
                  {{
                    (results &&
                      results.birth_place &&
                      results.birth_place.city &&
                      results.birth_place.city.name &&
                      results.birth_place.city.name.ru) ||
                      ""
                  }}
                  {{results && results.living_place && results.living_place.name && results.living_place.name.ru }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Национальность:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{
                    (results &&
                      results.nationality &&
                      results.nationality.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Специальность:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{
                    (results &&
                    results.employeespeciality_set &&
                      results.employeespeciality_set.length &&
                      results.employeespeciality_set[0].speciality.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Партийность:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.party_affiliation) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Образование:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.education && results.education.ru) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Ученая степень:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{
                    ( results && results.employeeacademicdegree_set && results.employeeacademicdegree_set.length &&
                      results.employeeacademicdegree_set[0] &&
                      results.employeeacademicdegree_set[0].name &&
                      results.employeeacademicdegree_set[0].name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Ученое звание:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{
                    (results.employeeacademictitle_set && results.employeeacademictitle_set.length &&
                      results.employeeacademictitle_set[0] &&
                      results.employeeacademictitle_set[0].name &&
                      results.employeeacademictitle_set[0].name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>
            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Квалификационный чин:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{
                    (results &&
                      results.qualifying_rank &&
                      results.qualifying_rank.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>
            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Государственные награды:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{
                    (results.employeestateaward_set && results.employeestateaward_set.length &&
                      results.employeestateaward_set[0].name &&
                      results.employeestateaward_set[0].name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>
            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Депутатность:</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  {{ (results && results.deputy_nomination) || "" }}
                </div>
              </div>
            </div>
            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Телефон</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  <a href="tel:+998480004400">{{
                    (results && results.phone) || ""
                  }}</a>
                </div>
              </div>
            </div>
            <div class="columns mb-0">
              <div class="column pb-0">
                <div class="py-2 text-gray">Почта</div>
              </div>
              <div class="column pb-0">
                <div class="py-2">
                  <a href="mailto:alimo@gmail.com">{{
                    (results && results.email) || ""
                  }}</a>
                </div>
              </div>
            </div>

            <!--

            
            
            
            
            
            
            
            
            

            -->
          </div>
        </div>
      </div>
    </div>

    <!-- right side -->
    <div class="column ml-2">
      <!-- v-for="info in results" :key="info.id" -->
      <!-- tabs -->
      <d-tabs-underline
        tab-class="employee-tabs mt-2"
        btn-class="employee-tab-btn"
        class="employee-tabs-container"
      >
        <d-tabs-underline-item
          name="1"
          tab="Данные об образовании"
          class="section__list"
        >
          <div
            class="userdetails__wrapper"
            v-for="details in results.employeeknowledge_set"
            :key="details.id"
          >
            <div class="columns mb-0">
              <div class="column py-0">
                <div class="py-2 text-primary">
                  Наименование высшего учебного заведения:
                </div>
              </div>
              <div class="column py-0">
                <div class="py-2">
                  {{
                    (details &&
                      details.university &&
                      details.university.name &&
                      details.university.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column">
                <div class="py-2 text-primary">Дата поступления:</div>
              </div>
              <div class="column">
                <div class="py-2">
                  {{ (details && details.start_date) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column">
                <div class="py-2 text-primary">Дата окончания:</div>
              </div>
              <div class="column">
                <div class="py-2">
                  {{ (details && details.graduate_date) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column">
                <div class="py-2 text-primary">Факультет:</div>
              </div>
              <div class="column">
                <div class="py-2">
                  {{
                    (details &&
                      details.faculty &&
                      details.faculty.name &&
                      details.faculty.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column">
                <div class="py-2 text-primary">Специальность:</div>
              </div>
              <div class="column">
                <div class="py-2">
                  {{
                    (details &&
                      details.speciality &&
                      details.speciality.name &&
                      details.speciality.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column">
                <div class="py-2 text-primary">Серия и номер диплома:</div>
              </div>
              <div class="column">
                <div class="py-2">
                  {{ (details && details.diploma_serial) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column">
                <div class="py-2 text-primary">Дата регистрации диплома:</div>
              </div>
              <div class="column">
                <div class="py-2">
                  {{ (details && details.diploma_register_date) || "" }}
                </div>
              </div>
            </div>

            <div class="columns mb-0">
              <div class="column">
                <div class="py-2 text-primary">Полученная степень:</div>
              </div>
              <div class="column">
                <div class="py-2">
                  {{
                    (details &&
                      details.level &&
                      details.level.name &&
                      details.level.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>
          </div>
        </d-tabs-underline-item>

        <d-tabs-underline-item
          name="2"
          tab="Записи трудовой книжки"
          class="section__list"
        >
          <div
            class="wrokplace__wrapper"
            v-for="workplace in results.workplace_set"
            :key="workplace.id"
          >
            <div class="columns">
              <div class="column py-0">
                <div class="py-2 text-primary">Регион организации:</div>
              </div>
              <div class="column py-0">
                <div class="py-2">
                  {{
                    (workplace &&
                      workplace.organization &&
                      workplace.organization.district &&
                      workplace.organization.district.city.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column py-0">
                <div class="py-2 text-primary">Район организации:</div>
              </div>
              <div class="column py-0">
                <div class="py-2">
                  {{
                    (workplace &&
                      workplace.organization &&
                      workplace.organization.district &&
                      workplace.organization.district.name &&
                      workplace.organization.district.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column py-0">
                <div class="py-2 text-primary">Наименование организации:</div>
              </div>
              <div class="column py-0">
                <div class="py-2">
                  {{
                    (workplace &&
                      workplace.organization &&
                      workplace.organization.name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column py-0">
                <div class="py-2 text-primary">ИНН организации:</div>
              </div>
              <div class="column py-0">
                <div class="py-2">{{ (workplace && workplace.inn) || "" }}</div>
              </div>
            </div>
          </div>
        </d-tabs-underline-item>

        <d-tabs-underline-item
          name="3"
          tab="Данные о родственных связях"
          class="section__list"
        >
          <div
            class="relation__wrapper"
            v-for="relative in results.employeerelative_set"
            :key="relative.id"
          >
            <div class="columns">
              <div class="column py-0">
                <div class="py-2 text-primary">Степень родства:</div>
              </div>
              <div class="column py-0">
                <div class="py-2">
                  {{
                    (relative && relative.full_name && relative.full_name.ru) ||
                      ""
                  }}
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column py-0">
                <div class="py-2 text-primary">Серия и номер паспорта:</div>
              </div>
              <div class="column py-0">
                <div class="py-2">
                  {{ (relative && relative.passport_number) || "" }}
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column py-0">
                <div class="py-2 text-primary">Дата рождения:</div>
              </div>
              <div class="column py-0">
                <div class="py-2">
                  {{ (relative && relative.birth_date) || "" }}
                </div>
              </div>
            </div>
            <div class="columns">
              <div class="column py-0">
                <div class="py-2 text-primary">Паспорт:</div>
              </div>
            </div>

            <div class="passport-wrapper">
              <div class="columns">
                <div class="column">
                  <img
                    :src="(relative && relative.passport_image) || ''"
                    alt="passport"
                  />
                </div>
              </div>
            </div>
          </div>
        </d-tabs-underline-item>

        <!-- <d-tabs-underline-item
          name="4"
          tab="Знание языков"
          class="section__list"
          disabled
        /> -->
      </d-tabs-underline>
    </div>

    <div class="emp__detail__actions">
      <div class="flex-row justify-content-end">
        <div class="emp__detail__btn mr-5">Распечатать</div>
        <div class="emp__detail__btn ml-5">Экспорт</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {
    "d-dropdown": () => import("@/components/Dropdown"),
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-avatar": () => import("@/components/Avatar"),
    //  "d-modal": () => import('@/components/Modal'),
      // "d-button": () => import("@/components/buttons/loaderButton"),
    DTabsUnderline: () => import("@/components/TabsUnderline"),
    DTabsUnderlineItem: () => import("@/components/TabsUnderlineItem"),
  },

  data() {
    return {
      a: {},
      results: [],
    };
  },

  methods: {
    ...mapActions("employee", ["fetchDetail"]),
    testf() {
      console.log(this.property1);
    },
  },
  mounted() {
    this.fetchDetail({
      id: this.$route.params.id,
    })
      .then((res) => {
        console.log("employee", res);
        if (res && res.data) {
          this.results = res.data;
        }
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
div.employee-detail-container {
  margin-top: -40px;
  margin-left: -50px;
  margin-right: -40px;
  margin-bottom: 60px !important;
}

.employee-tabs-container {
  .section__list {
    height: calc(100vh - 275px);
    padding: 30px;
  }
}
.employee-tabs {
  border: 1px solid #bdc7d8;
  border-radius: 4px;
  opacity: 0.8;
  padding: 15px 11px;
  display: flex;
  flex-flow: row nowrap;
}

.employee-tab-btn {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 10px #a1a1a124;
  border-radius: 4px;
  opacity: 1;
  flex: 1;
  margin: 0 5px;
  padding: 11px 12px;
  font-size: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  color: $grey;
  transition: color 0.15s;

  &.active {
    color: #000;
  }
}

.emp__detail__actions {
  position: fixed;
  left: var(--sidebar-width);
  right: 0;
  bottom: 0;
  padding: 17px 100px 17px 20px;
  background: #5275aa 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 6px #a1a1a129;
  animation: slideUp 0.3s;

  .emp__detail__btn {
    box-shadow: 0px 3px 10px #a1a1a124;
    border: 1px solid #ffffff;
    border-radius: 4px;
    text-align: center;
    color: #fff;
    padding: 6px 12px;
    cursor: pointer;
    user-select: none;
  }

  @keyframes slideUp {
    from {
      opacity: 0.8;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
</style>
