const items = [
  {
    '_id': 1,
    'description': 'SALARIO',
    'note': 'Salário',
    'value': 1000.0,
    'currency': 'BRL',
    'resource': {'name': 'Itau', 'namespace': 'cc_itau'},
    'date': '2017-02-25T00:00:00Z',
    'due': '2017-02-25T00:00:00Z',
    'tags': [
      'salario'
    ]
  },
  {
    '_id': 2,
    'description': 'ALUGUEL',
    'note': 'Aluguel',
    'value': -600.0,
    'currency': 'BRL',
    'resource': {'name': 'Itau', 'namespace': 'cc_itau'},
    'date': '2017-02-28T00:00:00Z',
    'due': '2017-02-28T00:00:00Z',
    'tags': [
      'aluguel',
      'casa',
      'moradia',
      'fixa'
    ]
  },
  {
    '_id': 3,
    'description': 'SMARTFIT',
    'note': '',
    'value': -58.57,
    'currency': 'BRL',
    'resource': 'itau_cc',
    'date': '2017-03-01T00:00:00Z',
    'due': '2017-03-01T00:00:00Z',
    'tags': [
      'esporte',
      'academia',
      'musculação',
      'fixa'
    ]
  },
  {
    '_id': 4,
    'description': 'SMARTFIT',
    'note': '',
    'value': -89.9,
    'currency': 'BRL',
    'resource': 'itau_cc',
    'date': '2017-03-01T00:00:00Z',
    'due': '2017-03-01T00:00:00Z',
    'tags': [
      'esporte',
      'academia',
      'musculação',
      'variável'
    ]
  },
  {
    '_id': 5,
    'description': 'VIVO',
    'note': 'Telefone fixo',
    'value': -161.88,
    'currency': 'BRL',
    'resource': 'itau_cc',
    'date': '2017-03-01T00:00:00Z',
    'due': '2017-03-01T00:00:00Z',
    'tags': [
      'casa',
      'comunicação',
      'telefonia',
      'internet',
      'fixa'
    ]
  },
  {
    '_id': 6,
    'description': 'FARMACIA',
    'note': 'REMEDIO',
    'value': -10.99,
    'currency': 'BRL',
    'resource': 'itau_cc',
    'date': '2017-03-06T00:00:00Z',
    'due': '2017-03-06T00:00:00Z',
    'tags': [
      'remédio',
      'saúde'
    ]
  },
  {
    '_id': 7,
    'description': 'RECARGA',
    'note': '',
    'value': -10.00,
    'currency': 'BRL',
    'resource': 'itau_cc',
    'date': '2017-03-06T00:00:00Z',
    'due': '2017-03-06T00:00:00Z',
    'tags': [
      'celular',
      'felefone',
      'pré-pago',
      'recarga'
    ]
  },
  {
    '_id': 8,
    'description': 'RECARGA',
    'note': '',
    'value': -10.00,
    'currency': 'BRL',
    'resource': 'itau_cc',
    'date': '2017-03-06T00:00:00Z',
    'due': '2017-03-06T00:00:00Z',
    'tags': [
      'celular',
      'felefone',
      'pré-pago',
      'recarga'
    ]
  },
  {
    '_id': 9,
    'description': 'CARTAO',
    'note': 'Mastercard',
    'value': -1093.43,
    'currency': 'BRL',
    'resource': 'itau_cc',
    'date': '2017-03-06T00:00:00Z',
    'due': '2017-03-17T00:00:00Z',
    'tags': [
      'cartão',
      'outros',
      'variável'
    ]
  },
  {
    '_id': 10,
    'description': 'GRANA',
    'note': 'Mastercard',
    'value': 1400.00,
    'currency': 'BRL',
    'resource': 'itau_cc',
    'date': '2017-03-06T00:00:00Z',
    'due': '2017-03-17T00:00:00Z',
    'tags': [
      'cartão',
      'outros',
      'variável'
    ]
  }
]

export function getBills () {
  // fake an API request
  return items
}

export function getBill (id) {
  // fake an API request
  return items.find(x => x._id === id)
}
