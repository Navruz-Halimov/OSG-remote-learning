const model = "employee/workplace";

export const actions = {
  fetchList(_, params) {
    return this.$axios
      .get("/employee/organization/workplace/list/", {
        params,
      })
      .then((res) => (res && res.data && res.data.results) || [])
      .catch((err) => {
        console.error(err);
        return [];
      });
  },

  fetchDetail(_, id) {
    return this.$axios.get(`/${model}/detail/${id}`);
  },

  submit(_, payload) {
    const req = {
      method: payload.id ? "put" : "post",
      url: payload.id ? "update/" + payload.id : "create/",
    };
    return this.$axios[req.method](`/${model}/${req.url}`);
  },

  remove(_, id) {
    return this.$axios.delete(`/${model}/delete/${id}`);
  },
};
