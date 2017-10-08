using System.Collections.Generic;

namespace vega.Controllers.Resource
{
    public class QueryResultResource<T>
    {
        public int TotalItems { get; set; }

        public IEnumerable<T> Items { get; set; }
    }
}