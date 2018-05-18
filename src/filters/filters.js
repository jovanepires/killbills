import Vue from 'vue'

const messages = {
  items: 'itens',
  'Create new Wallet': 'Criar nova Carteira'
}

Vue.filter('currency', function (value) {
  return 'R$ ' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
})

Vue.filter('translate', function (value) {
  return messages[value] || value
})
