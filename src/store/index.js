// vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import file from '@/store/modules/file'
import bills from '@/store/modules/bills'
import events from '@/store/modules/events'
import collaborators from '@/store/modules/collaborators'
import * as actions from '@/store/actions'

Vue.use(Vuex)
console.log('Using Vuex')

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  // combine sub modules
  modules: {
    file,
    bills,
    events,
    collaborators
  },
  strict: debug
})
