using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace ReactApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegionController : ControllerBase
    {
        private readonly ILogger<RegionController> _logger;
        private readonly IDatabaseApi _databaseApi;

        public RegionController(ILogger<RegionController> logger, IDatabaseApi databaseApi)
        {
            _logger = logger;
            _databaseApi = databaseApi;
        }
        
        // Fetch all available region country names from db
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> GetAllCountries()
        {
            try
            {
                // Query to get data from db
                string query = "SELECT country FROM Region";
                SqlParameter[] parameters = new SqlParameter[] { };

                // Execute the query asynchronously and retrieve the result
                var countryNames = await _databaseApi.ExtractDataDb(query, parameters, reader =>
                {
                    List<string> names = new List<string>();
                    while (reader.Read())
                    {
                        names.Add(reader.GetString(0));
                    }
                    return names;
                });

                // Return country names as HTTP response
                return Ok(countryNames);
            }
            catch (Exception ex)
            {
                // Log and handle any exceptions
                _logger.LogError($"An error occurred while fetching country names: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching country names. Please try again later.");
            }
        }


        // Fetch carbon intensity for a region  /region/carbonintensity
        [HttpGet("carbonIntensity/{region}")]
        public async Task<ActionResult<int>> GetCarbonIntensity(string region)
        {
            try
            {
                // Query to get data from db, the first value of carbon intensity
                string query = "SELECT TOP 1 region_value FROM Region WHERE country = @region";
                SqlParameter[] parameters = [new SqlParameter("@region", region)];

                // Execute query and retrieve the result
                var intensity = await _databaseApi.ExtractDataDb(query, parameters, reader =>
                {
                    if (reader.Read())
                    {
                        return reader.GetInt32(0);
                    }
                    return 0;   // Default value if no data found
                    
                });

                // Return carbon intensity as HTTP response
                return Ok(intensity);
            }
            catch (Exception ex)
            {
                // Log and handle any exceptions
                _logger.LogError($"An error occurred while fetching carbon intensity for region {region}: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching carbon intensity for region {region}. Please try again later.");
            }
        }


        // Fetch PUE for a region /region/pue
        [HttpGet("pue/{region}")]
        public async Task<ActionResult<decimal>> GetPUE(string region)
        {
            try
            {
                // Query to get PUE for the specified region
                string query = @"
                    SELECT TOP 1 PUE.pue_value
                    FROM Region
                    JOIN PUE ON Region.region = PUE.regionID
                    WHERE Region.country = @region";
                SqlParameter[] parameters = [new SqlParameter("@region", region)];

                // Execute query and retrieve the result
                var pue = await _databaseApi.ExtractDataDb(query, parameters, reader =>
                {
                    if (reader.Read())
                    {
                        return reader.GetDecimal(0);
                        
                    }
                    // Return 0 if no data found
                    return default(decimal);
                });

                // Return PUE as the HTTP response
                return Ok(pue);
            }
            catch (Exception ex)
            {
                // Log and handle any exceptions
                _logger.LogError($"An error occurred while fetching PUE for region {region}: {ex.Message}");
                return StatusCode(500, $"An error occurred while fetching PUE for region {region}. Please try again later.");
            }
        }
    }
}