using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Models;
using vega.Core;
using System.Collections.Generic;
using vega.Controllers.Resource;
using System.Linq;
using System.Linq.Expressions;
using System;
using vega.Extensions;

namespace vega.Persistence
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly VegaDbContext dbContext;

        public VehicleRepository(VegaDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = false)
        {
            if (!includeRelated)
                return await dbContext.Vehicles.FindAsync(id);

            return await dbContext.Vehicles
                .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
                .Include(v => v.Model)
                .ThenInclude(m => m.Make)
                .SingleOrDefaultAsync(v => v.Id == id);
        }

        public void Add(Vehicle vehicle)
        {
            dbContext.Add(vehicle);
        }

        public void Remove(Vehicle vehicle)
        {
            dbContext.Remove(vehicle);
        }

        public void Update(Vehicle vehicle)
        {
            dbContext.Update(vehicle);
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles()
        {
            return await dbContext.Vehicles
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
                .ThenInclude(m => m.Make)
            .ToListAsync();
        }

        public async Task<IEnumerable<Vehicle>> GetVehicles(VehicleQuery query)
        {
            var vehicleQueryable = dbContext.Vehicles
            .Include(v => v.Features)
                .ThenInclude(vf => vf.Feature)
            .Include(v => v.Model)
                .ThenInclude(m => m.Make)
            .AsQueryable();

            if (query.MakeId.HasValue)
                vehicleQueryable = vehicleQueryable
                    .Where(v => v.Model.MakeId == query.MakeId.Value);

            if (query.ModelId.HasValue)
                vehicleQueryable = vehicleQueryable
                    .Where(v => v.ModelId == query.ModelId.Value);

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"] = v => v.ContactName    
            };

            vehicleQueryable = vehicleQueryable.ApplyOrdering(query, columnsMap);

            return await vehicleQueryable.ToListAsync();
        }

    }
}