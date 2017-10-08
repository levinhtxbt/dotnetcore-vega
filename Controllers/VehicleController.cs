using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resource;
using vega.Core.Models;
using vega.Core;
using System.Collections.Generic;

namespace vega.Controllers
{
    [Route("api/vehicles")]
    public class VehicleController : Controller
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository vehicleRepository;
        private readonly IUnitOfWork unitOfWork;

        public VehicleController(
            IMapper mapper,
            IVehicleRepository vehicleRepository,
            IUnitOfWork unitOfWork)
        {
            this.vehicleRepository = vehicleRepository;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (vehicleResource.Contact == null)
            {
                ModelState.AddModelError("Contact", "Contact is invalid");
                return BadRequest(ModelState);
            }

            var vehicle = this.mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource);
            vehicle.LastUpdate = DateTime.Now;

            vehicleRepository.Add(vehicle);

            await unitOfWork.CompleteAsync();

            vehicle = await vehicleRepository.GetVehicle(vehicle.Id, includeRelated: true);

            var result = this.mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (vehicleResource.Contact == null)
            {
                ModelState.AddModelError("Contact", "Contact is invalid");
                return BadRequest(ModelState);
            }

            var vehicle = await vehicleRepository.GetVehicle(id, includeRelated: true);

            if (vehicle == null)
                return NotFound();

            mapper.Map<SaveVehicleResource, Vehicle>(vehicleResource, vehicle);
            vehicleRepository.Update(vehicle);
            await unitOfWork.CompleteAsync();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetVehicle(id, includeRelated: false);

            if (vehicle == null)
                return NotFound();

            vehicleRepository.Remove(vehicle);

            await unitOfWork.CompleteAsync();

            return Ok(id);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await vehicleRepository.GetVehicle(id, includeRelated: true);

            if (vehicle == null)
                return NotFound();

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetVehicles(VehicleQueryResource queryResource)
        {
            var query = Mapper.Map<VehicleQueryResource, VehicleQuery>(queryResource);

            var queryResult = await vehicleRepository.GetVehicles(query);

            if (queryResult == null)
                return NotFound();

            var results = mapper.Map<QueryResult<Vehicle>, QueryResultResource<VehicleResource>>(queryResult);

            return Ok(results);
        }
    }
}