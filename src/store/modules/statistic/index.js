export const actions = {
  getCountEmployees() {
    return this.$axios.get("/employee/statistics/count/");
  },
  getCountCategory() {
    return this.$axios.get("/employee/statistics/categories/");
  },
  getCountAge() {
    return this.$axios.get("/employee/statistics/age/");
  },
  getCountPosition() {
    return this.$axios.get("/employee/statistics/positions/");
  },
  getCountNewEmp() {
    return this.$axios.get("/employee/statistics/recruits/");
  },
};
