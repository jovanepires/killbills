<template>
  <md-content>
    <md-speed-dial class="md-bottom-right md-fixed" md-direction="top" md-event="hover">
      <md-speed-dial-target>
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">close</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <!-- ADD POSITIVE ITEM -->
        <md-button class="md-icon-button" @click="openCreateNewItem(1)">
          <md-icon>add</md-icon>
        </md-button>
        <!-- ADD NEGATIVE ITEM -->
        <md-button class="md-icon-button" @click="openCreateNewItem(-1)">
          <md-icon>remove</md-icon>
        </md-button>
        <!-- ADD FILTER -->
        <!-- <md-button class="md-icon-button" @click="openCreateNewFile()">
          <md-icon>filter_list</md-icon>
        </md-button> -->
        <!-- ADD WALLET -->
        <md-button class="md-icon-button" @click="openCreateNewWallet()">
          <md-icon>account_balance_wallet</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
    <create-new-item-dialog ref="new_item_dialog" v-bind:valuetype="newvaluetype"></create-new-item-dialog>
    <create-new-filter-dialog ref="new_filter_dialog"></create-new-filter-dialog>
    <create-new-wallet-dialog ref="new_wallet_dialog"></create-new-wallet-dialog>
  </md-content>
</template>

<script>
import CreateNewItemDialog from '@/components/CreateNewItemDialog'
import CreateNewFilterDialog from '@/components/CreateNewFilterDialog'
import CreateNewWalletDialog from '@/components/CreateNewWalletDialog'

export default {
  name: 'SpeedDial',
  components: {
    'create-new-item-dialog': CreateNewItemDialog,
    'create-new-filter-dialog': CreateNewFilterDialog,
    'create-new-wallet-dialog': CreateNewWalletDialog
  },
  data () {
    return {
      newvaluetype: 1
    }
  },
  mounted: function () {

  },
  created () {

  },
  methods: {
    openCreateNewItem (valuetype) {
      this.newvaluetype = valuetype
      this.$refs.new_item_dialog.openDialog()
    },
    openCreateNewFilter () {
      this.$refs.new_filter_dialog.openDialog()
    },
    openCreateNewWallet () {
      this.$refs.new_wallet_dialog.openDialog()
    }
  },
  computed: {

  }
}
</script>
