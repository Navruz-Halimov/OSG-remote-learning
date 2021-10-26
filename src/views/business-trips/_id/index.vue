<template>
  <div class="columns attestation-id padding-sm-x">
    <div class="column is-9" style="position:relative">
      <d-ghost-loader :active="loading"/>
      <div class="section__list attestation-id-left">
        <div class="columns padding-sm-x">
          <div class="column">
            <button @click="toBack" class="primary-btn button back-button">
              <d-icon class="left-arrow" icon="left-arrow" />
              Назад
            </button>
            <h4 class="title">Сотрудники</h4>
            <h5 class="secondary-title">Данные о сотруднике</h5>
            <div class="columns py-3 profile-detail" v-if="data.employee">
              <div class="pt-1 pl-3">
                <d-avatar
                  cover
                  :src="data.employee.photo || require('@/assets/images/unnamed.jpg')"
                  height="64"
                  width="64"
                />
              </div>
              <div class="column py-0">
                <h3 class="mb-0">
                  {{data.employee.last_name[currLang]}} 
                  {{data.employee.first_name[currLang]}} 
                  {{data.employee.middle_name[currLang]}}
                </h3>
                <div class="text-gray pt-1">ID: {{data.employee && data.employee.register_number}}</div>
              </div>
            </div>
          </div>
          <div class="column">
            <d-dropdown class="businetrip-dropdowm">
              <template #body>
                <d-icon
                  icon="more"
                  class="custom-dropdown__trigger"
                  @click="open = !open"
                />
              </template>
              <template #dropdown-menu>
                <li>
                  <router-link :to="{name: 'businessTripsIdEdit', id: data.id }">
                    <d-icon icon="teacher-pen"></d-icon>
                    Редактирпвать
                  </router-link>
                </li>
                <li>
                  <a @click="onDeleteClick()">
                    <d-icon icon="delete"></d-icon>
                    Удалить
                  </a>
                </li>
              </template>
            </d-dropdown>
          </div>
        </div>
        <div class="columns padding-sm-x attestation-id-left__body">
          <div class="column is-4">
            <div class="py-2">Подразделение:</div>
            <div class="py-2">Должность:</div>
          </div>
          <div class="column">
            <div class="py-2">{{data.employee && data.employee.department && data.employee.department.en}}</div>
            <div class="py-2">{{data.employee && data.employee.position && data.employee.position[currLang]}}</div>
          </div>
        </div>
        <h5 class="secondary-title padding-sm-x">Данные о командировке</h5>
        <div class="columns padding-sm-x mb-0">
          <div class="column is-4">
            <div class="py-2">Пункт назначения:</div>
          </div>
          <div class="column">
            <div class="py-2">{{data.destination_point && data.destination_point[currLang]}}</div>
          </div>
        </div>
        <div class="columns padding-sm-x mb-0">
          <div class="column is-4">
            <div class="py-2">Принимающая сторона:</div>
          </div>
          <div class="column">
            <div class="py-2">{{data.host && data.host[currLang]}}</div>
          </div>
        </div>
        <div class="columns padding-sm-x mb-0">
          <div class="column is-4">
            <div class="py-2">Период командировки:</div>
          </div>
          <div class="column">
            <div class="py-2">{{data.trip_start}}г. - {{data.trip_end}}г.</div>
          </div>
        </div>
        <div class="columns padding-sm-x mb-0">
          <div class="column is-4">
            <div class="py-2">Цель командировки:</div>
          </div>
          <div class="column">
            <div class="py-2">{{data.trip_cause && data.trip_cause[currLang]}}</div>
          </div>
        </div>
        <div class="columns padding-sm-x mb-0">
          <div class="column is-4">
            <div class="py-2">Дата:</div>
          </div>
          <div class="column">
            <div class="py-2">22.09.2020</div>
          </div>
        </div>
        <div class="columns padding-sm-x mb-0">
          <div class="column is-4">
            <div class="py-2">Номер приказа:</div>
          </div>
          <div class="column">
            <div class="py-2">{{data.order && data.order.order_number}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-3" style="position:relative">
      <d-ghost-loader :active="loading"/>
      <div class="section__list attestation-id-right">
        <h4 class="title">Документы</h4>
        <div
          class="columns py-2 profile-detail padding-sm-x"
          v-for="item in data.businesstripdocument_set"
          :key="item.id"
        >
          <div class="icon-container">
            <img :src="require('@/assets/icons/word.png')" alt="" />
          </div>
          <div class="column py-0">
            <div>Договор №102 2250</div>
            <div class="text-gray time-div">
              <d-icon icon="time" class="icon-clock" /> 
              {{ $moment(item.updated_at).format("HH:mm  DD.MM.YYYY")}} |
              <a :href="item.document" class="download-link" download>
                Скачать &nbsp;
                <d-icon icon="download" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <d-modal
      :seen="deleteConfirm" 
      size="small"
      title="Добавить" 
      @closemodal="deleteConfirm = false"
    >
      <div>
        Вы уверены, что хотите удалить
      </div>
      <div class="is-flex mt-3 is-justify-content-flex-end">
        <d-button 
            class="directory__modal-btn"
            @click="removeTrip" 
            color="blue"
            :disabled="deleting"
            rounded
            text="Удалить"
        />
      </div>
    </d-modal>
  </div>
</template>

<script>
import DGhostLoader from '@/components/loaders/ghostLoader'
export default {
  components: {
    "d-dropdown": () => import("@/components/Dropdown"),
    "d-icon": () => import("@/components/icons/iconWrapper"),
    "d-avatar": () => import("@/components/Avatar"),
    "d-modal": () => import('@/components/Modal'),
    "d-button": () => import("@/components/buttons/loaderButton"),
    DGhostLoader
  },
  data() {
    return {
      deleteConfirm: false,
      data: {},
      currLang: 'ru',
      loading: false,
      deleting: false,
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    onDeleteClick() {
      this.deleteConfirm = true
    },
    removeTrip() {
      this.deleting = true
      this.$store.dispatch('businesstrip/removeTrip', this.$route.params.id)
        .then(() => {
            this.deleting = false
            this.deleteConfirm = false
            this.$router.go(-1)
        }).catch(() => {
            this.deleting = false
        });
    },
    fetchData() {
      this.loading = true
      this.$store.dispatch('businesstrip/fetchDetail', this.$route.params.id)
        .then((result) => {
          if(result && result.data)
            this.data = result.data
            this.loading = false
        }).catch((err) => {
            this.loading = false
            console.log("object", err)
        });
    },
  },
};
</script>

<style lang="scss">
.businetrip-dropdowm {
  .dd-ul-container {
    svg {
      transform: none !important;
    }
  }
}
.secondary-title {
  color: #9aa6bb;
  font-weight: 400;
  font-size: 16px;
}
.attestation-id {
  width: 100%;

  &-left {
    height: 100%;

    &__body {
      border-bottom: 1px dashed $lightgrey;
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
      min-width: 48px;

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