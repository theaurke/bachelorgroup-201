public class ZoneResponse
{
    public required string ZoneName { get; set; }
    public string CountryName { get; set; }
}

public class CarbonIntensityResponse
{
    public int CarbonIntensity { get; set; }
    public DateTime UpdatedAt { get; set; }
}

public class CarbonData
{
    public string ZoneID { get; set; }
    public string ZoneName { get; set; }
    public string CountryName { get; set; }
    public int CarbonIntensity { get; set; }
    public DateTime UpdatedAt { get; set; }
}