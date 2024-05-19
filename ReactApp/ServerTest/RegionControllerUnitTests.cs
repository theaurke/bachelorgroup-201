using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Moq;
using System.Data;

namespace ReactApp.Server.Controllers
{
    public class RegionControllerUnitTests
    {
        // Mocking objects
        private readonly Mock<ILogger<RegionController>> _mockLogger;
        private readonly Mock<IDatabaseApi> _mockDatabaseAPI;
        private readonly RegionController _controller;

        // Create an instance of the class we want to test
        public RegionControllerUnitTests()
        {
            _mockLogger = new Mock<ILogger<RegionController>>();
            _mockDatabaseAPI = new Mock<IDatabaseApi>();
            _controller = new RegionController(_mockLogger.Object, _mockDatabaseAPI.Object); // Pass mock objects to initialize class
        }

        // Get all available countries from DB test
        [Fact]
        public async Task Get_CountriesFromDBUnitTest()
        {
            // Arrange
            var countryNames = new List<string> { "United Arab Emirates", "Australia", "Australia", "Brazil"};

            _mockDatabaseAPI.Setup(db => db.ExtractDataDb(
                "SELECT country FROM Region",  
                It.IsAny<SqlParameter[]>(), 
                It.IsAny<Func<IDataReader, List<string>>>()))
                .ReturnsAsync(countryNames);

            // Act
            var result = await _controller.GetAllCountries(); // Calls the 'GetAllCountries' method of 'RegionController'

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedCountryNames = Assert.IsAssignableFrom<List<string>>(okResult.Value);
            Assert.Equal(countryNames, returnedCountryNames); // Verify that the returned results match the expected results
        }

        // Get carbon intensity of the defined countries test
        [Theory]
        [InlineData("Australia", 609)]
        [InlineData("Norway", 25)]
        [InlineData("Japan", 596)]
        [InlineData("USA", 203)]
        public async Task GetCarbonIntensity_CountryUnitTest(string country, int intensity)
        {
            // Arrange
            _mockDatabaseAPI.Setup(db => db.ExtractDataDb(
                "SELECT TOP 1 region_value FROM Region WHERE country = @region",
                It.IsAny<SqlParameter[]>(),
                It.IsAny<Func<IDataReader, int>>()))
                .ReturnsAsync(intensity);

            // Act
            var result = await _controller.GetCarbonIntensity(country);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedIntensity = Assert.IsType<int>(okResult.Value);
            Assert.Equal(intensity, returnedIntensity);
        }

        // Get PUE value of the selected countries test
        [Theory]
        [InlineData("United Arab Emirates", 1.185)]
        [InlineData("Norway", 1.185)]
        [InlineData("Japan", 1.405)]
        [InlineData("USA", 1.170)]
        public async Task GetPUE_CountryUnitTest(string country, decimal expectedPUE)
        {
            // Arrange
            _mockDatabaseAPI.Setup(db => db.ExtractDataDb(
                It.IsAny<string>(), 
                It.IsAny<SqlParameter[]>(), 
                It.IsAny<Func<IDataReader, decimal>>()))
                .ReturnsAsync((string query, SqlParameter[] parameters, Func<IDataReader, decimal> map) =>
                {
                    // Simulate different PUE values based on the country
                    if (query.Contains("@region"))
                    {
                        return expectedPUE;
                    }
                    return default(decimal);
                });

            // Act
            var result = await _controller.GetPUE(country);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedPUE = Assert.IsType<decimal>(okResult.Value);
            Assert.Equal(expectedPUE, returnedPUE);
        }
    }
}