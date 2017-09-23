using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resource;
using vega.DAL;
using vega.Models;

namespace vega.Controllers
{
    public class MakeController : Controller
    {
        private readonly VegaDbContext dbContext;
        private readonly IMapper mapper;
        public MakeController(VegaDbContext dbContext, IMapper mapper)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        [HttpGet("api/makes")]
        public async Task<IEnumerable<MakeResource>> GetMake()
        {
            var makes = await this.dbContext.Makes.Include(m => m.Models).ToListAsync();
            return this.mapper.Map<List<Make>, List<MakeResource>>(makes);
        }
    }
}

