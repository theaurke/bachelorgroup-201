using ConsoleApp1;
using Microsoft.Data.SqlClient;

class Program
{
    static async Task Main()
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
                var carbonDataList = await Functions.CarbonIntensityList();
                
                foreach (var data in carbonDataList)
                {
                    Functions.CheckAndUpdateDatabase(connection, data);
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error during insertion/update: {ex.Message}");
        }
    }
}