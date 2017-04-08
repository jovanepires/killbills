<template>
  <section class="main bills">

    <header :class="activeClass" class="row">
      <div class="header-content">
        <span>{{ total | currency }}</span>
      </div>
      <div class="header-title">
        <div class="header-title-inner">
          saldo geral
        </div>
      </div>
    </header>

    <div class="scroll-list list-group row">
      <div class="scroll-list-item list-group-item" v-for="item in recipes">
        <div class="date col-2">{{ item.date | date }}</div>
        <div class="title col-6">{{ item.title }}</div>
        <div class="value col-4">{{ item.value | currency }}</div>
      </div>
    </div>

    <nav class="navbar navbar-default navbar-fixed-bottom row" role="navigation">
      <div class="container">

          <label for="receitas">Receitas
            <input type="checkbox" id="receitas" v-model="receitas">
            <div class="control__indicator"></div>
          </label>
          <label for="despesas">Despesas
            <input type="checkbox" id="despesas" v-model="despesas">
            <div class="control__indicator"></div>
          </label>
        
      </div>
    </nav>

  </section>
</template>

<script>

import { getBills } from '../api'

import 'mdbootstrap/css/bootstrap.css'
import 'mdbootstrap/css/mdb.css'

export default {
  name: 'bills',
  data () {
    return {
      items: null,
      loading: false,
      error: null,
      receitas: true,
      despesas: true
    }
  },
  created () {
    this.fetchData()
    this.byJovane()
  },
  methods: {
    fetchData () {
      this.error = this.items = null
      this.items = getBills()
    },
    byJovane () {
      console.log('desenvolvido por @jovanepires')
    }
  },
  computed: {
    recipes: function () {
      var self = this
      return this.items.filter(function (item) {
        if (self.receitas && self.despesas) {
          return true
        }
        if (self.receitas) {
          return item.value > 0
        }
        if (self.despesas) {
          return item.value < 0
        }
        return false
      })
    },
    total: function () {
      return this.recipes.reduce(function (a, i) {
        return a + i.value
      }, 0)
    },
    activeClass: function () {
      return this.total >= 0 ? 'positive' : 'negative'
    }

  }
}
</script>
<style>
  body { padding-bottom: 70px; }
  .bills header {
    text-align: center;
    color: #fff;
    border-bottom: 1px solid #ededed;
  }
  .bills header.positive {
    background: #1abc9c;
  }
  .bills header.negative {
    background: #e74c3c;
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
  .bills footer {
    text-align: right;
  }
  .bills footer label {
    position: relative;
    display: inline-block;
  }
</style>
