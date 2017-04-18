<template>
  <section class="main bills">
    <md-toolbar :class="activeClass" class="row">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>filter_list</md-icon>
      </md-button>

      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>
      <div class="md-toolbar-container">
        <header class="container">
          <div class="header-content">
            <span>{{ total | currency }}</span>
          </div>
          <div class="header-title">
            <div class="header-title-inner">
              saldo geral
            </div>
          </div>
        </header>
      </div>
    </md-toolbar>

    <md-tabs md-fixed @change="changeFilter">
      <md-tab id="tudo" md-label="Tudo">
        <md-table v-once>
          <md-table-body>
            <md-table-row v-for="item in allItems" :key="item._id" flex="" layout="row">
              <md-table-cell flex="60">
                <span class="float-date">{{ item.date | date }}</span>
                {{ item.description }}
              </md-table-cell>
              <md-table-cell flex="30">
                {{ item.value }}
              </md-table-cell>
              <md-table-cell flex="10">
                <router-link :to="{ name: 'item', params: { id: item._id }}" class="md-icon-button">
                  <md-icon>more_vert</md-icon>
                </router-link>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-tab>
      <md-tab id="despesas" md-label="Despesas">
        <md-table v-once>
          <md-table-body>
            <md-table-row v-for="item in negativeItems" :key="item._id" flex="" layout="row">
              <md-table-cell flex="60">
                <span class="float-date">{{ item.date | date }}</span>
                {{ item.description }}
              </md-table-cell>
              <md-table-cell flex="30">
                {{ item.value }}
              </md-table-cell>
              <md-table-cell flex="10">
                <router-link :to="{ name: 'item', params: { id: item._id }}" class="md-icon-button">
                  <md-icon>more_vert</md-icon>
                </router-link>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-tab>
      <md-tab id="receitas" md-label="Receitas">
        <md-table v-once>
          <md-table-body>
            <md-table-row v-for="item in positiveItems" :key="item._id" flex="" layout="row">
              <md-table-cell flex="60">
                <span class="float-date">{{ item.date | date }}</span>
                {{ item.description }}
              </md-table-cell>
              <md-table-cell flex="30">
                {{ item.value }}
              </md-table-cell>
              <md-table-cell flex="10">
                <router-link :to="{ name: 'item', params: { id: item._id }}" class="md-icon-button">
                  <md-icon>more_vert</md-icon>
                </router-link>
              </md-table-cell>
            </md-table-row>
          </md-table-body>
        </md-table>
      </md-tab>
    </md-tabs>

    <md-speed-dial md-mode="scale" class="md-fab-bottom-right">
      <md-button class="md-fab" md-fab-trigger>
        <md-icon md-icon-morph>close</md-icon>
        <md-icon>add</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean">
        <md-icon>email</md-icon>
      </md-button>

      <md-button class="md-fab md-mini md-clean">
        <md-icon>content_copy</md-icon>
      </md-button>
    </md-speed-dial>

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
    },
    changeFilter: function (tabIndex) {
      if (tabIndex === 0) {
        this.receitas = true
        this.despesas = true
      }
      if (tabIndex === 1) {
        this.receitas = false
        this.despesas = true
      }
      if (tabIndex === 2) {
        this.receitas = true
        this.despesas = false
      }
    }
  },
  computed: {
    allItems: function () {
      return this.items
    },
    negativeItems: function () {
      return this.items.filter(function (item) {
        return item.value < 0
      })
    },
    positiveItems: function () {
      return this.items.filter(function (item) {
        return item.value > 0
      })
    },
    total: function () {
      let self = this
      return this.allItems.filter(function (item) {
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
      }).reduce(function (a, i) {
        return a + i.value
      }, 0)
    },
    activeClass: function () {
      return this.total >= 0 ? 'green' : 'red'
    }

  }
}
</script>
<style>
  body { padding-bottom: 70px; }
  .bills header {
    text-align: center;
    color: #fff;
    /*border-bottom: 1px solid #ededed;*/
  }
  .bills header.positive {
    background-color: #1abc9c !important;
  }
  .bills header.negative {
    background-color: #e74c3c !important;
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
    text-align: left;
  }
  .bills footer label {
    position: relative;
    display: inline-block;
    line-height: 50px;
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    background-color: #f5f5f5;
  }
  .float-date{
    font-size: 9px;
    display: block;
  }
</style>
