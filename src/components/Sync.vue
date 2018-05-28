<template>
  <div>
    <md-button class="md-icon-button" @click="sync()">
      <md-icon>sync</md-icon>
    </md-button>
    <md-dialog-alert
      :md-active.sync="showDialog"
      md-title="Sync File"
      md-content="Your file is updated!" />
  </div>
</template>

<!-- <script async defer src="https://apis.google.com/js/api.js"></script> -->

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Sync',
  data () {
    return {
      showDialog: false
    }
  },
  mounted: function () {

  },
  created () {
    // this.fetchData()
  },
  methods: {
    sync () {
      this.$emit('set-loading', true)
      this.saveFile().then(() => {
        this.$emit('set-loading', false)
        this.showDialog = true
      })
    },
    ...mapActions([
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
  /*body { padding-bottom: 70px; }*/


</style>
