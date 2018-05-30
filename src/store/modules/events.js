import {
  SHOW_CREATE_WALLET,
  SHOW_CREATE_FILTER
} from '../mutation-types'

const state = {
  showCreateWallet: false,
  showCreateFilter: false
}

const mutations = {
  [SHOW_CREATE_WALLET] (state, value) {
    state.showCreateFilter = false
    state.showCreateWallet = value
  },

  [SHOW_CREATE_FILTER] (state, value) {
    state.showCreateWallet = false
    state.showCreateFilter = value
  }
}

export default {
  state,
  mutations
}
