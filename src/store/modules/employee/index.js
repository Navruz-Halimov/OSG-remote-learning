const model = "employee";

export const actions = {
  fetchList(_, params) {
    return this.$axios.get(`/${model}/list/`, { params });
  },
  fetchDetail(_, { id, params }) {
    return this.$axios.get(`/${model}/detail/${id}`, { params });
  },
  fetchOrder(_, params) {
    return this.$axios.get(`/${model}/orderemplopyee/list/`, { params });
  },
  fetchOrderExtra(_, { id, params }) {
    return this.$axios.get(`/${model}/orderextra/detail/${id}`, { params });
  },
  fetchOrderEnd(_, { id, params }) {
    return this.$axios.get(`/${model}/orderend/detail/${id}`, { params });
  },
  fetchOrderEmplopyee(_, { id, params }) {
    return this.$axios.get(`/${model}/orderemplopyee/detail/${id}`, { params });
  },
  fetchCity(_, params) {
    return this.$axios.get("/wiki/city/list/", { params });
  },
  fetchDistrict(_, params) {
    return this.$axios.get("/wiki/district/list/", { params });
  },
  fetchNationality(_, params) {
    return this.$axios.get("wiki/nationality/list/", { params });
  },
  fetchCategory(_, params) {
    return this.$axios.get("wiki/category/list/", { params });
  },
  fetchSpeciality(_, params) {
    return this.$axios.get("wiki/speciality/list/", { params });
  },
  fetchParty(_, params) {
    return this.$axios.get("wiki/party/list/", { params });
  },
  fetchDepartment(_,params){
    return this.$axios.get("wiki/department/list/",{params});
  },
  fetchPosition(_,params){
    return this.$axios.get("wiki/position/list/",{params});
  },
  submit(_, payload) {
    try {
      const req = {
        method: payload.id ? "put" : "post",
        url: model + (payload.id ? "/update/" + payload.id : "/create/"),
      };
      const f = new FormData();
      Object.keys(payload).forEach((key) => {
        if (["first_name", "last_name", "middle_name"].includes(key)) {
          f.append(key, JSON.stringify(payload[key]));
          return;
        }
        f.append(key, payload[key]);
      });
      return this.$axios[req.method](req.url, f);
    } catch (error) {
      //
    }
  },
};
