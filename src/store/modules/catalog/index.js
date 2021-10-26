export const state = () => ({
  language: {},
  position: {},
  cataloglanguage: {},
  city: {},
  districts: {},
  coursetype: {},
  libraryelementcategory: {},
  libraryelementtype: {},
  nationality: {},
  organization: {},
  tasktype: {}
})

export const mutations = {
  setState(state, payload) {
      console.log("Setstate", payload);
      Object.keys(payload).forEach((key) => {
          if (key in state) {
              state[key] = payload[key];
          }
      });
  },
};

export const actions = {
  get(_, params) {
      return this.$axios
          .get(`/wiki/${params}/list/`)
          .then(res => {
              console.log(params, res);
              if (res && res.data && res.data.results) {
                  // commit("setState", { [params]: res.data });
                  return res.data.results
              }
              return []
          })
  },

  createOrUpdate(_, {payload, key}) {
      let req = {
          url: payload && payload.id
              ? `/wiki/${key}/update/${payload.id}`
              : `/wiki/${key}/create/`,
          method: payload && payload.id ? 'put' : 'post'
      }

    //   let formdata = new FormData
    //   if(key == "city" || key == "district") {
    //       for(let key2 in payload) {
    //           if (key2 == "name") {
    //               let name = JSON.stringify(payload[key2])
    //               formdata.append(key2, name)
    //           } else formdata.append(key2, payload[key2])
    //       }
    //   }
      // console.log(key, "key", key == "city", formdata);
      


      return this.$axios[req.method](req.url,  payload)
          .then(res => {
              console.log("REQ", req, res);
              return res
          })
          .catch(err => {
              console.log("Err", req, err);
              return err
          })                                                                                      
  },
  
  delete(_, {id, key}) {
      return this.$axios  
          .delete(`/wiki/${key}/delete/${id}`)
          .then(res => {
              console.log("del req", res);
              return res
          })
          .catch(err => {
              console.log("del err", err);
          })
  },

};