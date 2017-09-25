using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using vega.Core.Models;
using vega.Core;

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
    }
}