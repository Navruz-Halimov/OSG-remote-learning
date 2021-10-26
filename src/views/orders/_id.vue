<template>
  <div class="columns attestation-id padding-sm-x">
    <div class="column is-9">
      <div class="section__list attestation-id-left">
        <div class="columns padding-sm-x mb-0">
          <div class="column">
            <button @click="toBack" class="primary-btn button back-button">
              <d-icon class="left-arrow" icon="left-arrow" />
              Назад
            </button>
            <h4 class="title">Приказы</h4>
            <h5 class="secondary-title">Данные о сотруднике</h5>
            <div class="columns py-3 profile-detail">
              <div class="pt-1 pl-3">
                <d-avatar
                  cover
                  height="64"
                  :src=" orderEmployee && orderEmployee.employee && orderEmployee.employee.photo ||''"
                  width="64"
                />
              </div>
              <div class="column py-0">
                <h3 class="mb-0">
                  {{orderEmployee && orderEmployee.employee && orderEmployee.employee.first_name.ru ||''}}
                  {{orderEmployee && orderEmployee.employee && orderEmployee.employee.last_name.ru ||'' }}
                  {{orderEmployee && orderEmployee.employee && orderEmployee.employee.middle_name.ru || ''}}
                </h3>
                <div class="text-gray pt-1">
                  ID: {{ orderEmployee && orderEmployee.employee && orderEmployee.employee.register_number || ''}}
                </div>
              </div>
            </div>
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
                  <a href="#">
                    <d-icon icon="student-dashbord"></d-icon>
                    Classic mail
                  </a>
                </li>
                <li>
                  <a href="#">
                    <d-icon icon="student-dashbord"></d-icon>
                    UPS Delivery
                  </a>
                </li>
                <li>
                  <a href="#">
                    <d-icon icon="student-dashbord"></d-icon>
                    Private jet
                  </a>
                </li>
              </template>
            </d-dropdown>
          </div>
        </div>
        <div class="attestation-id-left__body">
          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">Идентификатор физического лица:</div>
            <div class="column">-</div>
          </div>
          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">Номер трудового договора:</div>
            <div class="column">45200005</div>
          </div>
          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">Дата заключения:</div>
            <div class="column">03.10.2020</div>
          </div>
          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">Вид занятости:</div>
            <div class="column">-</div>
          </div>
          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">Дата начала работы:</div>
            <div class="column">15.10.2020</div>
          </div>
          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">Ставка, оклад и надбавка:</div>
            <div class="column">-</div>
          </div>
        </div>
        <div class="extra">
          <h5 class="secondary-title padding-sm-x mb-0">
            Дата окончания дополнительного соглашения
          </h5>
          <div class="attestation-id-left__body">
            <div class="columns padding-sm-x my-0">
              <div class="column is-4">Номер дополнительного соглашения:</div>
              <div class="column">
                {{ (extraDetail && extraDetail.extra_agree_number) || "-" }}
              </div>
            </div>
            <div class="columns padding-sm-x mb-0">
              <div class="column is-4">Дата дополнительного соглашения:</div>
              <div class="column">
                {{ (extraDetail && extraDetail.extra_agree_date) || "-" }}
              </div>
            </div>
            <div class="columns padding-sm-x mb-0">
              <div class="column is-4">
                Дата окончания дополнительного соглашения:
              </div>
              <div class="column">
                {{
                  (extraDetail && extraDetail.extra_agree_expiration_date) ||
                    "-"
                }}
              </div>
            </div>
          </div>
        </div>
        <h5 class="secondary-title padding-sm-x mb-0">
          Прекращение трудового договора
        </h5>
        <div class="attestation-id-left__body">
          <div class="columns padding-sm-x my-0">
            <div class="column is-4">Дата увольнения:</div>
            <div class="column">
              {{ (orderEnd && orderEnd.fire_date) || "-" }}
            </div>
          </div>
          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">По статье:</div>
            <div class="column">
              {{ (orderEnd && orderEnd.reason && orderEnd.reason.ru) || "-" }}
            </div>
          </div>
          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">Номер приказа:</div>
            <div class="column">13500001</div>
          </div>
          <div class="columns padding-sm-x mb-0">
            <div class="column is-4">Дата приказа:</div>
            <div class="column">25.09.2020</div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-3">
      <div class="section__list attestation-id-right">
        <h4 class="title">Документы</h4>
        <div
          class="columns py-2 profile-detail padding-sm-x"
          v-for="item in 2"
          :key="item + 2"
        >
          <div class="icon-container">
            <img :src="require('@/assets/icons/word.png')" alt="" />
          </div>
          <div class="column py-0">
            <div>Договор №102 2250</div>
            <div class="text-gray time-div">
              <d-icon icon="time" class="icon-clock" />
              12:20 15.09.2020 |
              <a href="#" class="download-link">
                Скачать &nbsp;
                <d-icon icon="download" />
              </a>
            </div>
          </div>
          <d-icon icon="more" class="icon-more" @click="open = !open" />
        </div>
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
  },
  data() {
    return {
      // results: [],
      extraDetail: [],
      orderEnd: [],
      orderEmployee: [],
    };
  },
  methods: {
    ...mapActions("employee", [
      "fetchOrderEmplopyee",
      "fetchOrderEnd",
      "fetchOrderExtra",
    ]),
  },
  mounted() {
    this.fetchOrderEnd({
      id: this.$route.params.id,
    })
      .then((res) => {
        this.orderEnd = res.data;
        console.log("orderEnd", this.orderEnd);
      })
      .catch((err) => console.log(err));

    this.fetchOrderEmplopyee({
      id: this.$route.params.id,
    })
      .then((res) => {
        console.log("orderEmployee", res);
        this.orderEmployee = res.data;
        console.log("orderEmployee", this.orderEmployee);
      })
      .catch((err) => console.log(err));

    this.fetchOrderExtra({
      id: this.$route.params.id,
    })
      .then((res) => {
        console.log("extra data", res);
        this.extraDetail = res.data;
        console.log("Det", this.extraDetail);
      })
      .catch((err) => console.log(err));

    // this.fetchDetailOrder({
    //   id: this.$route.params.id,
    // })
    //   .then((res) => {
    //     console.log("OrderDetails", res);
    //     if (res && res.data) {
    //       this.results = res.data;
    //     }
    //   })
    //   .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
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
    box-shadow: 0px 3px 10px #a1a1a124;
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
      justify-content: space-between;
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
</style>
