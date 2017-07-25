<template>
  <section class="main item">

    <md-toolbar class="md-transparent row">
      <div class="md-toolbar-container">

        <router-link :to="{ name: 'bills' }" class="md-icon-button">
          <md-icon>arrow_back</md-icon>
        </router-link>

      </div>
    </md-toolbar>

    <header :class="activeClass" class="row">
      <div class="header-content">
        <span>{{ item.value | currency }}</span>
      </div>
      <div class="header-title">
        <div class="header-title-inner">
          {{ type }}
        </div>
      </div>
    </header>

    <md-layout>
      <md-layout md-column md-flex-medium="100" md-flex-large="60" md-flex-offset-medium="0" md-flex-offset-large="20" md-align-large="center">
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container>
            <md-icon>today</md-icon>
            <label>Data</label>
            <md-input v-model=item.date></md-input>
          </md-input-container>
          <md-input-container>
            <md-icon>label_outline</md-icon>
            <label>Descrição</label>
            <md-input v-model=item.description></md-input>
          </md-input-container>
          <md-input-container>
            <md-icon>account_balance_wallet</md-icon>
            <label>Conta</label>
            <md-input v-model=item.resource.name></md-input>
          </md-input-container>
          <md-input-container>
            <md-icon>info_outline</md-icon>
            <label>Observação</label>
            <md-input v-model=item.note></md-input>
          </md-input-container>
          <md-button class="md-fab md-raised md-primary md-fab-bottom-right fixed-button-right" @click.native="save">
            <md-icon>done</md-icon>
          </md-button>
        </form>
      </md-layout>
    </md-layout>


  </section>
</template>

<script>
import { getBill, defaultBill } from '../api.js'

export default {
  name: 'item',
  data () {
    return {
      _id: null,
      item: null
    }
  },
  created () {
    this._id = parseInt(this.$route.params.id, 10)
    this.fetchData()
    this.byJovane()
  },
  methods: {
    fetchData () {
      this.error = this.item = null
      this.item = this._id ? getBill(this._id) : defaultBill()
    },
    byJovane () {
      console.log('desenvolvido por @jovanepires')
    },
    save () {
      alert('ok')
    }
  },
  computed: {
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
</style>
