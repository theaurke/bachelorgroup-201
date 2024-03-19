using ReactApp;
using Microsoft.Data.SqlClient;
using System.Data.SqlTypes;


public static class DatabaseAPI
{
    private static string GetConnectionString()
    {
        // Azure SQL Database connection string
        SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
        builder.DataSource = "tcp:ecoestimate-sqlserver.database.windows.net";
        builder.UserID = "group11";
        builder.Password = "Prog-jentene123";
        builder.InitialCatalog = "EcoEstimateDB";
        return builder.ConnectionString;
    }

    private static async Task<SqlConnection> GetOpenConnectionAsync()
    {
        SqlConnection connection = new SqlConnection(GetConnectionString());
        await connection.OpenAsync();
        return connection;
    }

    public static async Task InsertDataDB()
    {
        try
        {
            using (SqlConnection connection = await GetOpenConnectionAsync())
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


    public static async Task<T> ExtractDataDB<T>(string query, SqlParameter[] parameters, Func<SqlDataReader, T> processResult)
    {
        T result = default(T);   // variable to store the result of db query

        try
        { 
            // Establish connection to db
            using (SqlConnection connection = await GetOpenConnectionAsync())
            {
                // Create a SqlCommand object with the provided query and connection
                SqlCommand command = new SqlCommand(query, connection);

                // Add parameters to the command if any are provided
                command.Parameters.AddRange(parameters);

                // Execute the query asynchronously
                using (SqlDataReader reader = await command.ExecuteReaderAsync()) 
                {
                    // Process the result using the provided delegate
                    result = processResult(reader);
                }
            }
        }
        catch (Exception ex)
        {
            // Handle any exceptions that occur during database interaction
            Console.WriteLine($"An error occurred while executing the query: {ex.Message}");
        }

        // Return the result of the query (or null if an error occurred)
        return result;

    }
}