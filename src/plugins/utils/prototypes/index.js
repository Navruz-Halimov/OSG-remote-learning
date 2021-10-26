import Vue from "vue";
import { getStyleProp, setStyleProp } from "@/plugins/style.variables";
const bulmaCalendar = require("bulma-calendar/dist/js/bulma-calendar.min.js");
import moment from "moment";
moment().format();

function ArrayNamesTofullName(arr, propKey = "name") {
  const fullNameKeys = ["first_name", "last_name", "middle_name"];
  console.log('arr', arr);
  
  return (arr || [])
    .filter((item) => item)
    .map((item) => {
      let name = {
        ru: "",
        uz: "",
      };

      Object.keys(name).forEach((langKey) => {
        name[langKey] = fullNameKeys
          .map((fullNameKey) => item[fullNameKey][langKey])
          .join(" ");
      });

      return {
        ...item,
        [propKey]: name,
      };
    });
}

Vue.prototype.$bulmaCalendar = bulmaCalendar;
Vue.prototype.$moment = moment;
Vue.prototype.$getStyleProp = getStyleProp;
Vue.prototype.$setStyleProp = setStyleProp;
Vue.prototype.$ArrayNamesTofullName = ArrayNamesTofullName;
