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
    public DateTime Now { get; }
}


public class VMData 
{
    public int CPU_Num { get; set; }
    public decimal? GPU_Num { get; set; } // Using nullable decimal for GPU Num because the value can be null
    public decimal Embodied_Emissions { get; set; }
    public int CPU_TDP { get; set; }
    public int? GPU_TDP { get; set; } // Using nullable int for GPU TDP since the value can be null

    public decimal PkWh => (decimal)(((CPU_Num * CPU_TDP) + 10 + (GPU_Num * GPU_TDP)) / 1000);
}
