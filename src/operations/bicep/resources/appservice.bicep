param appname string

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

resource webapp 'Microsoft.Web/sites@2018-11-01' = {
  name: '${appname}-appservice-app'
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
}
