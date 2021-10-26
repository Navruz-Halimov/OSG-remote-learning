export const state = () => ({
    count: 0,
    results: [],
  });
  
  export const mutations = {
    setState(state, payload) {
      Object.keys(payload).forEach((key) => {
        if (key in state) {
          state[key] = payload[key];
        }
      });
    },
    removeState(state, id) {
      const f = state.results.findIndex((item) => item.id == id);
      if (f != -1) {
        state.results = [
          ...state.results.slice(0, f),
          ...state.results.slice(f + 1),
        ];
      }
    },
  };
  
  export const actions = {
    getList({ commit }, params) {
      return this.$axios
        .get("/employee/employeeattestation/list/", {
          params,
        })
        .then((res) => {
          commit("setState", {
            count: (res && res.data && res.data.count) || 0,
          });
          return ((res && res.data && res.data.results) || []);
        });
    },

    getEmployeeList({ commit }, params) {
      return this.$axios
        .get("/employee/list/", {
          params,
        })
        .then((res) => {
          commit("setState", {
            count: (res && res.data && res.data.count) || 0,
          });
          return ((res && res.data && res.data.results) || []);
        });
    },
  
    getDetail(_, id) {
      return this.$axios.get(`/employee/employeeattestation/detail/${id}`).then((res) => {
        return (res && res.data) || {};
      });
    },
  
    createOrUpdate(_, form) {
      const urlBase = "/employee/employeeattestation/";
  
      // eslint-disable-next-line
      const { created_at, updated_at, ...props } = form;
  
      const req = {
        method: props.id ? "put" : "post",
        url: urlBase + ((props.id && `update/${props.id}`) || "create/"),
      };
  
      const f = new FormData();
  
      Object.keys(props).forEach((key) => {
        if (key == "page_count") f.append(key, +props[key]);
        else f.append(key, props[key]);
      });
  
      return this.$axios[req.method](req.url, f);
    },
  
    remove({ commit }, id) {
      return this.$axios
        .delete(`/employee/employeeattestation/delete/${id}`)
        .then(() => commit("removeState", id));
    },
    removeDoc({ commit }, id) {
      return this.$axios
        .delete(`/employee/employeeattestation/delete/${id}`)
        .then(() => commit("removeState", id));
    },
  };
  