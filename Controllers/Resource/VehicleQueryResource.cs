namespace vega.Controllers.Resource
{
    public class VehicleQueryResource
    {
        public int? MakeId { get; set; }

        public int? ModelId { get; set; }

        public string OrderBy { get; set; }

        public bool IsSortAscending  { get; set; } 
    }
}