export const state = () => ({
    results: []
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
    fetchList(_, params) {
        return this.$axios
            .get(`/wiki/${params}/list/`)
            .then(res => {
                console.log(params, res);
                if (res && res.data) {
                    // commit("setState", { [params]: res.data });
                    return res.data
                }
                return []
            })
    },
  
    createOrUpdate(_, {payload, key}) {
        let req = {
            url: payload && payload.id
                ? `/wiki/${key}/update/${payload.id}/`
                : `/wiki/${key}/create/`,
            method: payload && payload.id ? 'put' : 'post'
        }
  
        let formdata = new FormData
        if(key == "city" || key == "district") {
            for(let key2 in payload) {
                if (key2 == "name") {
                    let name = JSON.stringify(payload[key2])
                    formdata.append(key2, name)
                } else formdata.append(key2, payload[key2])
            }
        }
        // console.log(key, "key", key == "city", formdata);
        
  
  
        return this.$axios[req.method](req.url, (key == "city" || key == "district") ? formdata : payload)
            .then(res => {
                console.log("REQ", req, res);
                return res
            })
            .catch(err => {
                console.log("Err", req, err);
                return err
            })                                                                                      
    },
    
    remove(_, {id, key}) {
        return this.$axios  
            .delete(`/wiki/${key}/destroy/${id}/`)
            .then(res => {
                console.log("del req", res);
                return res
            })
            .catch(err => {
                console.log("del err", err);
            })
    },
  
  };