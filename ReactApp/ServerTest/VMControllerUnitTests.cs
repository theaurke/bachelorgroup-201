using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;
using Moq;
using System.Data;

namespace ReactApp.Server.Controllers
{
    public class VMControllerUnitTests
    {
        // Mocking objects
        private readonly Mock<ILogger<VMController>> _mockLogger;
        private readonly Mock<IDatabaseApi> _mockDatabaseAPI;
        private readonly VMController _controller;

        // Create an instance of the class we want to test
        public VMControllerUnitTests()
        {
            _mockLogger = new Mock<ILogger<VMController>>();
            _mockDatabaseAPI = new Mock<IDatabaseApi>();
            _controller = new VMController(_mockLogger.Object, _mockDatabaseAPI.Object);
        }

        // Get all available VM sizes from DB test
        [Fact]
        public async Task GetAllVMsizes()
        {
            // Arrange
            var expectedVMs = new List<string> { "B1ls", "B4ms", "E8bds_v5" };

            _mockDatabaseAPI.Setup(db => db.ExtractDataDb(
                "SELECT size FROM Instance",
                It.IsAny<SqlParameter[]>(),
                It.IsAny<Func<IDataReader, List<string>>>()))
                .ReturnsAsync(expectedVMs);

            // Act
            var result = await _controller.GetAllVM();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedVMs = Assert.IsType<List<string>>(okResult.Value);
            Assert.Equal(expectedVMs, returnedVMs);
        }

        // Get data about a specific VM size test
        [Theory]
        [InlineData("B1ls", 1, 0, 0.001767694, 110, 0)]
        [InlineData("D2_v4", 2, 0, 0.001277915, 195, 0)]
        [InlineData("NV8as_v4", 8, 0.250, 0.010235445, 240, 300)]
        public async Task GetVMdata(string size, int cpuNum, decimal gpuNum, decimal embodiedEmissions, int cpuTdp, int gpuTdp)
        {
            // Arrange
            var vmData = new VMData
            {
                CPU_Num = cpuNum,
                GPU_Num = gpuNum,
                Embodied_Emissions = embodiedEmissions,
                CPU_TDP = cpuTdp,
                GPU_TDP = gpuTdp
            };

            _mockDatabaseAPI.Setup(api => api.ExtractDataDb(
                It.IsAny<string>(),
                It.IsAny<SqlParameter[]>(),
                It.IsAny<Func<IDataReader, VMData>>()))
                .ReturnsAsync(vmData);

            // Act
            var result = await _controller.GetSizeData(size);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var returnedData = Assert.IsType<VMData>(okResult.Value);

            Assert.Equal(cpuNum, returnedData.CPU_Num);
            Assert.Equal(gpuNum, returnedData.GPU_Num);
            Assert.Equal(embodiedEmissions, returnedData.Embodied_Emissions);
            Assert.Equal(cpuTdp, returnedData.CPU_TDP);
            Assert.Equal(gpuTdp, returnedData.GPU_TDP);
        }
    }
}
