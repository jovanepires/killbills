<template>
  <div class="bills">

    receitas <input type="checkbox" id="receitas" v-model="receitas">
    despesas <input type="checkbox" id="despesas" v-model="despesas">

    <h2>Total: {{ total | currency }}</h2>
    <ul id="current">
      <li v-for="item in recipes">
        <span class="date">{{ item.date | date }} - {{ item.due | date }}</span>
        <span class="title">{{ item.title }}</span>
        <span class="value">{{ item.value | currency }}</span>
      </li>
    </ul>

  </div>
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
  },
  methods: {
    fetchData () {
      this.error = this.items = null
      this.items = getBills()
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
    }
  }
}
</script>
<style>
  .bills > ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
    display: block;
  }
  .bills > ul > li .date {
    width: 20%;
    float: left;
    display: block;
  }
  .bills > ul > li .title {
    width: 50%;
    float: left;
    display: block;
  }
  .bills > ul > li .value {
    width: 30%;
    float: left;
    display: block;
  }
</style>
