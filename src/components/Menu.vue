<template>
  <md-list>
    <md-content v-if="wallets.length">
      <md-subheader>Wallets</md-subheader>
      <md-list-item v-for="wallet in wallets" :key="wallet._id">
        <md-icon>account_balance_wallet</md-icon>
        <span class="md-list-item-text">{{ wallet.name }}</span>
        <span class="md-list-action">{{ wallet.total | currency(wallet.currency) }}</span>
      </md-list-item>
    </md-content>

    <md-content v-if="filters.length">
      <md-divider></md-divider>
      <md-subheader>
        <span>Filters</span>
      </md-subheader>
      <md-list-item v-for="filter in filters" :key="filter._id" >
        <md-icon>filter_list</md-icon>
        <span class="md-list-item-text">{{ filter.name }}</span>
        <md-checkbox v-model="selectedFilter" :value="filter._id" v-on:change="applyFilter($event)" class="md-list-action"/>
      </md-list-item>
    </md-content>

    <md-content v-if="tags.length">
      <md-divider></md-divider>
      <md-subheader>Tags</md-subheader>
      <md-list-item v-for="tag in tags" :key="tag" >
        <md-icon>label</md-icon>
        <span class="md-list-item-text">{{ tag }}</span>
        <md-checkbox v-model="selectedTags" :value="tag" v-on:change="setTags()" class="md-list-action"/>
      </md-list-item>
    </md-content>

    <md-divider></md-divider>
    <md-list-item>
      <md-icon>build</md-icon>
      <span class="md-list-item-text">Configurations</span>
    </md-list-item>
    <md-list-item>
      <md-icon>info</md-icon>
      <span class="md-list-item-text">About & Feedback</span>
    </md-list-item>
  </md-list>
</template>

<!-- <script async defer src="https://apis.google.com/js/api.js"></script> -->

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Menu',
  data () {
    return {
      selectedTags: [],
      selectedFilter: ''
    }
  },
  mounted: function () {

  },
  created () {
    this.selectedTags = this.tagsApply
    this.selectedFilter = this.filterApply
  },
  methods: {
    setTags () {
      this.applyTags(this.selectedTags)
    },
    ...mapActions([
      'applyFilter',
      'applyTags'
    ])
  },
  computed: {
    ...mapState({
      items: state => state.bills.items,
      wallets: state => state.bills.walletsIds.map(id => state.bills.wallets[id]),
      filters: state => state.bills.filtersIds.map(id => state.bills.filters[id]),
      tags: state => state.bills.tags,
      filterApply: state => state.bills.filterApply,
      tagsApply: state => state.bills.tagsApply
    })
  }
}
</script>
<style>
  /*body { padding-bottom: 70px; }*/


</style>
