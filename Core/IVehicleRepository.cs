using System.Collections.Generic;
using System.Threading.Tasks;
using vega.Controllers.Resource;
using vega.Core.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    {
        Task<IEnumerable<Vehicle>> GetVehicles();

        Task<QueryResult<Vehicle>> GetVehicles(VehicleQuery query);

        Task<Vehicle> GetVehicle(int id, bool includeRelated);

        void Add(Vehicle vehicle);

        void Update(Vehicle vehicle);

        void Remove(Vehicle vehicle);
    }
}