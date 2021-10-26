export const state = {
  info: null
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
  getProfileData({ commit }) {
    return this.$axios
      .get("/user/info/")
      .then(res => {
        if (res && res.data) {
          commit("setState", { info: res.data.results[0] });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
