using System.Data;
using Microsoft.Data.SqlClient;
using Microsoft.AspNetCore.Mvc.Testing;

namespace ReactApp.Server
{
    public class DatabaseIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
    {
        private readonly WebApplicationFactory<Program> _app;
        private readonly string _connectionString = "Server=tcp:ecoestimate-sqlserver.database.windows.net,1433;Initial Catalog=EcoEstimateDbTest;Persist Security Info=False;User ID=group11;Password=Prog-jentene123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30";
        private readonly IDbConnection _connection;

        public DatabaseIntegrationTests(WebApplicationFactory<Program> app)
        {
            _connection = new SqlConnection(_connectionString);
            _app = app;
        }
        
        [Fact]
        public async Task TestCarbonIntensityList()
        {
            // Act
            var carbonDataList = await ElMapApi.CarbonIntensityList();

            // Assert - Check if the returned list contains expected number of items
            Assert.Equal(29, carbonDataList.Count); 
        }

        // Test and verifies that insertion of data into the database is successful
        [Fact]
        public async Task InsertIntoDbTest()
        {
            // Arrange - Clear existing data from the database
            await ClearDatabase();
            
            // Act
            await DbConnection.InsertDataDb(_connectionString, null);
            
            // Assert
            AssertDataInsertedSuccessfully();
        }
        
        private void AssertDataInsertedSuccessfully()
        {
            // Act - Query the database to check if the data was inserted
            using (var command = _connection.CreateCommand())
            {
                _connection.Open();
                command.CommandText = "SELECT COUNT(*) FROM dbo.Region";
                var count = (int)command.ExecuteScalar();

                // Assert - Check if the expected number of records were inserted
                Assert.Equal(29, count);
            }
        }
        
        // Test and verifies that fetching region data from the database is successful
        [Fact]
        public async Task TestGetCarbonIntensity_Success()
        {
            // Act
            var client = _app.CreateClient();
            var response = await client.GetAsync($"/Region/carbonIntensity/Norway");
            var responseBody = await response.Content.ReadAsStringAsync();

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
        }
        
        // Test and verifies that fetching PUE data from the database is successful
        [Fact]
        public async Task TestGetPUE_Success()
        {
            // Act
            var client = _app.CreateClient();
            var response = await client.GetAsync("/Region/pue/Norway");
            var responseBody = await response.Content.ReadAsStringAsync();

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal("application/json; charset=utf-8", response.Content.Headers.ContentType.ToString());
        }
        
        // Function to clear the database of old data
        private Task ClearDatabase()
        {
            using (var command = _connection.CreateCommand())
            {
                _connection.Open();
                command.CommandText = "DELETE FROM dbo.Region";
                command.ExecuteNonQuery();
                _connection.Close();
            }

            return Task.CompletedTask;
        }
        
        // Cleanup resources, if any
        [Fact]
        public void Dispose()
           {
               _connection.Dispose();
           }
    }
}