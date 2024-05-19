using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace ReactApp.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class VMController : ControllerBase
{
    private readonly IDatabaseApi _databaseApi;
    private readonly ILogger<VMController> _logger;

    public VMController(ILogger<VMController> logger, IDatabaseApi databaseApi)
    {
        _logger = logger;
        _databaseApi = databaseApi;
    }


    // Fetch all available VM sizes from db
    [HttpGet]
    public async Task<ActionResult<IEnumerable<string>>> GetAllVM()
    {
        try
        {
            // Query to get data from db
            var query = "SELECT size FROM Instance";
            SqlParameter[] parameters = { };

            // Execute the query asynchronously and retrieve the result
            var vmSizes = await _databaseApi.ExtractDataDb(query, parameters, reader =>
            {
                var sizes = new List<string>();
                while (reader.Read()) sizes.Add(reader.GetString(0));
                return sizes;
            });

            // Return VM sizes as HTTP response
            return Ok(vmSizes);
        }
        catch (Exception ex)
        {
            // Log and handle any exceptions
            _logger.LogError($"An error occurred while fetching VM sizes: {ex.Message}");
            return StatusCode(500, "An error occurred while fetching VM sizes. Please try again later.");
        }
    }

    // Fetch data about a spesific VM size  /size
    [HttpGet("{size}")]
    public async Task<ActionResult<VMData>> GetSizeData(string size)
    {
        try
        {
            // Query to get data from db
            var query = @"
                    SELECT 
                        Instance.cpu_num, 
                        Instance.gpu_num, 
                        Instance.embodied_emissions, 
                        CPU.tdp AS cpu_tdp, 
                        GPU.tdp AS gpu_tdp
                    FROM 
                        Instance 
                    JOIN 
                        CPU ON Instance.cpu_id = CPU.id 
                    LEFT JOIN 
                        GPU ON Instance.gpu_id = GPU.id AND Instance.gpu_num IS NOT NULL
                    WHERE 
                        Instance.size = @size";
            SqlParameter[] parameters = [new SqlParameter("@size", size)];

            // Execute query and retrieve the result
            var vmData = await _databaseApi.ExtractDataDb(query, parameters, reader =>
            {
                if (reader.Read())
                    return new VMData
                    {
                        CPU_Num = reader.GetInt32(reader.GetOrdinal("cpu_num")),
                        GPU_Num = reader.IsDBNull(reader.GetOrdinal("gpu_num"))
                            ? 0
                            : (decimal?)reader.GetDecimal(reader.GetOrdinal("gpu_num")),
                        Embodied_Emissions = reader.GetDecimal(reader.GetOrdinal("embodied_emissions")),
                        CPU_TDP = reader.GetInt32(reader.GetOrdinal("cpu_tdp")),
                        GPU_TDP = reader.IsDBNull(reader.GetOrdinal("gpu_tdp"))
                            ? 0
                            : (int?)reader.GetInt32(reader.GetOrdinal("gpu_tdp"))
                    };
                return null; // If no data found
            });

            // Return VM data as HTTP response
            if (vmData != null)
                return Ok(vmData);
            return NotFound(); // Return 404 if no data found for the specified size
        }
        catch (Exception ex)
        {
            // Log and handle any exceptions
            _logger.LogError($"An error occurred while fetching VM data for size {size}: {ex.Message}");
            return StatusCode(500,
                $"An error occurred while fetching VM data for size {size}. Please try again later.");
        }
    }
}