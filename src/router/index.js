import Vue from 'vue'
import Router from 'vue-router'
import Bills from '@/components/Bills'

Vue.use(Router)
Vue.filter('currency', function (value) {
  return 'R$ ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
})

Vue.filter('date', function (value) {
  let date = new Date(value.replace(/-/g, '/').replace(/T.+/, ''))
  return date.getDate() + '/' + (date.getMonth() + 1)
})

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Bills',
      component: Bills
    }
  ]
})
