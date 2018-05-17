<template>
  <div id="app">
    <md-app @md-waterfall="true" md-mode="fixed">
      <md-app-toolbar class="md-dense md-primary" md-elevation="4">
        <div class="md-toolbar-row">
          <div class="md-toolbar-section-start">
            <md-button class="md-icon-button" @click="toggleMenu" v-if="!menuVisible">
              <md-icon>menu</md-icon>
            </md-button>

            <span class="md-title">
              PayOut
            </span>
          </div>

          <div class="md-toolbar-section-end">
            <sync-button></sync-button>
          </div>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible" class="md-fixed">

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

              <div>{{ userInfo.email }}</div>

          </div>


        </md-toolbar>

        <md-list>
          <md-subheader>Wallets</md-subheader>
          <md-list-item>
            <md-icon>account_balance_wallet</md-icon>
            <span class="md-list-item-text">Money</span>
          </md-list-item>
          <md-list-item>
            <md-icon>credit_card</md-icon>
            <span class="md-list-item-text">Credit Card</span>
          </md-list-item>

          <md-divider></md-divider>
          <md-subheader>Filters</md-subheader>

          <md-list-item>
            <md-icon>list</md-icon>
            <span class="md-list-item-text">Home</span>
          </md-list-item>
          <md-list-item>
            <md-icon>list</md-icon>
            <span class="md-list-item-text">Work</span>
          </md-list-item>
          <md-list-item>
            <md-icon>list</md-icon>
            <span class="md-list-item-text">Travel</span>
          </md-list-item>

          <md-divider></md-divider>
          <md-subheader>Tags</md-subheader>

          <md-list-item>
            <md-icon>label</md-icon>
            <span class="md-list-item-text">Uber</span>
          </md-list-item>
          <md-list-item>
            <md-icon>label</md-icon>
            <span class="md-list-item-text">Food</span>
          </md-list-item>
          <md-divider></md-divider>
          <md-list-item>
            <md-icon>build</md-icon>
            <span class="md-list-item-text">Configurations</span>
          </md-list-item>
          <md-list-item>
            <md-icon>info</md-icon>
            <span class="md-list-item-text">About & Feedback</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content class="md-layout md-gutter md-alignment-center">
        <!-- <md-content class="md-scrollbar md-layout md-gutter md-alignment-center"> -->
          <bills-view ref="bills"></bills-view>
        <!-- </md-content> -->
      </md-app-content>
    </md-app>

    <md-dialog ref="login" :md-active.sync="showLogin">
      <md-dialog-title>Login</md-dialog-title>
      <md-dialog-content>
        <p>Please log in with your Google Drive account</p>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click.native="handleAuthClick">Login</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-speed-dial class="md-bottom-right md-fixed" md-direction="top" md-event="hover">
      <md-speed-dial-target>
        <md-icon class="md-morph-initial">add</md-icon>
        <md-icon class="md-morph-final">close</md-icon>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button class="md-icon-button" @click="openCreateNewItem(1)">
          <md-icon>add</md-icon>
        </md-button>

        <md-button class="md-icon-button" @click="openCreateNewItem(-1)">
          <md-icon>remove</md-icon>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>

    <create-new-item-dialog ref="new_item_dialog" v-bind:valuetype="newvaluetype"></create-new-item-dialog>
    <create-new-file-dialog ref="create_new_file"></create-new-file-dialog>
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
import CreateNewItemDialog from '@/components/CreateNewItemDialog'
import Bills from '@/components/Bills'
import Sync from '@/components/Sync'
import user from '@/stores/user'
import { file } from '@/services'

export default {
  name: 'app',
  components: {
    'bills-view': Bills,
    'sync-button': Sync,
    'create-new-file-dialog': CreateNewFileDialog,
    'create-new-item-dialog': CreateNewItemDialog
  },
  data () {
    return {
      menuVisible: false,
      showLogin: false,
      items: [],
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
      this.$refs.create_new_file.openDialog()
    },
    openCreateNewItem (valuetype) {
      this.newvaluetype = valuetype
      this.$refs.new_item_dialog.openDialog()
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

<style>
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
      padding: 0;
    }

    .md-app-content .md-card {
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>
