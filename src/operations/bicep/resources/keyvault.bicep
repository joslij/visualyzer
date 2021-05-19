param appname string
param resourceName string
param principalId string
param storageAccount object
param cosmosDbAccount object
param computerVision object
param webApp object

var secrets = [
  'get'
  'set'
  'list'
  'delete'
]

resource keyVault 'Microsoft.KeyVault/vaults@2021-04-01-preview' = {
  name: resourceName
  location: resourceGroup().location
  properties: {
    tenantId: subscription().tenantId
    sku: {
      family: 'A'
      name: 'standard'
    }
    accessPolicies: [
      {
        objectId: principalId
        permissions: {
          secrets: secrets
        }
        tenantId: subscription().tenantId
      }
      {
        objectId: reference(webApp.id, webApp.apiVersion, 'Full').identity.principalId
        permissions: {
          secrets: secrets
        }
        tenantId: reference(webApp.id, webApp.apiVersion, 'Full').identity.tenantId
      }
    ]
  }

  resource cosmosConnectionString 'secrets' = {
    name: 'CosmosConnectionString'
    properties: {
      value: 'AccountEndpoint=${reference(cosmosDbAccount.id, cosmosDbAccount.apiVersion).documentEndpoint};AccountKey=${listKeys(cosmosDbAccount.id, cosmosDbAccount.apiVersion).primaryMasterKey};'
    }
  }

  resource storageKeySecret 'secrets' = {
    name: 'StorageKey'
    properties: {
      value: listKeys(storageAccount.id, storageAccount.apiVersion).keys[0].value
    }
  }

  resource storageConnectionStringSecret 'secrets' = {
    name: 'StorageConnectionString'
    properties: {
      value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${listKeys(storageAccount.id, storageAccount.apiVersion).keys[0].value};EndpointSuffix=${environment().suffixes.storage}'
    }
  }

  resource computerVisionSubscriptionKeySecret 'secrets' = {
    name: 'ComputerVisionSubscriptionKey'
    properties: {
      value: listKeys(computerVision.id, computerVision.apiVersion).key1
    }
  }
}

output keyVault object = {
  id: keyVault.id
  name: keyVault.name
  apiVersion: keyVault.apiVersion
}
