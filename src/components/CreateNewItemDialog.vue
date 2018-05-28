<template>

    <md-dialog ref="new_item_dialog" :md-active.sync="showDialog" :md-click-outside-to-close="false" :md-close-on-esc="false" class="md-layout-item md-size-50 md-small-size-100 md-xsmall-size-100">
      <md-dialog-title>{{ 'Create new Item' | translate }}</md-dialog-title>
      <md-dialog-content>
        <form novalidate @submit.stop.prevent="submit">
          <md-field>
            <md-icon>local_atm</md-icon>
            <label>{{ 'Value' | translate }}</label>
            <md-input v-model="value" type="number" class="text-right"></md-input>
          </md-field>
          <md-datepicker md-override-native="true" v-model="date" />
          <md-field>
            <md-icon>label_outline</md-icon>
            <label>{{ 'Description' | translate }}</label>
            <md-input v-model="item.description"></md-input>
          </md-field>
          <md-field>
            <md-icon>account_balance_wallet</md-icon>
            <label>{{ 'Wallet' | translate }}</label>
            <md-select v-model="wallet" md-align-trigger>
              <md-option v-for="item in wallets" :value="item._id" :key="item._id">
                {{item.name}}
              </md-option>
            </md-select>
          </md-field>
          <md-field>
            <md-icon>public</md-icon>
            <label>{{ 'Currency' | translate }}</label>
            <md-select v-model="currency" md-align-trigger disabled>
              <md-option value="BRL">BRL</md-option>
              <md-option value="USD">USD</md-option>
            </md-select>
          </md-field>
          <md-field>
            <md-icon>info_outline</md-icon>
            <label>{{ 'Notes' | translate }}</label>
            <md-input v-model="item.note"></md-input>
          </md-field>
          <md-chips class="md-primary" v-model="tags" md-placeholder="Add tag..." :md-format="formatTagName">
            <md-icon>info_outline</md-icon>
            <label>Tags</label>
            <div class="md-helper-text">Add same tags</div>
          </md-chips>
        </form>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-raised" @click.native="showDialog = false">{{ 'Cancel' | translate }}</md-button>
        <md-button class="md-raised md-primary" @click.native="inputItem()">{{ 'Save' | translate }}</md-button>
      </md-dialog-actions>
    </md-dialog>

</template>

<script>
import { defaultBill, uuidv4 } from '../api.js'
import { mapActions, mapState } from 'vuex'
import _ from 'lodash'

export default {
  name: 'CreateNewItemDialog',
  props: ['valuetype'],
  data () {
    return {
      _id: null,
      item: null,
      date: null,
      wallet: null,
      value: null,
      currency: 'BRL',
      showDialog: false,
      tags: []
    }
  },
  mounted: function () {
    this.fetchData()
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.item = defaultBill()
    },
    inputItem () {
      this.item._id = uuidv4()
      this.item.due = this.date.toJSON()
      this.item.resource = _.clone(this.wallets[this.wallet])
      this.item.value = parseFloat(this.value) * this.valuetype
      this.item.currency = this.currency
      this.item.tags = _.clone(this.tags, true)
      this.insertItem(_.clone(this.item, true))
      this.saveFile()
      this.showDialog = false
      this.$emit('set-loading', false)
    },
    openDialog () {
      this.item = _.clone(defaultBill())
      this.showDialog = true
    },
    formatTagName (str) {
      return str.replace(/[^\w\s]/gi, '').toLowerCase()
    },
    ...mapActions([
      'insertItem',
      'saveFile'
    ])
  },
  computed: {
    ...mapState({
      items: state => state.bills.items,
      wallets: state => state.bills.wallets
    }),
    activeClass: function () {
      return this.item.value >= 0 ? 'positive' : 'negative'
    },
    type: function () {
      return this.item.value >= 0 ? 'receita' : 'despesa'
    }
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
