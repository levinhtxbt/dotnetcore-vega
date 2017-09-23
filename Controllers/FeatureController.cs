using System.Collections.Generic;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using vega.Controllers.Resource;
using vega.DAL;
using Microsoft.EntityFrameworkCore;
using vega.Models;
using System.Threading.Tasks;

namespace vega.Controllers
{
    public class FeatureController : Controller
    {
        private readonly VegaDbContext dbContext;
        private readonly IMapper mapper;
        public FeatureController(VegaDbContext dbContext, IMapper mapper)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        [HttpGet("api/features")]
        public async Task<IEnumerable<FeatureResource>> GetFeatures()
        {
            var features = await this.dbContext.Features.ToListAsync();

            return mapper.Map<List<Feature>, List<FeatureResource>>(features);
        }
    }
}