import {
  INSERT_BILL,
  UPDATE_BILL,
  DELETE_BILL,
  LOAD_BILLS,
  INSERT_WALLET
} from '@/store/mutation-types'

export const STATUS_LIST = {
  INITIAL: 'INTIAL',
  SAVING: 'SAVING',
  SAVED: 'SAVED',
  NOT_SAVED: 'NOT_SAVED',
  DIRTY: 'DIRTY',
  LOADED: 'LOADED'
}

const state = {
  items: [],
  item: {},
  wallets: [],
  filters: [
    {_id: 1, 'name': 'work', 'condition': ''},
    {_id: 2, 'name': 'home', 'condition': ''}
  ],
  status: STATUS_LIST.INITIAL
}

const mutations = {
  // [INSERT_BILL] (state, name) {
  //   state.metadata = {
  //     id: null,
  //     mimeType: 'text/plain',
  //     name: name
  //   }
  //   state.content = ''
  // },
  //
  // [FILE_SAVED] (state, metadata) {
  //   _.assign(state.metadata, metadata)
  //   state.status = STATUS_LIST.SAVED
  // },
  //
  // [FILE_NOT_SAVED] (state) {
  //   state.status = STATUS_LIST.NOT_SAVED
  // },
  //
  // [FILE_SAVING] (state) {
  //   state.status = STATUS_LIST.SAVING
  // },
  //
  // [FILE_DIRTY] (state) {
  //   state.status = STATUS_LIST.DIRTY
  // },
  //
  // [EDIT_CONTENT] (state, content) {
  //   state.content = content
  // },

  [INSERT_BILL] (state, item) {
    state.items.push(item)
    state.status = STATUS_LIST.NOT_SAVED
  },

  [UPDATE_BILL] (state, { index, text }) {
    state.status = STATUS_LIST.INITIAL
  },

  [DELETE_BILL] (state, filename) {
    state.status = STATUS_LIST.INITIAL
  },

  [LOAD_BILLS] (state, fileContent) {
    if (fileContent) {
      let content = JSON.parse(fileContent)
      state.items = [...state.items, ...content.items]
      state.wallets = [...state.wallets, ...content.wallets]
    } else {
      state.items = []
    }

    state.status = STATUS_LIST.LOADED
  },

  [INSERT_WALLET] (state, value) {
    state.wallets.push(value)
    state.status = STATUS_LIST.NOT_SAVED
  }
}

export default {
  state,
  mutations
}
