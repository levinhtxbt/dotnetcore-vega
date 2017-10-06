using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace vega.Extensions
{
    public static class IQueryableExtensions
    {
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
    }
}