import { mapActions } from "vuex";

export default {
  props: {
    formId: {
      type: [Number, String],
      default: () => null,
    },
  },

  watch: {
    formId: {
      handler: "fetchData",
      immediate: true,
    },
  },

  components: {
    // "d-input": () => import("@/components/inputs/input"),
    "d-select": () => import("@/components/inputs/select"),
    "d-date-selector": () => import("@/components/inputs/date-selector"),
    "d-button": () => import("@/components/buttons/loaderButton"),
    LoadingProgress: () => import("@/components/Loading-progress"),
  },

  methods: {
    ...mapActions("catalog", ["get"]),
    ...mapActions("employeeWorkplace", {
      getWorkPlaces: "fetchList",
    }),

    ...mapActions("employee", {
      getEmployeeByFilterProps: "fetchList",
    }),

    ...mapActions("employeeVacation", ["submit", "fetchDetail"]),
    ...mapActions("employeeOrderuniversal", {
      orderuniversalCreate: "create",
    }),

    fetchData() {
      this.pending = true;
      this.fetchDetail(this.formId)
        .then((res) => {
          const resForm = (res && res.data) || {};
          this.pending = false;
          if (resForm) {
            // Object.keys(resForm).forEach( key => {
            //   if(key in this.form){
            //     this.form[key] = resForm[key]
            //   }
            // })
            this.$set(this.form, "id", resForm.id);
            this.form.vacation_type = resForm.vacation_type.id;
            this.form.place = resForm.place.id;
            this.form.date_from = resForm.date_from;
            this.form.date_to = resForm.date_to;
            this.form.employee = resForm.employee.id;
            this.filterProps.workplace_id =
              resForm.employee.current_workplace.id;
            this.filterProps.department_id =
              resForm.employee.current_department.id;
            const [nameProp] = this.$ArrayNamesTofullName([resForm.employee]);
            // console.log("nameProp", nameProp);
            const f = this.employeeList.findIndex(
              (item) => item.id == nameProp.id
            );
            if (f == -1) {
              this.employeeList = [nameProp, ...this.employeeList];
            }
          }

          console.log("res", res);
        })
        .catch((err) => {
          console.error(err);
          this.pending = false;
        });
    },

    handleSelectChange(key, value) {
      const stateKey = key + "_id";
      if (stateKey in this.filterProps) {
        this.filterProps[stateKey] = value;
        this.form.employee = null;

        // if (key == "deparment") {
        //   this.filterProps.workplace_id = null;
        // }

        if (
          Object.keys(this.filterProps).some((item) => !!this.filterProps[item])
        ) {
          this.getEmployeeByFilterProps({
            deparment_id: this.filterProps.deparment_id,
            workplace_id: this.filterProps.workplace_id,
            city_id: this.filterProps.city_id,
          }).then((res) => {
            this.employeeList = this.$ArrayNamesTofullName(
              (res && res.data && res.data.results) || []
            );
          });
        }
      }
    },

    isValid() {
      if (Object.keys(this.form).some((item) => !this.form[item])) {
        this.errors = ["Заполните все поля"];
        this.pending = false;
        return false;
      }
      return true;
    },

    submitVacation() {
      this.pending = true;
      this.errors = [];

      if (!this.isValid()) return;

      this.submit(this.form)
        .then((res) => {
          console.log("submit", res);
          if (res && res.data && !this.form.id) {
            this.orderuniversalCreate({
              empl_id: res.data.employee,
              order_number: res.data.id,
              start_date: res.data.date_from,
              expiration_date: res.data.date_to,
              description: JSON.stringify({
                ru: "",
                uz: "",
              }),
            }).then((xres) => {
              console.log("xres", xres);
              this.pending = false;
              this.toBack();
            });
            return
          }
          this.pending = false;
          this.toBack();
        })
        .catch((err) => {
          console.error(err);
          this.pending = false;
        });
    },
  },

  mounted() {
    this.get("department").then((res) => {
      this.departmentList = res || [];
    });

    this.get("city").then((res) => {
      this.cityList = res || [];
    });

    this.getWorkPlaces().then((res) => {
      this.workplaceList = (res || []).map((item) => ({
        ...item,
        name: item.position.name,
      }));
    });

    this.getEmployeeByFilterProps().then((res) => {
      this.employeeList = this.$ArrayNamesTofullName(
        (res && res.data && res.data.results) || []
      );
    });

    // this.get("department").then((res) => {
    //   this.departmentList = res || [];
    // });
  },

  data() {
    return {
      departmentList: [],
      workplaceList: [],
      employeeList: [],
      cityList: [],
      errors: [],

      form: {
        date_from: null,
        date_to: null,
        employee: null,
        vacation_type: 1,
        place: null,
      },

      filterProps: {
        deparment_id: null,
        workplace_id: null,
        city_id: null,
      },

      order_id: null,
      pending: false,
    };
  },
};
