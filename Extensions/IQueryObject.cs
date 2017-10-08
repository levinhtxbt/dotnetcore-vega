namespace vega.Extensions
{
    public interface IQueryObject
    {
         string OrderBy { get; set; }

         bool IsSortAscending { get; set; }

         int Page { get; set; }
         
         int PageSize { get; set; }
    }
}