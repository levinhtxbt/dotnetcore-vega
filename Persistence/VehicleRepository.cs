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

            //vehicleQueryable = ApplyOrdering(query, vehicleQueryable, columnsMap);

            vehicleQueryable = vehicleQueryable.ApplyOrdering(query, columnsMap);

            // if (query.OrderBy.Equals("make"))
            //     vehicleQueryable = query.IsSortAscending ? vehicleQueryable.OrderBy(v => v.Model.Make.Name) : vehicleQueryable.OrderByDescending(v => v.Model.Make.Name);

            // if (query.OrderBy.Equals("model"))
            //     vehicleQueryable = query.IsSortAscending ? vehicleQueryable.OrderBy(v => v.Model.Name) : vehicleQueryable.OrderByDescending(v => v.Model.Name);

            // if (query.OrderBy.Equals("contactName"))
            //     vehicleQueryable = query.IsSortAscending ? vehicleQueryable.OrderBy(v => v.ContactName) : vehicleQueryable.OrderByDescending(v => v.ContactName);

            // if (query.OrderBy.Equals("id"))
            //     vehicleQueryable = query.IsSortAscending ? vehicleQueryable.OrderBy(v => v.Id) : vehicleQueryable.OrderByDescending(v => v.Id);

            return await vehicleQueryable.ToListAsync();
        }

        // private IQueryable<Vehicle> ApplyOrdering(VehicleQuery query, IQueryable<Vehicle> vehicleQueryable,
        //     Dictionary<string, Expression<Func<Vehicle, object>>> columnsMap)
        // {
        //     if (query.IsSortAscending)
        //         return vehicleQueryable.OrderBy(columnsMap[query.OrderBy]);
        //     else
        //         return vehicleQueryable.OrderByDescending(columnsMap[query.OrderBy]);
        // }
    }
}