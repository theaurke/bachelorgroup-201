namespace ReactApp;

using Newtonsoft.Json;
using Microsoft.Data.SqlClient;

public static class ElMapAPI
{
    /// <summary>
    /// Method to read and parse all available zones from the API and save it in a dictionary
    /// with the zone ID has the key.
    /// </summary>
    static async Task <Dictionary<string, ZoneResponse>> ParseZones()
    {
        try
        {
            string zoneApiUrl = "https://api.electricitymap.org/v3/zones";
            HttpClient httpClient = new HttpClient();
            string apiResponse = await httpClient.GetStringAsync(zoneApiUrl);
            var zonesApiResponse = JsonConvert.DeserializeObject<Dictionary<string, ZoneResponse>>(apiResponse);
            
            return zonesApiResponse;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while retrieving zones: {ex.Message}");
            return new Dictionary<string, ZoneResponse>();
        }
    }
    
    /// <summary>
    /// Method to read and parse the carbon intensity data of selected zones in a list and return this.
    /// </summary>
    public static async Task<List<CarbonData>> CarbonIntensityList()
    {
        var carbonIntensityList = new List<CarbonData>();
        
        try
        {
            string authToken = "xV9XpiWiPcgmg"; // Authorization token
            var selectedZones = new List<string> 
            {
                "ZA", "HK", "SG", "AU-NSW", "AU-VIC", "BR-S", "CA-QC", "CA-ON", 
                "IE", "NL", "FR", "DE", "IN-WE", "IN-SO", "IN-EA", "IN-NO", "IL", 
                "IT-NO", "JP-TK", "KR", "NO-NO5", "NO-NO1", "PL", "QA", "AE", 
                "SE-SE4", "SE-SE3", "SE-SE2", "CH", "GB", "US-TEX-ERCO", 
                "US-CAL-BANC", "US-NW-GCPD", "US-SW-AZPS"
            };
            
            using (HttpClient httpClient = new HttpClient())
            {
                // Set the authorization token in the request headers
                httpClient.DefaultRequestHeaders.Add("auth-token", authToken);
                
                // Get all available zones
                var zones = await ParseZones();
                
                // Filter zones based on selected keys
                var filteredZones = zones.Where(zone => selectedZones.Contains(zone.Key));
                
                // Retrieve carbon intensity for each zone
                foreach (var zone in filteredZones)
                {
                    string apiUrl = $"https://api.electricitymap.org/v3/carbon-intensity/latest?zone={zone.Key}";
                    HttpResponseMessage apiResponse = await httpClient.GetAsync(apiUrl);
                    
                    // If response is successful, then append the carbon intensity data into the list
                    if (apiResponse.IsSuccessStatusCode)
                    {
                        string response = await apiResponse.Content.ReadAsStringAsync();
                        CarbonIntensityResponse carbonData = JsonConvert.DeserializeObject<CarbonIntensityResponse>(response);
                        
                        carbonIntensityList.Add(new CarbonData 
                        {
                            ZoneID = zone.Key,
                            CountryName = string.IsNullOrEmpty(zone.Value.CountryName) ? zone.Value.ZoneName : zone.Value.CountryName,
                            ZoneName = string.IsNullOrEmpty(zone.Value.CountryName) ? string.Empty : zone.Value.ZoneName,
                            CarbonIntensity = carbonData.CarbonIntensity,
                            UpdatedAt = carbonData.UpdatedAt
                        });
                        
                    }
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while fetching carbon data: {ex.Message}");
        }
        
        return carbonIntensityList;
    }

    /// <summary>
    /// Method to check whether a zone already exists in the database.
    /// The carbon data of the zone will be updated if it exists in the database, else it will be added.
    /// </summary>
    public static void CheckAndUpdateDatabase(SqlConnection connection, CarbonData data)
    {
        string checkData = "SELECT COUNT(*) FROM dbo.Region WHERE (name = @name)";
        using (SqlCommand checkCommand = new SqlCommand(checkData, connection))
        { 
            checkCommand.Parameters.AddWithValue("@name", data.ZoneID);
            int zoneExists = (int)checkCommand.ExecuteScalar();
            
            if (zoneExists > 0)               // Zone exists
            {
                UpdateData(connection, data); 
            }
                            
            else
            {
                InsertData(connection, data); 
            }
        }
    }

    /// <summary>
    /// Method to update the carbon intensity and date of the existing zones in the database
    /// </summary>
    static void UpdateData(SqlConnection connection, CarbonData data)
    {
        try
        {
            string updateData = "UPDATE dbo.Region SET region_value = @region_value, updatedAt = @updatedAt, nowTime = @nowTime WHERE name = @name";
            using (SqlCommand updateCommand = new SqlCommand(updateData, connection))
            {
                updateCommand.Parameters.AddWithValue("@region_value", data.CarbonIntensity);
                updateCommand.Parameters.AddWithValue("@updatedAt", data.UpdatedAt);
                updateCommand.Parameters.AddWithValue("@name", data.ZoneID);
                updateCommand.Parameters.AddWithValue("@nowTime", DateTime.Now);
                updateCommand.ExecuteNonQuery();
            }
            Console.WriteLine($"Successfully updated data: {data.ZoneID}, intensity: {data.CarbonIntensity}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred during database update: {ex.Message}");
        }
    }


    /// <summary>
    /// Method to insert data into the database
    /// </summary>
    static void InsertData(SqlConnection connection, CarbonData data)
    {
        try
        {
            string insertData = "INSERT INTO dbo.Region (name, region_value, country, zonename, updatedAt) VALUES (@name, @region_value, @country, @zonename, @updatedAt)";

            using (SqlCommand insertCommand = new SqlCommand(insertData, connection))
            {
                // Add parameters to the query
                insertCommand.Parameters.Clear(); // Clear previous parameters
                insertCommand.Parameters.AddWithValue("@name", data.ZoneID);
                insertCommand.Parameters.AddWithValue("@region_value", data.CarbonIntensity);
                insertCommand.Parameters.AddWithValue("@country", data.CountryName);
                insertCommand.Parameters.AddWithValue("@zonename", data.ZoneName);
                insertCommand.Parameters.AddWithValue("@updatedAt", data.UpdatedAt);
                
                insertCommand.ExecuteNonQuery();
            }

            Console.WriteLine($"Zone:{data.ZoneID} has successfully been inserted into the database.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while inserting data into database: {ex.Message}");
        }
    }
}