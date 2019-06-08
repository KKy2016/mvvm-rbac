import axios from 'axios'
import store from '@/store'
import { newAddRoutes, doFilter } from '@/router/router'
const state = {
  router: JSON.parse(sessionStorage.getItem('router')),
  hasGetRules: false
}

const getters = {}

const mutations = {
  SET_ROUTER (state, params) {
    state.router = params
    sessionStorage.setItem('router', JSON.stringify(state.router))
    state.hasGetRules = true
  },
  SET_HASGETRULES (state, params) {
    state.hasGetRules = params
  }
}

const actions = {
  addRouter ({ commit }) {
    let userId = store.state.adminUser.adminUser.id
    return new Promise((resolve, reject) => {
      axios
        .get('/api/rolePermission', {
          params: {
            userId
          }
        })
        .then(res => {
          // console.log('res.data.data')
          // console.log(res.data.data)
          let rules = res.data.data
          let newRouter = doFilter(newAddRoutes, rules)
          commit('SET_ROUTER', newRouter)
          resolve(newRouter)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  removeRoutes ({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .post('/api/permission/routes')
        .then(res => {
          commit('SET_ROUTER', '')
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
