const model = "/employee/orderend";
export const actions = {
  create(_, payload) {
    const f = new FormData();
    Object.keys(payload).forEach((key) => {
      f.append(key, payload[key]);
    });

    return this.$axios.post(`${model}/create/`, f).then((res) => {
      if (res) {
        console.log("res", res);
      }
    });
  },
};
