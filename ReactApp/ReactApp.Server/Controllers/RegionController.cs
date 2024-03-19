using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace ReactApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegionController : ControllerBase
    {
        private readonly ILogger<RegionController> _logger;

        public RegionController(ILogger<RegionController> logger)
        {
            _logger = logger;
        }


        // Fetch all available region country names from db
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            try
            {
                // Query to get data from db
                string query = "SELECT country FROM Region";
                SqlParameter[] parameters = new SqlParameter[] { };

                // Execute the query asynchronously and retrieve the result
                var countryNames = await DatabaseAPI.ExtractDataDB(query, parameters, reader =>
                {
                    List<string> names = new List<string>();
                    while (reader.Read())
                    {
                        names.Add(reader.GetString(0));
                    }
                    return names;
                });

                // Return country names as HTTP reponse
                return Ok(countryNames);
            }
            catch (Exception ex)
            {
                // Log and handle any exceptions
                _logger.LogError($"An error occurred while fetching country names: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching country names. Please try again later.");
            }
        }


        //For å hente carbonintensity for en region  /region/carbonintensity
        [HttpGet("carbonIntensity/{region}")]
        public async Task<ActionResult<int>> GetCarbonIntensity(string region)
        {
            try
            {
                // Query to get data from db, the first value of carbon intensity
                string query = "SELECT TOP 1 region_value FROM Region WHERE country = @region";
                SqlParameter[] parameters = [new SqlParameter("@region", region)];

                // Execute the query asynchronously and retrieve the result
                var intensity = await DatabaseAPI.ExtractDataDB(query, parameters, reader =>
                {
                    if (reader.Read())
                    {
                        return reader.GetInt32(0);
                    }
                    return 0;   // Default value if no data found
                    
                });

                // Return carbon intensity as HTTP reponse
                return Ok(intensity);
            }
            catch (Exception ex)
            {
                // Log and handle any exceptions
                _logger.LogError($"An error occurred while fetching carbon intensity for region {region}: {ex.Message}");
                return StatusCode(500, "An error occurred while fetching carbon intensity for region {region}. Please try again later.");
            }
        }


        //For å hente pue for en region /region/pue
        [HttpGet("pue/{region}")]
        public async Task<ActionResult<double>> GetPUE(string region)
        {
            try
            {
                // Example query to get PUE for the specified region
                string query = @"
                    SELECT TOP 1 PUE.pue_value
                    FROM Region
                    JOIN PUE ON Region.region = PUE.regionID
                    WHERE Region.country = @region";
                SqlParameter[] parameters = new SqlParameter[] { new SqlParameter("@region", region) };

                // Execute the query asynchronously and retrieve the result
                var pue = await DatabaseAPI.ExtractDataDB(query, parameters, reader =>
                {
                    if (reader.Read())
                    {
                        return reader.GetDouble(0); // Assuming the PUE is in the first column
                    }
                    return 0.0; // Default value if no data found
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
