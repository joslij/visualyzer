param appname string

resource computerVision 'Microsoft.CognitiveServices/accounts@2017-04-18' = {
  name: '${appname}-cv'
  location: resourceGroup().location
  kind: 'ComputerVision'
  sku: {
    name: 'F0'
  }
  properties: {
    customSubDomainName: '${appname}-cv'
  }
  identity: {
    type: 'SystemAssigned'
  }
}

output computerVision object = {
  id: computerVision.id
  apiVersion: computerVision.apiVersion
}
