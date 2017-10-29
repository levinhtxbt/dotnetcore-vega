using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using vega.Controllers.Resource;
using vega.Core.Models;

namespace vega.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<Vehicle> ApplyFiltering(this IQueryable<Vehicle> queryable, VehicleQuery query)
        {
            if (query.MakeId.HasValue)
                queryable = queryable
                    .Where(v => v.Model.MakeId == query.MakeId.Value);

            if (query.ModelId.HasValue)
                queryable = queryable
                    .Where(v => v.ModelId == query.ModelId.Value);

            return queryable;
        }

        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> queryable,
            IQueryObject query, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (String.IsNullOrWhiteSpace(query.OrderBy) || !columnsMap.ContainsKey(query.OrderBy))
                return queryable;

            if (query.IsSortAscending)
                return queryable.OrderBy(columnsMap[query.OrderBy]);
            else
                return queryable.OrderByDescending(columnsMap[query.OrderBy]);
        }

        public static IQueryable<T> ApplyPaging<T>(this IQueryable<T> queryable, IQueryObject query)
        {
            if (query.Page <= 0)
                query.Page = 1;

            if (query.PageSize <= 0)
                query.PageSize = 10;

            return queryable
                .Skip((query.Page - 1) * query.PageSize)
                .Take(query.PageSize);
        }
    }
}