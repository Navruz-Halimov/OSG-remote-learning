<template>
  <div class="header" ref="headerRef">
    <div class="header-menu">
      <!-- <a href="#" class="header-menu__item">Кабинет учебного отдела</a>
            <a href="#" class="header-menu__item">Кабинет преподавателя</a>
            <a href="#" class="header-menu__item">Кабинет обучающегося</a>
            <a href="#" class="header-menu__item">База тестов</a> -->
    </div>
    <div class="header-settings">
      <div class="header-settings__item">
        <div class="header-search">
          <d-icon icon="search"></d-icon>
        </div>
      </div>
      <div class="header-settings__item">
        <div class="header-lang control has-icons-left">
          <div class="select">
            <select>
              <option selected>Ru</option>
              <option>Uz</option>
            </select>
          </div>
          <span class="icon is-left">
            <d-icon icon="language"></d-icon>
          </span>
        </div>
      </div>
      <div class="header-settings__item">
        <div class="header-notification">
          <d-icon icon="notification"></d-icon>
        </div>
      </div>
      <div class="header-settings__item">
        <d-dropdown>
          <!-- dropdown types -->
          <template #body>
            <div class="header-account">
              <d-avatar
                :src="profile ? profile.image : null"
                height="100%"
                width="100%"
              />
            </div>
          </template>
          <template #dropdown-menu>
            <router-link
              tag="li"
              :to="{ name: 'myprofile' }"
              class="dd-item dd-list-item"
              @click="logout"
            >
              Мой профиль
            </router-link>
            <li class="dd-item dd-list-item" @click="logout">Выход</li>
          </template>
        </d-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import DIcon from "./icons/iconWrapper";
import DDropdown from "@/components/Dropdown";
import Avatar from "@/components/Avatar";
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      open: false,
      headerLeft: null
    };
  },
  components: {
    DIcon,
    DDropdown,
    "d-avatar": Avatar
  },
  computed: {
    ...mapState({
      profile: state => state.myprofile.info
    })
  },
  methods: {
    ...mapActions("myprofile", ["getProfileData"]),
    logout() {
      this.$store
        .dispatch("auth/logout")
        .then(() => this.$router.push({ name: "login" }));
    }
  },

  mounted() {
    this.getProfileData();
    const headerHeight = this.$refs.headerRef.offsetHeight;
    this.$setStyleProp("--header-height", headerHeight + "px");
  }
};
</script>

<style scoped></style>
