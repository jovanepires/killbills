<template>
  <section class="main item">

    <md-toolbar class="md-transparent row">
      <div class="md-toolbar-container">

        <router-link v-bind:to="'/'" class="md-icon-button">
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


    <div class="container">
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
        <md-button class="md-fab md-raised md-primary md-fab-bottom-right" @click.native="save">
          <md-icon>done</md-icon>
        </md-button>
      </form>
    </div>


  </section>
</template>

<script>
import { getBill } from '../api'

export default {
  name: 'item',
  data () {
    return {
      _id: 1,
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
      this.item = getBill(this._id)
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
