export const state = {
  results: null,
  count: null
};
export const mutations = {
  setState(state, payload) {
    Object.keys(payload).forEach(key => {
      if (key in state) {
        state[key] = payload[key];
      }
    });
  }
};
export const actions = {
  getListOperators({ commit }, params) {
    return this.$axios.get("/user/list/", { params }).then(res => {
      if (res && res.data) {
        const t = {
          results: res.data.results || [],
          count: res.data.count || 0
        };
        commit("setState", t);

        return t;
      }
    });
  },
  getDetailOperator(_, id) {
    return this.$axios.get(`/user/detail/${id}`);
  },
  updateUser(_, { id, params }) {
    const f = new FormData();
    Object.keys(params).forEach(key => {
      f.append(key, params[key]);
    });
    return this.$axios.put(`/user/update/${id}`, f);
  },
  createOperator(_, params) {
    const f = new FormData();
    Object.keys(params).forEach(key => {
      f.append(key, params[key]);
    });
    return this.$axios.post("/user/create/", f);
  }
};
