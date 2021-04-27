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

    resource cosmosSqlDbContainer_Users 'containers' = {
      name: 'users'
      properties: {
        options: {
          throughput: 400
        }
        resource: {
          id: 'users'
          partitionKey: {
            paths: [
              '/role'
            ]
          }
          uniqueKeyPolicy: {
            uniqueKeys: [
              {
                paths: [
                  '/email'
                ]
              }
            ]
          }
        }
      }
    }

    resource cosmosSqlDbContainer_Images 'containers' = {
      name: 'visuals'
      properties: {
        options: {
          throughput: 400
        }
        resource: {
          id: 'visuals'
          partitionKey: {
            paths: [
              '/userId'
            ]
          }
        }
      }
    }
  }
}

output cosmosDbAccount object = {
  id: cosmosDbAccount.id
  name: cosmosDbAccount.name
  apiVersion: cosmosDbAccount.apiVersion
}
