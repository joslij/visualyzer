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

@minLength(1)
@description('The RSA private key value')
param jwtPrivateKeyValue string

@minLength(1)
@description('The RSA public key value')
param jwtPublicKeyValue string

var keyVaultName = '${appname}-kv'

// Resource Group
resource rg 'Microsoft.Resources/resourceGroups@2021-01-01' = {
  name: '${appname}-rg'
  location: location
}

// App service plan and app
module appService 'resources/appservice.bicep' = {
  name: '${appname}-resources-appservice'
  scope: rg
  params: {
    appname: appname
    keyVaultName: keyVaultName
    storageAccountName: storageAccount.outputs.storageAccount.name
    jwtPrivateKeyValue: jwtPrivateKeyValue
    jwtPublicKeyValue: jwtPublicKeyValue
  }
}

// Storage Account
module storageAccount 'resources/storageaccount.bicep' = {
  name: '${appname}-resources-stracc'
  scope: rg
  params: {
    appname: appname
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

// Key Vault
module keyVault 'resources/keyvault.bicep' = {
  name: '${appname}-resources-kv'
  scope: rg
  params: {
    appname: appname
    resourceName: keyVaultName
    principalId: principalId
    storageAccount: storageAccount.outputs.storageAccount
    cosmosDbAccount: cosmosDbAccount.outputs.cosmosDbAccount
    computerVision: computerVision.outputs.computerVision
    webApp: appService.outputs.webApp
  }
}
