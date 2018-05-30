<template>
  <div id="app">
    <md-progress-bar v-if="loading" v-on:set-loading="loading = $event" class="md-accent" md-mode="indeterminate"></md-progress-bar>
    <md-app v-if="!loading" :md-waterfall="true" :md-fixed="true" v-on:show-create-new-wallet-dialog="openCreateNewWallet()">
      <md-app-toolbar class="md-dense md-primary" md-elevation="4">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">
              <span>PayOut</span>
              <md-icon>swap_horiz</md-icon>
            </span>
          </div>

          <div class="md-toolbar-section-end">
            <sync-button></sync-button>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" v-on:show-drawer="menuVisible = $event" class="md-fixed">

        <md-toolbar class="md-large md-dense md-accent" :md-elevation="0">
          <div class="md-toolbar-row">
            <div class="md-toolbar-section-end">
              <md-button class="md-icon-button md-dense" @click="toggleMenu">
                <md-icon>keyboard_arrow_left</md-icon>
              </md-button>
            </div>
          </div>
          <div class="md-toolbar-row">
              <md-avatar class="md-large"><img v-bind:src="userInfo.image" alt="me"></md-avatar>
          </div>
          <div class="md-toolbar-row md-layout md-alignment-center">
              <span>{{ userInfo.email }}</span>
          </div>
        </md-toolbar>
        <menu-view></menu-view>
      </md-app-drawer>
      <md-app-content class="">
        <!-- <md-content class="md-scrollbar md-layout md-gutter md-alignment-center"> -->
          <bills-view ref="bills"></bills-view>
        <!-- </md-content> -->
      </md-app-content>
    </md-app>
    <speed-dial v-if="!loading"></speed-dial>
    <md-dialog ref="login" :md-active.sync="showLogin">
      <md-dialog-title>Login</md-dialog-title>
      <md-dialog-content>
        <p>{{ 'Please log in with your Google Drive account' | translate }}</p>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="handleAuthClick">Login</md-button>
      </md-dialog-actions>
    </md-dialog>

    <create-new-file-dialog ref="create_new_file"></create-new-file-dialog>
    <create-new-filter-dialog ref="new_filter_dialog"></create-new-filter-dialog>
    <create-new-wallet-dialog ref="new_wallet_dialog"></create-new-wallet-dialog>
  </div>
</template>

<script>
// import 'mdbootstrap/css/bootstrap.min.css'
// import 'mdbootstrap/css/mdb.min.css'
// import 'mdbootstrap/js/bootstrap.min.js'
// import 'mdbootstrap/js/mdb.min.js'
import qs from 'querystringify'
// import { storeBills } from '@/api.js'
import GapiIntegration from '@/gapi/gapi-integration'
import CreateNewFileDialog from '@/components/CreateNewFileDialog'
import CreateNewFilterDialog from '@/components/CreateNewFilterDialog'
import CreateNewWalletDialog from '@/components/CreateNewWalletDialog'
import Bills from '@/components/Bills'
import Sync from '@/components/Sync'
import Menu from '@/components/Menu'
import SpeedDial from '@/components/SpeedDial'
import user from '@/stores/user'
import { file } from '@/services'

export default {
  name: 'app',
  components: {
    'bills-view': Bills,
    'sync-button': Sync,
    'menu-view': Menu,
    'speed-dial': SpeedDial,
    'create-new-file-dialog': CreateNewFileDialog,
    'create-new-filter-dialog': CreateNewFilterDialog,
    'create-new-wallet-dialog': CreateNewWalletDialog
  },
  data () {
    return {
      menuVisible: false,
      showLogin: false,
      loading: true,
      error: null,
      receitas: true,
      despesas: true,
      user: null,
      file: null,
      newvaluetype: 1,
      userInfo: user.state
    }
  },
  mounted: function () {
    let queryVars = qs.parse(window.location.search)
    this.user = queryVars.user
    this.file = queryVars.file // window.localStorage.getItem('fileMetadata.id')

    GapiIntegration.loadDriveApis()
      .then(() => {
        console.log('starting authorize')
        GapiIntegration.authorize(true, this.user)
          .then(() => {
            this.loading = false
            this.loadUserData()
            this.loadThisFile()
          })
          .catch((reason) => {
            console.log('error inload or authorize')
            console.log(reason)
            this.showLogin = true
            this.loading = false
          })
      })
  },
  methods: {
    handleAuthClick () {
      this.showLogin = false
      GapiIntegration.authorize(false, this.user)
        .then(() => {
          this.loadUserData()
          this.loadThisFile()
        })
        .catch((reason) => {
          console.log(reason)
        })
    },
    loadUserData () {
      console.log('load userData')
      GapiIntegration.getUserProfile().then((resp) => {
        user.setUser({
          name: resp.result.displayName,
          image: resp.result.image.url,
          email: resp.result.emails[0].value
        })
      })
    },
    loadThisFile () {
      console.log('load file')
      // if no file id in URL, open create dialog
      if (this.file) {
        return file.loadFromGDrive(this.file)
          .then(() => { this.loading = false })
          .catch((error) => {
            this.errorMessage = error
            console.error(error)
            // this.$refs.errorMessage.open()
          })
      } else {
        this.openCreateNewFile()
      }
    },
    openCreateNewFile () {
      this.loading = false
      this.$refs.create_new_file.openDialog()
    },
    tryAgain () {
      window.location.reload()
    },
    toggleMenu () {
      this.menuVisible = !this.menuVisible
    }
  }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #700be2, // The primary color of your brand
  accent: #9800e6, // The secondary color of your brand
  theme: light // This can be dark or light
));

@import "~vue-material/dist/theme/all";

  .md-app {
    height: 100vh;
  }

  .text-right {
    text-align: right;
  }
  /* fix google picker conflict with vue-material */
  .picker-frame.picker-dialog-frame {
    height: 100% !important;
  }

  /* mobile friendly */
  @media (max-width: 1024px) {
    .picker.picker-dialog {
      top: 0 !important;
      height: 100% !important;
    }

    .picker.picker-dialog > .picker.picker-dialog-content {
      height: 100% !important;
    }

    .md-app-content {
      padding: 0 !important;
    }

    .md-app-content .md-card {
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
  }
</style>
