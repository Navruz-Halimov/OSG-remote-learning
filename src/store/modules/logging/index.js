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
};

export const actions = {
  getList({ commit }, params) {
    return this.$axios.get(`/log/list/`, { params }).then((res) => {
      commit("setState", {
        count: (res && res.data && res.data.count) || 0,
      });
      return (res && res.data && res.data.results) || [];
    });
  },
};
