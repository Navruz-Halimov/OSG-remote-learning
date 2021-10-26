export const state = () => ({
  fields: {},
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
