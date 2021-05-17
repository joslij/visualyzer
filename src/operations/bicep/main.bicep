targetScope = 'subscription'

@minLength(1)
@maxLength(10)
@description('The name of the application which will be used as prefix for resource names')
param appname string = 'visualyzer'

@description('The primary location for all the resources')
param location string

@minLength(1)
@description('The object ID of the Azure AD user or group who is provisioning the resources')
param principalId string

// Resource Group
resource rg 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: '${appname}-rg'
  location: location
}

// Storage Account
module storageAccount 'resources/storageaccount.bicep' = {
  name: '${appname}-resources-stracc'
  scope: rg
  params: {
    appname: appname
  }
}

// Key Vault
module keyVault 'resources/keyvault.bicep' = {
  name: '${appname}-resources-kv'
  scope: rg
  params: {
    appname: appname
    principalId: principalId
    storageAccount: storageAccount.outputs.storageAccount
    cosmosDbAccount: cosmosDbAccount.outputs.cosmosDbAccount
    computerVision: computerVision.outputs.computerVision
  }
}

// Cosmos DB
module cosmosDbAccount 'resources/cosmosdb.bicep' = {
  name: '${appname}-resources-cosmosdb'
  scope: rg
  params: {
    appname: appname
  }
}

// Computer Vision
module computerVision 'resources/computervision.bicep' = {
  name: '${appname}-resources-computervision'
  scope: rg
  params: {
    appname: appname
  }
}

// App service plan and app
module appService 'resources/appservice.bicep' = {
  name: '${appname}-resources-appservice'
  scope: rg
  params: {
    appname: appname
  }
}
