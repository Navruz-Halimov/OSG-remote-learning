import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vSelect from "vue-select";
import "./assets/scss/main.scss";
import "./assets/fonts/fonts.css";
import "bulma-calendar/dist/css/bulma-calendar.min.css";
import routerMethods from "@/mixins/router.methods.mixin";
import Vuelidate from "vuelidate";

import { BadgerAccordion, BadgerAccordionItem } from "vue-badger-accordion";
import VueApexCharts from "vue-apexcharts";
Vue.use(Vuelidate);
Vue.use(VueApexCharts);

import i18n from "@/plugins/i18n";

// include prototypes
import "@/plugins/utils/prototypes";

Vue.mixin({
  ...routerMethods
});

Vue.component("apexchart", VueApexCharts);
Vue.component("v-select", vSelect);
Vue.component("BadgerAccordion", BadgerAccordion);
Vue.component("BadgerAccordionItem", BadgerAccordionItem);
Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount("#app");
