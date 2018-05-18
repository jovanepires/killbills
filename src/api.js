const ITEM = {
  '_id': 0,
  'description': '',
  'note': '',
  'value': 0,
  'currency': 'BRL',
  'resource': {'name': 'carteira', 'namespace': 'carteira'},
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

export function getBills (fileContent) {
  // fake API request
  return JSON.parse(fileContent)
}

export function getBill (id) {
  // fake an API request
  return getBills().find(x => x._id === id)
}

export function addBill (obj) {
  return storeBills(getBills().push(obj))
}

// broofa @ https://stackoverflow.com/a/2117523
export function uuidv4 () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
