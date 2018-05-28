// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import VueMoment from 'vue-moment'
import moment from 'moment-timezone'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default.css' // This line here
import '@/filters/filters'

Vue.config.productionTip = false

Vue.use(VueMoment, {
  moment
})

Vue.moment.locale('pt-br')

Vue.use(VueMaterial)

require('es6-promise').polyfill()

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  template: '<App/>',
  components: { App }
})
