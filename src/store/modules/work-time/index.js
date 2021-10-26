export const actions = {
  getListEmp(_, { params }) {
    return this.$axios.get("/attendance/employee/list/", { params });
  },
  getDetailEmp(_, id) {
    return this.$axios.get(`/attendance/employee/detail/${id}`);
  }
};
