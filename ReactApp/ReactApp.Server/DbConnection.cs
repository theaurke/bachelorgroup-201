using Azure.Identity;
using Azure.Security.KeyVault.Secrets;
using Microsoft.Data.SqlClient;

namespace ReactApp.Server;

public class DbConnection
{
    // Get connection to database based on connection string or key vault
    public static async Task<SqlConnection> GetOpenConnectionAsync(string connectionDb, string? secretName)
    {
        string connectionString;

        if (IsConnectionString(connectionDb))
        {
            connectionString = connectionDb;
        }
        else
        {
            connectionString = GetConnectionStringKeyVault(connectionDb, secretName);
        }
        SqlConnection connection = new SqlConnection(connectionString);
        await connection.OpenAsync();
        return connection;
    }
    
    // Get connection string from key vault
    public static string GetConnectionStringKeyVault(string keyVaultName, string? secretName)
    {
        string keyVaultUri = $"https://{keyVaultName}.vault.azure.net/";

        var client = new SecretClient(new Uri(keyVaultUri), new AzureCliCredential());

        try
        {
            var secret = client.GetSecret(secretName).Value;
            return secret.Value;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while retrieving the secret: {ex.Message}");
            throw;
        }
    }
    
    // Method to determine if the input is a connection string
    private static bool IsConnectionString(string input)
    {
        return input.Contains("Server=tcp");
    }
    
    public static async Task InsertDataDb(string connectionString, string? secretName)
    {
        try
        {
            using (SqlConnection connection = await GetOpenConnectionAsync(connectionString, secretName))
            {
                // Fetch data from API and parse response
                var carbonDataList = await ElMapApi.CarbonIntensityList();

                foreach (var data in carbonDataList) ElMapApi.CheckAndUpdateDatabase(connection, data);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error during insertion/update: {ex.Message}");
        }
    }
}