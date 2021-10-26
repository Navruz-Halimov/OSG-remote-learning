const model = "employee/employeevacation";

export const actions = {
  fetchList(_, params) {
    return this.$axios.get(`/${model}/list/`, {
      params,
    });
  },

  fetchDetail(_, id) {
    return this.$axios.get(`/${model}/detail/${id}`);
  },

  submit(_, payload) {
    const f = new FormData();

    Object.keys(payload).forEach((key) => {
      f.append(key, payload[key]);
    });

    const req = {
      method: payload.id ? "put" : "post",
      url: payload.id ? "update/" + payload.id : "create/",
    };
    return this.$axios[req.method](`/${model}/${req.url}`, f);
  },

  remove(_, id) {
    return this.$axios.delete(`/${model}/delete/${id}`);
  },
};
