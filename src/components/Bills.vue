<template>
  <md-content>
    <md-table v-model="allItems" md-card @md-selected="onSelect" md-sort="due" md-sort-order="asc">
      <md-table-toolbar class="md-layout md-gutter md-alignment-center-center">
        <md-content>
          <div class="md-large md-toolbar-row">
            <h3 class="md-title">TOTAL: {{ total }}</h3>
          </div>
        </md-content>
      </md-table-toolbar>

      <!-- <md-table-toolbar slot="md-table-alternate-header" slot-scope="{ count }">
        <div class="md-toolbar-section-start">{{ getAlternateLabel(count) }}</div>

        <div class="md-toolbar-section-end">
          <md-button class="md-icon-button">
            <md-icon>delete</md-icon>
          </md-button>
        </div>
      </md-table-toolbar> -->

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="Item" md-sort-by="description">{{ item.description }}</md-table-cell>
        <md-table-cell md-label="Data" md-sort-by="due">{{ item.due | moment('L') }}</md-table-cell>
        <md-table-cell md-label="Value" md-sort-by="value">{{ item.value }}</md-table-cell>
      </md-table-row>

      <md-toolbar class="md-transparent" md-elevation="0">
        <div class="md-large md-toolbar-row">
          <span>...sem items para carregar.</span>
        </div>
      </md-toolbar>
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
    // this.items = getBills(this.fileContent)
    // GapiIntegration.loadDriveApis()
    //   .then(() => {
    //     console.log('starting authorize')
    //     GapiIntegration.authorize(true, this.user)
    //       .then(() => {
    //         return this.loadThisFile()
    //       })
    //       .catch((reason) => {
    //         console.log('error inload or authorize')
    //         this.$refs.login.open()
    //       })
    //   })
  },
  created () {
    this.byJovane()
    // this.fetchData()
  },
  methods: {
    byJovane () {
      console.log('desenvolvido por @jovanepires')
    },
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
      items: state => state.bills.items
    }),
    allItems: function () {
      // this.items = getBills(this.fileContent || '{}')
      if (this.items) {
        return this.items
      }

      return []
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
      if (!this.items) {
        return 0
      }
      let _self = this
      let _items = this.selected || this.items
      return _items.filter(function (item) {
        if (_self.receitas && _self.despesas) {
          return true
        }
        if (_self.receitas) {
          return item.value > 0
        }
        if (_self.despesas) {
          return item.value < 0
        }
        return false
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
<style>
  /*body { padding-bottom: 70px; }*/


</style>
