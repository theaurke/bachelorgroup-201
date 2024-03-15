using Microsoft.AspNetCore.Mvc;

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


        //For � hente alle Available regiona
        [HttpGet]
        public ActionResult<int> Get()
        {
            // Bytt ut her med � hente fra database
            int carbonIntensity = 9; 
            return Ok(carbonIntensity);
        }


        //For � hente carbonintensity for en region  /region/carbonintensity
        [HttpGet("carbonIntensity/{region}")]
        public ActionResult<int> GetCarbonIntensity(string region)
        {
            // Bytt ut med � hente fra database
            int carbonIntensity = 6; 
            return Ok(carbonIntensity);
        }


        //For � hente pue for en region /region/pue
        [HttpGet("pue/{region}")]
        public ActionResult<double> GetPUE(string region)
        {
            // Bruke region til � hente ut ifr� databasen
            double pue = 2.0; 
            return Ok(pue);
        }
    }
}
