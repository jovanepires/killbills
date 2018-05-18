<template>
  <md-list>
    <md-content v-if="wallets.length">
      <md-subheader>Wallets</md-subheader>
      <md-list-item v-for="wallet in wallets" :key="wallet._id">
        <md-icon>account_balance_wallet</md-icon>
        <span class="md-list-item-text">{{ wallet.name }}</span>
        <span class="md-list-action">{{ wallet.total | currency }}</span>
      </md-list-item>
    </md-content>

    <md-content v-if="filters.length">
      <md-divider></md-divider>
      <md-subheader>Filters</md-subheader>
      <md-list-item v-for="filter in filters" :key="filter._id">
        <md-icon>list</md-icon>
        <span class="md-list-item-text">{{ filter.name }}</span>
      </md-list-item>
    </md-content>

    <md-divider></md-divider>
    <md-subheader>Tags</md-subheader>

    <md-list-item>
      <md-icon>label</md-icon>
      <span class="md-list-item-text">Uber</span>
    </md-list-item>
    <md-list-item>
      <md-icon>label</md-icon>
      <span class="md-list-item-text">Food</span>
    </md-list-item>
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
import { mapState } from 'vuex'

export default {
  name: 'Menu',
  data () {
    return {

    }
  },
  mounted: function () {

  },
  created () {
    // this.fetchData()
  },
  methods: {

  },
  computed: {
    ...mapState({
      items: state => state.bills.items,
      wallets: state => state.bills.wallets,
      filters: state => state.bills.filters
    })
  }
}
</script>
<style>
  /*body { padding-bottom: 70px; }*/


</style>
