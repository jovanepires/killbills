import {
  INSERT_BILL,
  UPDATE_BILL,
  DELETE_BILL,
  LOAD_BILLS,
  INSERT_WALLET,
  APPLY_FILTER,
  APPLY_TAGS
} from '@/store/mutation-types'
import _ from 'lodash'

export const STATUS_LIST = {
  INITIAL: 'INTIAL',
  SAVING: 'SAVING',
  SAVED: 'SAVED',
  NOT_SAVED: 'NOT_SAVED',
  DIRTY: 'DIRTY',
  LOADED: 'LOADED'
}

const state = {
  items: {},
  itemsIds: [],
  itemCurrent: '',
  // wallet
  wallets: {},
  walletsIds: [],
  // tags
  tags: [],
  tagsApply: [],
  // filters
  filters: {
    '0001': {
      _id: '0001',
      name: 'uber',
      conditions: {
        description: {
          value: 'uber',
          operator: 'contains'
        }
      }
    },
    '0002': {
      _id: '0002',
      name: 'receitas',
      conditions: {
        value: {
          value: '0',
          operator: '>'
        }
      }
    }
  },
  filtersIds: ['0001', '0002'],
  filterApply: '',
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
    state.items[item._id] = item
    state.itemsIds.push(item._id)
    let wallet = state.wallets[item.resource._id]
    wallet.total = wallet.total + item.value
    state.tags = [...new Set([...state.tags, ...item.tags])]
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
      state.items = content.items
      state.itemsIds = content.itemsIds

      state.wallets = content.wallets
      state.walletsIds = content.walletsIds

      state.filters = content.filters
      state.filtersIds = content.filtersIds
      state.filterApply = content.filterApply

      state.tags = [...new Set([...state.tags, ...content.tags])]
      state.tagsApply = content.tagsApply
    }
    state.status = STATUS_LIST.LOADED
  },

  [INSERT_WALLET] (state, value) {
    state.walletsIds.push(value._id)
    state.wallets[value._id] = value
    state.status = STATUS_LIST.NOT_SAVED
  },

  [APPLY_FILTER] (state, value) {
    state.filterApply = _.clone(value, true)
  },

  [APPLY_TAGS] (state, value) {
    state.tagsApply = _.clone(value, true)
  }
}

export default {
  state,
  mutations
}
