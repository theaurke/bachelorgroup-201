using ReactApp;
using Microsoft.Data.SqlClient;

public static class DatabaseAPI
{
    public static async Task InsertDataDB()
    {
        try
        {
            // Azure SQL Database connection string
            SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
            builder.DataSource = "tcp:ecoestimate-sqlserver.database.windows.net";
            builder.UserID = "group11";
            builder.Password = "Prog-jentene123";
            builder.InitialCatalog = "EcoEstimateDB";
            
            using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
            {
                connection.Open();
                
                // Fetch data from API and parse response
                var carbonDataList = await ElMapAPI.CarbonIntensityList();
                
                foreach (var data in carbonDataList)
                {
                    ElMapAPI.CheckAndUpdateDatabase(connection, data);
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error during insertion/update: {ex.Message}");
        }
    }
}