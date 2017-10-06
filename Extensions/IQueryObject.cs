namespace vega.Extensions
{
    public interface IQueryObject
    {
         string OrderBy { get; set; }

         bool IsSortAscending { get; set; }
    }
}