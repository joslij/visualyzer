param appname string

resource storageAcccount 'Microsoft.Storage/storageAccounts@2021-02-01' = {
  name: '${appname}stracc'
  location: resourceGroup().location
  kind: 'StorageV2'
  sku: {
    name: 'Standard_LRS'
  }
}

resource container 'Microsoft.Storage/storageAccounts/blobServices/containers@2021-02-01' = {
  name: '${storageAcccount.name}/default/images'
}

output storageAccount object = {
  id: storageAcccount.id
  name: storageAcccount.name
  apiVersion: storageAcccount.apiVersion
}
