param appname string

resource cosmosDbAccount 'Microsoft.DocumentDB/databaseAccounts@2021-03-15' = {
  name: '${appname}-cosmos-account'
  location: resourceGroup().location
  kind: 'GlobalDocumentDB'
  properties: {
    enableFreeTier: true
    databaseAccountOfferType: 'Standard'
    enableAutomaticFailover: false
    consistencyPolicy: {
      defaultConsistencyLevel: 'Session'
    }
    locations: [
      {
        failoverPriority: 0
        locationName: resourceGroup().location
      }
    ]
  }

  resource cosmosSqlDb 'sqlDatabases' = {
    name: 'visualyzer'
    properties: {
      options: {
        throughput: 400
      }
      resource: {
        id: 'visualyzer'
      }
    }

    resource cosmosSqlDbContainer 'containers' = {
      name: 'images'
      properties: {
        options: {
          throughput: 400
        }
        resource: {
          partitionKey: {
            paths: [
              '/category'
            ]
          }
          id: 'images'
          uniqueKeyPolicy: {
            uniqueKeys: [
              {
                paths: [
                  '/uid'
                ]
              }
            ]
          }
        }
      }
    }
  }
}

output cosmosDbAccount object = {
  id: cosmosDbAccount.id
  apiVersion: cosmosDbAccount.apiVersion
}
