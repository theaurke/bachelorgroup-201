using System.Data;
using Microsoft.Data.SqlClient;

namespace ReactApp.Server;

public interface IDatabaseApi
{
    Task<T> ExtractDataDb<T>(string query, SqlParameter[] parameters, Func<IDataReader, T> map);
}

public class DatabaseApi : IDatabaseApi
{
    public async Task<T> ExtractDataDb<T>(string query, SqlParameter[] parameters, Func<IDataReader, T> map)
    {
        return await DatabaseAPI.ExtractDataDb(query, parameters, map);
    }
}