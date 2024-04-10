@description('The SKU of App service plan')
param sku string = 'B1' 

@description('Azure resource deployment location')
param location string = 'westeurope'

var webSiteName = 'ecoestimate'


resource appServicePlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: 'ASPecoestimate'
  location: location
  sku: {
    name: sku
  }
}

resource webApp 'Microsoft.Web/sites@2022-03-01' = {
  name: webSiteName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
  }
  kind: 'app'
  dependsOn: [
      appServicePlan
    ]
}