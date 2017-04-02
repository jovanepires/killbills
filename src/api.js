const items = [
  {
    'title': 'SALARIO',
    'description': 'Salário',
    'value': 1000.0,
    'currency': 'BRL',
    'resource': 'cc_itau',
    'date': '2017-02-25T00:00:00Z',
    'due': '2017-02-25T00:00:00Z',
    'tags': [
      'salario'
    ]
  },
  {
    'title': 'ALUGUEL',
    'description': 'Aluguel',
    'value': -600.0,
    'currency': 'BRL',
    'resource': 'cc_itau',
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
    'title': 'SMARTFIT',
    'description': '',
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
    'title': 'SMARTFIT',
    'description': '',
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
    'title': 'VIVO',
    'description': 'Telefone fixo',
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
    'title': 'FARMACIA',
    'description': 'REMEDIO',
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
    'title': 'RECARGA',
    'description': '',
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
    'title': 'RECARGA',
    'description': '',
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
    'title': 'CARTAO',
    'description': 'Mastercard',
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
  }
]

export function getBills () {
  // fake an API request
  return items
}
