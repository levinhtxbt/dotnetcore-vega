using System.Threading.Tasks;
using vega.Core.Models;

namespace vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated);

        void Add(Vehicle vehicle);

        void Update(Vehicle vehicle);

        void Remove(Vehicle vehicle);
    }
}