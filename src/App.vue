<template>
  <div id="app" class="col-md-4 offset-md-4">
    <md-dialog ref="login">
      <md-dialog-title>Login</md-dialog-title>
      <md-dialog-content>
        <p>Please log in with your Google Drive account</p>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="handleAuthClick">Login</md-button>
      </md-dialog-actions>
    </md-dialog>
    <div class="loading" v-if="loading">
      <md-spinner :md-size="60" md-indeterminate></md-spinner>
    </div>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
// import 'mdbootstrap/css/bootstrap.min.css'
// import 'mdbootstrap/css/mdb.min.css'
// import 'mdbootstrap/js/bootstrap.min.js'
// import 'mdbootstrap/js/mdb.min.js'
import { storeBills } from '@/api.js'
import GapiIntegration from '@/gapi/gapi-integration'

export default {
  name: 'app',
  data () {
    return {
      items: [],
      loading: true,
      error: null,
      receitas: true,
      despesas: true,
      user: '110208035347780990937',
      file: '0B8myU7zyawFnX2ZKUkxzejZ5c0k'
    }
  },
  mounted: function () {
    GapiIntegration.loadDriveApis()
      .then(() => {
        console.log('starting authorize')
        GapiIntegration.authorize(true, this.user)
          .then(() => {
            return this.loadThisFile()
          })
          .catch((reason) => {
            console.log('error inload or authorize')
            this.$refs.login.open()
          })
      })
  },
  methods: {
    handleAuthClick () {
      this.$refs.login.close()
      GapiIntegration.authorize(false, this.user)
        .then(() => {
          this.loadThisFile()
        })
        .catch((reason) => {
          console.log(reason)
        })
    },
    loadThisFile () {
      var vm = this
      if (!this.file) {
        return
      }

      GapiIntegration.loadFile(this.file).then((file) => {
        vm.$nextTick(function () {
          vm.items = JSON.parse(file.content)
          storeBills(file.content)
          this.loading = false
        })
      })
    }
  }
}
</script>

<style>
body {
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    line-height: 1.4em;
    background: #e0e0e0 !important;
    color: #4d4d4d;
    /*min-width: 230px;
    max-width: 550px;*/
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-font-smoothing: antialiased;
    font-smoothing: antialiased;
    font-weight: 300;
}

#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;*/
  /*margin: 130px 0 40px 0;*/
}

#app h1 {
  font-weight: 100;
  text-align: center;
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

#app .main {
  position: relative;
  z-index: 2;
}

/*.md-speed-dial.md-fab-bottom-right,
.md-button.md-fab.md-fab-bottom-right {
  top: auto;
  right: 20px !important;
  bottom: 20px !important;
  left: auto;
  position: fixed !important;
}*/
.fixed-button-right {
  bottom: 0;
  padding: 23px 12px 23px 15px;
  /*pointer-events: none;*/
  position: fixed !important;
  right: 0;
  white-space: nowrap;
  z-index: 21;
}
/*.fixed-button-right-wrapper {
  -webkit-flex-direction: row-reverse;
  flex-direction: row-reverse;
  display: -webkit-flex;
  display: flex;
}*/
@media (max-width:1279px) {
  .md-tab-zero-padding-medium {
    padding: 0 !important;
  }
  .md-flex-offset-medium-0 {
    margin-left: 0 !important;
  }
}
</style>
