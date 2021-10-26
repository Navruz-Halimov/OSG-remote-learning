const model = "/employee/businesstrip";

export const actions = {
  fetchCatalog(_,model2) {
    return this.$axios.get(`/wiki/${model2}/list/`)
        .then((res) => {
            if (res ) {
                return res
            }
        }).catch((err) => {
            console.log(err);
            return []
        });
  },
  
  fetchList(_, params) {
    return this.$axios.get(`${model}/list/`, params)
        .then(res => {
            console.log("Detail res", res)
            return res
        })
        .catch((err) => {
            console.log("Detail err", err)
            return []
        })
  },

  fetchDetail(_, id) {
    return this.$axios.get(`${model}/detail/${id}`)
        .then(res => {
            console.log("Detail res", res)
            return res
        })
        .catch((err) => {
            console.log("Detail err", err)
            return []
        })
  },

  submit(_, payload) {
    try {
      const req = {
        method: payload.id ? "put" : "post",
        url: payload.id ? "/update/" + payload.id : "/create/",
      };

      return this.$axios[req.method](model + req.url, payload)
        .then(res => {
            console.log("Create res", res)
            return res
        })
        .catch(err => {
            console.log("Create err", err)
            return err
        })
    } catch (error) {
      console.log("Error", error)
    }
  },

  removeTrip(_,id) {
    return this.$axios.delete(`${model}/delete/${id}`)
        .then(res => {
            console.log("Delete res", res)
            return res
        })
        .catch(err => {
            console.log("Delete err", err)
            return err
        })
  }
};
