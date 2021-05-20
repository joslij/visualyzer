param appname string
param keyVaultName string
param storageAccountName string
param jwtPrivateKeyValue string
param jwtPublicKeyValue string

resource plan 'Microsoft.Web/serverfarms@2020-12-01' = {
  name: '${appname}-appservice-plan'
  location: resourceGroup().location
  kind: 'linux'
  properties: {
    targetWorkerCount: 1
    targetWorkerSizeId: 0
    reserved: true
  }
  sku: {
    tier: 'Basic'
    name: 'B1'
  }
}

resource webApp 'Microsoft.Web/sites@2018-11-01' = {
  name: '${appname}'
  location: resourceGroup().location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    serverFarmId: plan.id
    siteConfig: {
      alwaysOn: true
      linuxFxVersion: 'NODE|14-lts'
      appSettings: []
    }
    httpsOnly: true
    clientAffinityEnabled: false
  }

  resource webApp_Settings 'config@2020-12-01' = {
    name: 'appsettings'
    properties: {
      'AZURE_COMPUTER_VISION_API_ANALYZE_ENDPOINT': 'https://${resourceGroup().location}.api.cognitive.microsoft.com/vision/v3.2/analyze'
      'JWT_PRIVATE_KEY_VALUE': '${jwtPrivateKeyValue}'
      'JWT_PUBLIC_KEY_VALUE': '${jwtPublicKeyValue}'
      'KEY_VAULT_NAME': '${keyVaultName}'
      'NODE_ENV': 'production'
      'PORT': '80'
      'STORAGE_ACCOUNT_HOST': '${storageAccountName}.blob.core.windows.net'
      'WEBSITE_WEBDEPLOY_USE_SCM': 'true'
    }
  }
}

output webApp object = {
  id: webApp.id
  name: webApp.name
  apiVersion: webApp.apiVersion
}
