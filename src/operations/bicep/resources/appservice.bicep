param appname string
param keyVault object

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
      'KEY_VAULT_NAME': '${keyVault.name}'
      'WEBSITE_WEBDEPLOY_USE_SCM': 'true'
      'API_BASE_URL': '/api'
    }
  }
}

output webApp object = {
  id: webApp.id
  name: webApp.name
  apiVersion: webApp.apiVersion
}
