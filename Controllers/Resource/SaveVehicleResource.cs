using System.Collections.Generic;

namespace vega.Controllers.Resource
{

    public class SaveVehicleResource
    {
        public int Id { get; set; }

        public bool IsRegistered { get; set; }

        public ContactResource Contact { get; set; }

        public int ModelId { get; set; }

        public ICollection<int> Features { get; set; }
    }
}