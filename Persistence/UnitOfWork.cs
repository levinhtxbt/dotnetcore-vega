using System.Threading.Tasks;
using vega.Core;

namespace vega.Persistence
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly VegaDbContext dbContext;

        public UnitOfWork(VegaDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void Complete()
        {
            dbContext.SaveChanges();
        }

        public async Task CompleteAsync()
        {
            await dbContext.SaveChangesAsync();
        }
    }
}