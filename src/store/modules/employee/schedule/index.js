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
  getWorkplaceList({ commit }, params) {
    return this.$axios
      .get("/employee/organization/workplace/list/", {
        params,
      })
      .then((res) => {
        commit("setState", {
          count: (res && res.data && res.data.count) || 0,
        });
        return (res && res.data && res.data.results) || [];
      });
  },
  getWorkplaceAvailableList({ commit }, params) {
    return this.$axios
      .get("/employee/organization/workplace/available/list/", {
        params,
      })
      .then((res) => {
        commit("setState", {
          count: (res && res.data && res.data.count) || 0,
        });
        return (res && res.data && res.data.results) || [];
      });
  },

  getOrganizationInfo({ commit }, params) {
    return this.$axios
      .get("/employee/organization/list/", {
        params,
      })
      .then((res) => {
        commit("setState", {
          count: (res && res.data && res.data.count) || 0,
        });
        return (res && res.data && res.data.results) || [];
      });
  },

  getPositionList({ commit }, params) {
    return this.$axios
      .get(`/wiki/position/list/`, {
        params,
      })
      .then((res) => {
        commit("setState", {
          count: (res && res.data && res.data.count) || 0,
        });
        return (res && res.data && res.data.results) || [];
      });
  },

  getDepartmentList(_, params) {
    return this.$axios
      .get(`/wiki/department/list/`, {
        params,
      })
      .then((res) => {
        return (res && res.data && res.data.results) || [];
      });
  },

  getEmployeeList(_, params) {
    return this.$axios
      .get(`/employee/list/`, {
        params,
      })
      .then((res) => {
        return (res && res.data && res.data.results) || [];
      });
  },

  createOrUpdate(_, form) {
    const urlBase = "/employee/workplace/";

    // eslint-disable-next-line
    const { created_at, updated_at, ...props } = form;

    const req = {
      method: props.id ? "put" : "post",
      url: urlBase + ((props.id && `${props.id}/`) || "create/"),
    };

    const f = new FormData();

    Object.keys(props).forEach((key) => {
      if (key == "page_count") f.append(key, +props[key]);
      else f.append(key, props[key]);
    });

    return this.$axios[req.method](req.url, f);
  },

  removeWorkplace(_, id) {
    return this.$axios.delete(`/employee/workplace/delete/${id}/`);
  },

  removeDoc(_, id) {
    return this.$axios.delete(`/employee/workplacedocument/delete/${id}/`);
  },

  //Document
  getDocList({ commit }, params) {
    return this.$axios
      .get(`/employee/workplacedocument/list/`, {
        params,
      })
      .then((res) => {
        commit("setState", {
          count: (res && res.data && res.data.count) || 0,
        });
        return (res && res.data && res.data.results) || [];
      });
  },
};
