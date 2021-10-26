<template>
  <div class="columns padding-sm-x employee__registration">
    <div class="column is-12 order__create-left">
      <div class="section__list order-create-right">
        <div class="columns padding-sm-x">
          <div class="column">
            <h4 class="title">Персональные данные гражданина</h4>
          </div>
          <div class="column is-3">
            <div class="lang-row">
              <div
                class="lang-row__item"
                v-for="(item, index) in langOptions"
                :key="item" @click="onLangClick(item)"
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
          </div>
          <div class="column"></div>
        </div>
        <div class="columns padding-sm-x">
          <div class="column is-4">
            <div class="employee__profile-photo">
              <img :src=" form && form.photo || '../../../assets/images/user.png' " alt="">
              <input type="file" @change="handleFileUpload" title="" />
            </div>
            <div class="employee__profile-surname employee__input">
              <div class="secondary-title">Фамилия</div>
              <d-input
                placeholder="Введите текст"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.last_name[currLang]"
              />
            </div>
            <div class="employee__profile-name employee__input">
              <div class="secondary-title">Имя</div>
              <d-input
                placeholder="Введите текст"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.first_name[currLang]"
              />
            </div>
            <div class="employee__profile-midname employee__input">
              <div class="secondary-title">Отчество</div>
              <d-input
                placeholder="Введите текст"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.middle_name[currLang]"
              />
            </div>
            <div class="employee__profile-subdivision">
              <div class="secondary-title">Категория</div>
              <d-select
                class="grey rounded"
                placeholder="Введите текст"
                :options="category"
                label="name"
                ml
                v-model="form.category"
                :reduce="(item) => item.id"
              ></d-select>
            </div>
            <div class="employee__profile-position employee__input">
              <div class="secondary-title">судебный опыт</div>
              <d-input
                placeholder="Введите текст"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.judicial_experience"
              />
            </div>
            <div class="employee__profile-position employee__input">
              <div class="secondary-title">другой опыт</div>
              <d-input
                placeholder="Введите текст"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.other_experience"
              />
            </div>
            <div class="employee__profile-position employee__input">
              <div class="secondary-title">free_experience</div>
              <d-input
                placeholder="Введите текст"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.free_experience"
              />
            </div>
            <div class="employee__profile-position employee__input">
              <div class="secondary-title">gender</div>
              <select
                name=""
                id=""
                v-model="form.gender"
                class="gender__select"
              >
                <option value="0">Male</option>
                <option value="1">Female</option>
              </select>
            </div>
          </div>
          <div class="column is-4">
            <div class="employee__input">
              <div class="columns padding-sm-x">
                <div class="column is-6">
                  <div class="secondary-title">ПИНФЛ</div>
                  <d-input
                    placeholder="123456789999999"
                    size
                    type="text"
                    class="grey"
                    rounded
                    v-model="form.pinfl"
                  />
                </div>
                <div class="column is-6">
                  <div class="secondary-title">ИНН</div>
                  <d-input
                    placeholder="Введите номер"
                    size
                    type="text"
                    class="grey"
                    rounded
                    v-model="form.inn"
                  />
                </div>
              </div>
            </div>

            <div class="columns padding-sm-x">
              <div class="column is-6">
                <div class="secondary-title">Место рождения</div>
                <d-select
                  class="grey rounded"
                  placeholder="Введите текст"
                  :options="city"
                  label="name"
                  ml
                  v-model="form.birth_place"
                  :reduce="(item) => item.id"
                ></d-select>
              </div>
              <div class="column is-6">
                <div class="secondary-title">Национальность</div>
                <d-select
                  class="grey rounded"
                  placeholder="Введите текст"
                  :options="nationality"
                  label="name"
                  ml
                  v-model="form.nationality"
                  :reduce="(item) => item.id"
                ></d-select>
              </div>
            </div>
            <div class="employee__input">
              <div class="secondary-title">Адрес проживания</div>
              <d-select
                class="grey rounded"
                placeholder="Введите текст"
                :options="district"
                label="name"
                ml
                v-model="form.living_place"
                :reduce="(item) => item.id"
              ></d-select>
            </div>
            <div class="employee__input">
              <div class="secondary-title">Номер паспорта</div>
              <d-input
                placeholder="Введите номер"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.passport_serial"
              />
            </div>
            <div class="employee__profile-passport employee__input">
              <div class="secondary-title">passport</div>
              <d-input
                placeholder="file"
                size
                type="file"
                class="grey employee__passport-file"
                rounded
                @change="handleFileUpload()"
              />
            </div>
            <div class="employee__profile-passport employee__input">
              <div class="secondary-title">fingerprint photo</div>
              <d-input
                placeholder="file"
                size
                type="file"
                class="grey employee__passport-file"
                rounded
                @change="handleFileUpload()"
              />
            </div>
            <div class="employee__profile-passport employee__input">
              <div class="secondary-title">sign</div>
              <d-input
                @change="handleFileUpload()"
                placeholder="file"
                size
                type="file"
                class="grey employee__passport-file"
                rounded
              />
            </div>
            <div class="employee__input">
              <div class="secondary-title">Passport given date</div>
              <d-date-selector
                class="modal-variant-1"
                grey
                v-model="form.passport_given_date"
              ></d-date-selector>
            </div>
            <div class="employee__input">
              <div class="secondary-title">Passport expire date</div>
              <d-date-selector
                class="modal-variant-1"
                grey
                v-model="form.passport_expiry_date"
              ></d-date-selector>
            </div>
            <div class="employee__input">
              <div class="secondary-title">Дата рождения</div>
              <d-date-selector
                class="modal-variant-1"
                grey
                v-model="form.dob"
              ></d-date-selector>
            </div>
          </div>

          <div class="column is-4">
            <div class="employee__input">
              <div class="secondary-title">Специальность</div>
              <d-select
                class="grey rounded"
                placeholder="Введите текст"
                :options="speciality"
                label="name"
                ml
                v-model="form.speciality"
                :reduce="(item) => item.id"
              ></d-select>
            </div>
            <div class="employee__input">
              <div class="secondary-title">Телефон</div>
              <d-input
                placeholder="Введите номер"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.phone"
              />
            </div>
            <div class="employee__input">
              <div class="secondary-title">E-mail</div>
              <d-input
                placeholder="Введите текст"
                size
                type="email"
                class="grey"
                rounded
                v-model="form.email"
              />
            </div>
            <div class="employee__profile-position employee__input">
              <div class="secondary-title">Квалификационный чин</div>
              <d-input
                placeholder="Введите текст"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.qualifying_rank[currLang]"
              />
            </div>
            <div class="employee__input">
              <div class="secondary-title">Депутатность</div>
              <d-input
                placeholder="Введите текст"
                size
                type="text"
                class="grey"
                rounded
                v-model="form.deputy_nomination"
              />
            </div>
           <div class="employee__profile-position employee__input">
              <div class="secondary-title">party nomination</div>
                <d-select
                class="grey rounded"
                placeholder="Введите текст"
                :options="party"
                label="name"
                ml
                v-model="form.party_affiliation"
                :reduce="(item) => item.id"
              ></d-select>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column is-6">
            <d-button text="Отменить" rounded color="is-grey" @click="changeRouter()"></d-button>
          </div>
          <div class="column is-6 right" style="text-align: right">
            <d-button
              :text="notLastLang ? 'Далее' : 'Сохранить'"
              :disabled="!currFieldsFilled" 
              rounded
              color="blue"
              type="submit"
              @click="SubmitFile()"
            ></d-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DDropdown from "@/components/Dropdown";
