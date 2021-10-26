import { getToken as fGetToken } from "@/constants/utils/storage";
// import axios from "axios";

export const state = () => ({
  access: null,
  refresh: null,
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
  init({ commit, dispatch }) {
    const token = fGetToken();
    const rtoken = fGetToken("refresh");

    const p = {
      access: token || null,
      refresh: rtoken || null,
    };

    commit("setState", p);

    if (p.access) {
      dispatch("setCredentials", {
        data: {
          access: p.access,
          refresh: p.refresh,
        },
      });
    }

    if (p.refresh) {
      // console.log("refresh yes");
      dispatch("refreshToken");
    }
  },
  getToken({ dispatch }, params) {
    // console.log("getToken", params);
    return this.$axios
      .get("/auth/oauth/one-id/", {
        params,
      })
      .then((res) => {
        if (res && res.data && res.data.access && res.data.refresh) {
          dispatch("setCredentials", res);
        }

        return res;
      });
  },
  setCredentials({ commit }, res) {
    const access_token = res.data.access;
    const token_split = access_token.split(".");
    const fields_str = JSON.parse(atob(token_split[1]));

    commit("setState", res.data);
    localStorage.setItem("tokens", JSON.stringify(res.data));
    commit(
      "profile/setState",
      {
        fields: fields_str,
      },
      { root: true }
    );
  },
  // refreshToken({ state, commit }) {
  //   // console.log("state", state);
  //   return this.$axios
  //     .post("/auth/refresh/", {
  //       refresh: state.refresh,
  //     })
  //     .then((res) => {
  //       // console.log("auth state", state);
  //       if (res.data && res.data.access) {
  //         commit("setState", {
  //           access: res.data.access,
  //           refresh: res.data.refresh || state.refresh,
  //         });
  //         localStorage.setItem(
  //           "tokens",
  //           JSON.stringify({
  //             access: res.data.access,
  //             refresh: res.data.refresh || state.refresh,
  //           })
  //         );
  //       }
  //     });
  // },

  refreshToken({ state }) {
    // console.log("refreshToken", state);
    const apiUrl = process.env.VUE_APP_FILE_URL || "https://ekadr.sudya.uz";
    return this.$axios({
      method: "POST",
      data: {
        refresh: state.refresh,
      },
      url: apiUrl + "/api/token/refresh/",
    });
  },

  login({ dispatch }, payload) {
    const apiUrl = process.env.VUE_APP_FILE_URL || "https://ekadr.sudya.uz";
    // console.log(payload, apiUrl);
    return this.$axios({
      method: "POST",
      data: payload,
      url: apiUrl + "/api/token/",
    }).then((res) => {
      dispatch("setCredentials", res);
    });
  },
  logout({ commit }) {
    // console.log("logout");
    commit("setState", {
      access: null,
      refresh: null,
    });
    localStorage.removeItem("tokens");
  },
};
