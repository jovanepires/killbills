<template>
  <md-content>
    <md-table v-model="allItems" @md-selected="onSelect" md-sort="due" md-sort-order="asc" md-card>
      <md-table-toolbar v-if="allItems.length" class="">
        <div class="md-toolbar-section-start">
          <h3 class="md-title">TOTAL: {{ total | currency }}</h3>
        </div>

        <div v-if="this.filter" class="md-toolbar-section-end">
          <div>
            <md-icon>filter_list</md-icon>
            <span>FILTER: {{ this.filter.name.toUpperCase() }}</span>
          </div>
        </div>
      </md-table-toolbar>

      <!-- <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar> -->
      <md-table-empty-state
        md-icon="error_outline"
        :md-label="'No items found' | translate">
      </md-table-empty-state>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="single" md-auto-select>
        <md-table-cell>{{ item.description }}</md-table-cell>
        <md-table-cell>{{ item.due | moment('L') }}</md-table-cell>
        <md-table-cell md-numeric>{{ item.value | currency(item.currency) }}</md-table-cell>
      </md-table-row>

    </md-table>
  </md-content>
</template>

<!-- <script async defer src="https://apis.google.com/js/api.js"></script> -->

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'bills-view',
  data () {
    return {
      // items: {},
      selected: [],
      loading: false,
      error: null,
      receitas: true,
      despesas: true
    }
  },
  mounted: function () {
    // console.log(this.filter)
  },
  methods: {
    changeFilter: function (tabIndex) {
      console.log(this.items)
      if (tabIndex === 0) {
        this.receitas = true
        this.despesas = true
      }
      if (tabIndex === 1) {
        this.receitas = false
        this.despesas = true
      }
      if (tabIndex === 2) {
        this.receitas = true
        this.despesas = false
      }
    },
    onSelect (items) {
      this.selected = items
    },
    getAlternateLabel (count) {
      let plural = ''

      if (count > 1) {
        plural = 's'
      }

      return `TOTAL ${this.total} for ${count} item${plural} selected`
    },
    ...mapActions([
      'editContent'
    ])
  },
  computed: {
    ...mapState({
      items: state => state.bills.itemsIds.map(id => state.bills.items[id]),
      filter: state => state.bills.filters[state.bills.filterApply]
    }),
    allItems: function () {
      // this.items = getBills(this.fileContent || '{}')
      let self = this
      return this.items.filter(function (item) {
        if (self.filter) {
          let filtered = true

          Object.keys(item).forEach(prop => {
            let contidion = self.filter.conditions[prop]

            if (contidion && contidion.operator === '>') {
              filtered = filtered && item[prop] > parseFloat(contidion.value)
            }

            if (contidion && contidion.operator === '<') {
              filtered = filtered && item[prop] < parseFloat(contidion.value)
            }

            if (contidion && contidion.operator === 'contains') {
              filtered = filtered && item[prop].toString().toLowerCase().includes(contidion.value.toLowerCase())
            }
          })

          return filtered
        }

        return true
      })
    },
    negativeItems: function () {
      if (!this.items) {
        return {}
      }
      return this.items.filter(function (item) {
        return item.value < 0
      })
    },
    positiveItems: function () {
      if (!this.items) {
        return {}
      }
      return this.items.filter(function (item) {
        return item.value > 0
      })
    },
    total: function () {
      if (!this.allItems) {
        return 0
      }

      let _items = this.allItems
      return _items.filter(function (item) {
        return true
      }).reduce(function (a, i) {
        return a + i.value
      }, 0)
    },
    activeClass: function () {
      return this.total >= 0 ? 'green' : 'red'
    }
  }
}
</script>
