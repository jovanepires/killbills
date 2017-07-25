const ITEM = {
  '_id': 0,
  'description': '',
  'note': '',
  'value': 0.00,
  'currency': 'BRL',
  'resource': 'carteira',
  'date': '',
  'due': '',
  'tags': []
}

export function onGapiLoaded () {
  console.log('foi')
}

export function defaultBill () {
  return ITEM
}

export function storeBills (obj) {
  return localStorage.setItem('items', obj)
}

export function getBills () {
  // fake an API request
  return JSON.parse(localStorage.getItem('items'))
}

export function getBill (id) {
  // fake an API request
  return getBills().find(x => x._id === id)
}

export function addBill (obj) {
  return storeBills(getBills().push(obj))
}
