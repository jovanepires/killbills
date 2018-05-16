import {
  INSERT_BILL,
  UPDATE_BILL,
  DELETE_BILL,
  LOAD_BILLS
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
  wallets: [
    {_id: 1, 'name': 'carteira', 'namespace': 'carteira'},
    {_id: 2, 'name': 'cartão master', 'namespace': 'carteira'},
    {_id: 3, 'name': 'cartão visa', 'namespace': 'carteira'}
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
    state.status = STATUS_LIST.INITIAL
    state.items.push(item)
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
      state.items = state.items.concat(content.items)
    } else {
      state.items = []
    }

    state.status = STATUS_LIST.LOADED
  }
}

export default {
  state,
  mutations
}
