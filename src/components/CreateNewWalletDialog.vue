<template>
    <md-dialog ref="new_wallet_dialog" :md-active.sync="showDialog" :md-click-outside-to-close="false" :md-close-on-esc="false" class="md-layout-item md-size-50 md-small-size-100 md-xsmall-size-100">
      <md-dialog-title>{{ 'Create new Wallet' | translate }}</md-dialog-title>
      <md-dialog-content>
        <form novalidate @submit.stop.prevent="submit">
          <md-field>
            <md-icon>account_balance_wallet</md-icon>
            <label>Name</label>
            <md-input v-model="name"></md-input>
          </md-field>
          <md-field>
            <md-icon>local_atm</md-icon>
            <label>Total</label>
            <md-input v-model="total" type="number"></md-input>
          </md-field>
          <md-datepicker md-override-native="true" v-model="expires" />
          <md-field>
            <md-icon>autorenew</md-icon>
            <label>Interval</label>
            <md-input v-model="interval" type="number"></md-input>
          </md-field>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="showDialog = false">Cancel</md-button>
        <md-button @click.native="saveWallet()">Save</md-button>
      </md-dialog-actions>
    </md-dialog>
</template>

<script>
import { uuidv4 } from '@/api.js'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'CreateNewWalletDialog',
  props: ['valuetype'],
  data () {
    return {
      _id: null,
      name: null,
      expires: null,
      total: 0,
      interval: 0,
      showDialog: false
    }
  },
  mounted: function () {

  },
  created () {

  },
  methods: {
    saveWallet () {
      let wallet = {
        _id: uuidv4(),
        name: this.name,
        total: parseFloat(this.total),
        expires: this.expires.toJSON(),
        interval: parseInt(this.interval, 10)
      }

      this.insertWallet(wallet)
      this.saveFile()
      this.showDialog = false
    },
    openDialog () {
      this.showDialog = true
    },
    ...mapActions([
      'insertWallet',
      'saveFile'
    ])
  },
  computed: {
    ...mapState({
      items: state => state.bills.items,
      wallets: state => state.bills.wallets
    })
  }
}
</script>

<style>
  .md-menu.md-menu-content {
    margin-left: 12px;
  }
  .md-field>.md-icon~.md-select>.md-input {
    margin-left: 12px;
  }
  .item {
    background: #fff !important;
  }
  .main header {
    text-align: center;
    color: #fff;
    /*border-bottom: 1px solid #ededed;*/
  }
  .main header.positive {
    color: #1abc9c;
  }
  .main header.negative {
    color: #e74c3c;
  }
  .header-title {
    outline: none;
    position: relative;
    margin: 0 auto;
  }
  .header-title-inner {
    line-height: 20px;
    padding: 6px 0;
    position: relative;
  }
  .header-content {
    font-size: 25px;
    padding-top: 20px;
    position: relative;
    margin: 0 auto;
    width: 100%;
  }
  .md-menu-content {
    z-index: 10 !important;
  }

</style>