import { mapActions } from "vuex";

export default {
  components: {
    // DDropdown,
    "d-input": () => import("@/components/inputs/input"),
    "d-select": () => import("@/components/inputs/select"),
    "d-date-selector": () => import("@/components/inputs/date-selector"),
    "d-button": () => import("@/components/buttons/loaderButton"),
    "d-icon": () => import("@/components/icons/iconWrapper"),
    // "d-lists": () => import("@/components/Lists"),
    // "d-avatar": () => import("@/components/Avatar"),
  },
  data() {
    return {
      currLang: 'ru',
      langOptions: ["ru", "uz"],
      form: {
        photo: "",
        last_name: {
          ru: "",
          uz: "",
        },
        first_name: {
          ru: "",
          uz: "",
        },
        middle_name: {
          ru: "",
          uz: "",
        },
        judicial_experience: "",
        other_experience: "",
        free_experience: "",
        qualifying_rank: "",
        gender: "",
        pinfl: "",
        inn: "",
        living_place: {
          uz:'',
          ru:''
        },
        nationality: {
          uz:'',
          ru:'',
        },
        birth_place: {
          uz:'',
          ru:''
        },
        passport_given_date: "",
        passport_expiry_date: "",
        dob: "",
        phone: "",
        email: "",
        category: {
          uz:'',
          ru:'',
        },
        deputy_nomination: "",
        party_affiliation: "",
        // sign: "",
        // passport_image: "",
        // fingerprint_image: "",
        speciality: "",
      },
      city: [],
      district: [],
      nationality: [],
      category: [],
      speciality: [],
      party:[],
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
    };
  },
  methods: {
    ...mapActions("employee", [
      "submit",
      "fetchCity",
      "fetchDistrict",
      "fetchNationality",
      "fetchSpeciality",
      "fetchCategory",
      "fetchDetail",
      "fetchParty",
    ]),
       fetchPartyEmployeeCreate() {
      this.loading = true;
      return this.fetchParty()
        .then((res) => {
          if (res && res.data) {
            console.log("party", res.data.results);
            this.party = res.data.results || [];
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    fetchCityEmployeeCreate() {
      this.loading = true;
      return this.fetchCity()
        .then((res) => {
          if (res && res.data) {
            console.log("city", res.data.results);
            this.city = res.data.results || [];
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    fetchCategoryEmployeeCreate() {
      this.loading = true;
      return this.fetchCategory()
        .then((res) => {
          if (res && res.data) {
            console.log("category", res.data.results);
            this.category = res.data.results || [];
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    fetchNationalityEmployeeCreate() {
      this.loading = true;
      return this.fetchNationality()
        .then((res) => {
          console.log(res);
          if (res && res.data) {
            console.log("nationality", res.data.results);
            this.nationality = res.data.results || [];
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    fetchDistrictEmployeeCreate() {
      this.loading = true;

      return this.fetchDistrict()
        .then((res) => {
          if (res && res.data) {
            console.log("district", res.data.results);
            this.district = res.data.results || [];
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    fetchSpecialityEmployeeCreate() {
      this.loading = true;

      return this.fetchSpeciality()
        .then((res) => {
          if (res && res.data) {
            console.log("speciality", res.data.results);
            this.speciality = res.data.results || [];
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    handleFileUpload(e) {
      console.log(e.target.files[0]);
      this.form.photo = e.target.files[0];
      // this.form.sign = e.target.files[0];
      // this.form.passport_image = e.target.files[0];
      // this.form.fingerprint_image = e.target.files[0];
    },
    SubmitFile() {
      if(this.notLastLang) {
          this.currLang = this.langOptions[this.langOptions.indexOf(this.currLang) + 1]
          return
      }
      this.loading = true;
      this.submit(this.form)
        .then((res) => {
          console.log("res", res);
          if(res && res.status && res.status == 201) {
            this.$router.go(-1)
          }
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
     changeRouter(){
     this.$router.push( '/employee');
    },
      onLangClick(langItem) {
                this.currLang = langItem
                //merged master
            },

  },
  computed: {
    mappedLivingPlace() {
      return this.city.map(item => {
        return {name: item.name[this.currLang], id: item.id}
      })
    },
    notLastLang() {
        return this.langOptions[this.langOptions.length - 1] != this.currLang
    },
    currFieldsFilled() {
        let langFields = ['first_name', 'last_name', 'middle_name']
        for(let key in this.form) {
            console.log("adsdasdasd", langFields.includes(key), key);
            if( langFields.includes(key) && !this.form[key][this.currLang] ) {
                return false
            } else if(!this.form[key]) {
                return false
            }
        }

        return true
    }
  },
  mounted() {
      this.fetchDetail({
      id: this.$route.params.id,
    })
      .then((res) => {
        console.log("employee detail", res);
        if (res && res.data) {
          for(let elem in this.form){
            if(elem == 'category'){
              this.form[elem] = JSON.parse(JSON.stringify(res.data[elem].id))
              continue
            }
            if(elem == 'birth_place'){
              this.form[elem] = JSON.parse(JSON.stringify(res.data[elem].id))
              continue
            }
             if(elem == 'living_place'){
              this.form[elem] = JSON.parse(JSON.stringify(res.data[elem].id))
              continue
            }
              if(elem == 'nationality'){
              this.form[elem] = JSON.parse(JSON.stringify(res.data[elem].id))
              continue
            }
             if(elem == 'party'){
              this.form[elem] = JSON.parse(JSON.stringify(res.data[elem].id))
              continue
            }
             if(elem == 'speciality'){
              this.form[elem] = JSON.parse(JSON.stringify(res.data[elem].id))
              continue
            }
            this.form[elem] =JSON.parse(JSON.stringify(res.data[elem]))
          }
        }
      })
      .catch((err) => console.log(err));
    this.fetchCityEmployeeCreate();
    this.fetchDistrictEmployeeCreate();
    this.fetchNationalityEmployeeCreate();
    this.fetchCategoryEmployeeCreate();
    this.fetchSpecialityEmployeeCreate();
    this.fetchPartyEmployeeCreate();

  },
};
</script>

<style lang="scss">

.employee__registration {
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
  .employee__input {
    margin-top: 24px;
  }
  .employee__profile-subdivision {
    margin-top: 24px;
  }
  .gender__select {
    width: 100%;
    height: 36px;
    background-color: #f4f5f8;
    border: 0 none;
    border-radius: 290486px;
  }
  .employee__profile-photo {
    width: 149px;
    height: 149px;
    position: relative;
    img{
      border-radius:50%;
      width: 100% !important;
      height:100% !important;
      object-fit: cover;
    }
    input {
      position: absolute;
      right: 0;
      bottom: 0;
      display: inline-block;
      cursor: pointer;
      width: 28px;
      height: 28px;
      &::after {
        content: "";
        width: 28px;
        height: 28px;
        background: #275395;
        position: absolute;
        background-image: url("../../../assets/icons/accordion_plus.svg");
        background-repeat: no-repeat;
        background-position: center;
        left: 0;
        border-radius: 50%;
      }
      &::-webkit-file-upload-button {
        visibility: hidden;
      }
    }
  }
  .employee__passport-file {
    input {
      position: relative;
      &::-webkit-file-upload-button {
        visibility: hidden;
      }
      &::after {
        content: "";
        background-repeat: no-repeat;
        background-image: url("../../../assets/icons/delete.svg");
        background-position: right center;
        text-align: center;
        padding-top: 5px;
        width: 15px;
        height: 100%;
        right: 20px;
        top: 0;
        position: absolute;
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
}
</style>
