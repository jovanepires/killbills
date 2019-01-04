<template>
  <md-content>
    <md-list>
      <!-- WALLETS -->
      <md-subheader>Wallets</md-subheader>
      <md-list-item v-for="wallet in wallets" :key="wallet._id">
        <md-icon>account_balance_wallet</md-icon>
        <span class="md-list-item-text">{{ wallet.name }}</span>
        <span class="md-list-action">{{ wallet.total | currency(wallet.currency) }}</span>
      </md-list-item>
      <!-- <md-list-item @click="showCreateWalletDialog()">
        <md-icon>add</md-icon>
        <span class="md-list-item-text">{{ 'Add Wallet' | translate }}</span>
      </md-list-item> -->
      <!-- WALLETS -->

      <!-- FILTERS -->
      <!-- <md-divider></md-divider>
      <md-subheader>
        <span>Filters</span>
      </md-subheader>
      <md-list-item v-for="filter in filters" :key="filter._id" >
        <md-icon>filter_list</md-icon>
        <span class="md-list-item-text">{{ filter.name }}</span>
        <md-checkbox v-model="selectedFilter" :value="filter._id" v-on:change="applyFilter($event)" class="md-list-action"/>
      </md-list-item>
      <md-list-item @click="showCreateFilterDialog()">
        <md-icon>add</md-icon>
        <span class="md-list-item-text">{{ 'Add Filter' | translate }}</span>
      </md-list-item> -->
      <!-- FILTERS -->

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
  </md-content>
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
    // console.log(this.status)
    // this.wallets.length === 0 && this.showCreateWalletDialog()
  },
  created () {
    this.selectedTags = [...this.tagsApply]
    this.selectedFilter = this.filterApply
  },
  methods: {
    setTags () {
      this.applyTags(this.selectedTags)
    },
    showCreateWalletDialog () {
      this.$parent.$emit('show-drawer', false)
      this.showCreateWallet(true)
    },
    showCreateFilterDialog () {
      this.$parent.$emit('show-drawer', false)
      this.showCreateFilter(true)
    },
    ...mapActions([
      'applyFilter',
      'applyTags',
      'showCreateWallet',
      'showCreateFilter'
    ])
  },
  computed: {
    ...mapState({
      wallets: state => state.bills.walletsIds.map(id => state.bills.wallets[id]),
      filters: state => state.bills.filtersIds.map(id => state.bills.filters[id]),
      tags: state => state.bills.tags,
      filterApply: state => state.bills.filterApply,
      tagsApply: state => state.bills.tagsApply,
      status: state => state.bills.status
    })
  },
  watch: {
    status (newStatus, oldStatus) {
      // console.log(newStatus)
      newStatus === 'LOADED' && this.wallets.length === 0 && this.showCreateWalletDialog()
    }
  }
}
</script>
<style>
  /*body { padding-bottom: 70px; }*/


</style>
