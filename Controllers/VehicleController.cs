using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resource;
using vega.DAL;
using vega.Models;

namespace vega.Controllers
{
    [Route("api/vehicles")]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;
        private readonly VegaDbContext dbContext;
        public VehicleController(IMapper mapper, VegaDbContext dbContext)
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var model = await dbContext.Models.FindAsync(vehicleResource.ModelId);
            if (model == null)
            {
                ModelState.AddModelError("ModelId", "ModelId is invalid");
                return BadRequest(ModelState);
            }

            if (vehicleResource.Contact == null)
            {
                ModelState.AddModelError("Contact", "Contact is invalid");
                return BadRequest(ModelState);
            }

            var vehicle = this.mapper.Map<VehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            dbContext.Vehicles.Add(vehicle);

            await dbContext.SaveChangesAsync();

            var result = this.mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] VehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var model = await dbContext.Models.FindAsync(vehicleResource.ModelId);
            if (model == null)
            {
                ModelState.AddModelError("ModelId", "ModelId is invalid");
                return BadRequest(ModelState);
            }

            if (vehicleResource.Contact == null)
            {
                ModelState.AddModelError("Contact", "Contact is invalid");
                return BadRequest(ModelState);
            }

            var vehicle = await dbContext.Vehicles.Include(x => x.Features).SingleOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
                return NotFound();

            mapper.Map<VehicleResource, Vehicle>(vehicleResource, vehicle);

            await dbContext.SaveChangesAsync();

            return Ok(id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await dbContext.Vehicles.FindAsync(id);

            if (vehicle == null)
                return NotFound();

            dbContext.Vehicles.Remove(vehicle);
            await dbContext.SaveChangesAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await dbContext.Vehicles.Include(v => v.Features).SingleOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
                return NotFound();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }
    }
}