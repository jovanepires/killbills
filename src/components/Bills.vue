<template>
  <section class="main bills">

    <header :class="activeClass">
      <div class="header-content">
        <span>{{ total | currency }}</span>
      </div>
      <div class="header-title">
        <div class="header-title-inner">
          saldo geral
        </div>
      </div>
    </header>

    <div class="scroll-list">
      <div class="scroll-list-item" v-for="item in recipes">
        <div class="scroll-list-item-content">
          <div class="scroll-list-item-content-inner">
            <div class="date">{{ item.date | date }}</div>
            <div class="title">{{ item.title }}</div>
            <div class="value">{{ item.value | currency }}</div>
          </div>
        </div>
      </div>
    </div>

    <footer>
      <label for="receitas">Receitas
        <input type="checkbox" id="receitas" v-model="receitas">
        <div class="control__indicator"></div>
      </label>
      <label for="despesas">Despesas
        <input type="checkbox" id="despesas" v-model="despesas">
        <div class="control__indicator"></div>
      </label>
    </footer>
  </section>
</template>

<script>

import { getBills } from '../api'

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
  .bills header {
    text-align: center;
    color: #fff;
    padding: 20px 0;
    margin: 0;
    border-bottom: 1px solid #ededed;
  }
  .bills header.positive {
    background: #1abc9c;
  }
  .bills header.negative {
    background: #e74c3c;
  }
  .header-title {
    margin: 0;
    outline: none;
    position: relative;
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
  }
  .scroll-list {
    margin: 0;
    padding: 0;
  }
  .scroll-list-item {
    border-bottom: 1px solid #ededed;
    margin: 0;
    outline: none;
    position: relative;
  }
  .scroll-list-item-content {
    background: #fff;
    line-height: 20px;
    padding: 6px 0;
    position: relative;
  }
  .scroll-list-item-content-inner {
    margin: 6px 0;
    position: relative;
    display: -webkit-flex;
    display: flex;
  }
  .scroll-list-item-content-inner .date {
    height: 28px;
    margin: -4px 0;
    position: relative;
    width: 98px;
    align-items: center;
    -webkit-align-items: center;
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-user-drag: none;
  }
  .scroll-list-item-content-inner .title {
    display: inline-block;
    width: 294px;
  }
  .scroll-list-item-content-inner .value {
    display: flex;
    margin: 0 24px 0 8px;
    min-width: 0;
    width: 0;
    word-wrap: break-word;
    -webkit-flex: 1;
    flex: 1;
  }
  .bills footer {
    text-align: right;
  }

  .bills footer label {
    position: relative;
    display: inline-block;
  }
</style>
