using vega.Extensions;

namespace vega.Controllers.Resource
{
    public class VehicleQuery : IQueryObject
    {
        public int? MakeId { get; set; }

        public int? ModelId { get; set; }

        public string OrderBy { get; set; }

        public bool IsSortAscending  { get; set; } 
    }
}