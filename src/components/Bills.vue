<template>
  <section class="main bills">
    <md-toolbar :class="activeClass" class="row">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <span style="flex: 1"></span>
      <md-button class="md-icon-button">
        <md-icon>filter_list</md-icon>
      </md-button>
      <md-button class="md-icon-button">
        <md-icon>search</md-icon>
      </md-button>
      <div class="md-toolbar-container">
        <header style="flex: 1">
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

    <!-- <canvas id="mycanvas2" count="2"></canvas>
    <chartjs-line :datalabel="'first'" :backgroundcolor="'rgba(75,192,192,0.1)'" :bordercolor="'#00c853'" target="mycanvas2"></chartjs-line>
    <chartjs-line :datalabel="'second'" :data="[50, 40, 90, 60]" target="mycanvas2"></chartjs-line> -->

    <md-tabs md-fixed @change="changeFilter">
      <md-tab id="tudo" md-label="Tudo" class="md-tab-zero-padding-medium">
        <md-layout>
          <md-layout md-column md-flex-medium="100" md-flex-large="60" md-flex-offset-medium="0" md-flex-offset-large="20" md-align-large="center">
            <md-table>
              <md-table-body>
                <md-table-row v-for="item in items" :key="item._id" flex="" layout="row">
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
          </md-layout>
        </md-layout>
      </md-tab>
      <md-tab id="despesas" md-label="Despesas" class="md-tab-zero-padding-medium">
        <md-layout md-row>
          <md-layout md-column md-flex-medium="100" md-flex-large="60" md-flex-offset="0" md-flex-offset-medium="0" md-flex-offset-large="20" md-align-large="center">
            <md-table>
              <md-table-body>
                <md-table-row v-for="item in negativeItems" :key="item._id" flex="" layout="row">
                  <md-table-cell>
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
          </md-layout>
        </md-layout>
      </md-tab>
      <md-tab id="receitas" md-label="Receitas" class="md-tab-zero-padding-medium">
        <md-layout>
          <md-layout md-column md-flex-medium="100" md-flex-large="60" md-flex-offset-medium="0" md-flex-offset-large="20" md-align-large="center">
            <md-table>
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
          </md-layout>
        </md-layout>
      </md-tab>
    </md-tabs>

    <div class="fixed-button-right">

        <md-speed-dial md-mode="fling" md-direction="top" class="md-fab-bottom-right">
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

    </div>

  </section>
</template>

<!-- <script async defer src="https://apis.google.com/js/api.js"></script> -->

<script>
import { getBills } from '../api.js'

export default {
  name: 'bills',
  data () {
    return {
      items: [],
      loading: false,
      error: null,
      receitas: true,
      despesas: true,
      user: '110208035347780990937',
      file: '0B8myU7zyawFnX2ZKUkxzejZ5c0k'
    }
  },
  mounted: function () {
    // GapiIntegration.loadDriveApis()
    //   .then(() => {
    //     console.log('starting authorize')
    //     GapiIntegration.authorize(true, this.user)
    //       .then(() => {
    //         return this.loadThisFile()
    //       })
    //       .catch((reason) => {
    //         console.log('error inload or authorize')
    //         this.$refs.login.open()
    //       })
    //   })
  },
  created () {
    this.byJovane()
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.error = this.items = null
      this.items = getBills()
      // this.items = getBills()
      console.log(this.items)
    },
    byJovane () {
      console.log('desenvolvido por @jovanepires')
    },
    changeFilter: function (tabIndex) {
      console.log(this.items)
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
      return this.items || {}
    },
    negativeItems: function () {
      if (!this.items) {
        return {}
      }
      return this.items.filter(function (item) {
        return item.value < 0
      })
    },
    positiveItems: function () {
      if (!this.items) {
        return {}
      }
      return this.items.filter(function (item) {
        return item.value > 0
      })
    },
    total: function () {
      if (!this.items) {
        return 0
      }
      let self = this
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
  /*body { padding-bottom: 70px; }*/

  table {
    background: #ffffff;
  }
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


  .float-date{
    font-size: 9px;
    display: flex;
    flex: 1;
  }
  .loading {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
  }
  .md-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
  }
</style>
