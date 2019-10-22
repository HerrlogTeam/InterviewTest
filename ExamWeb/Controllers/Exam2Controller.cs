using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ExamWeb.Context;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ExamWeb.Controllers
{
    [Route("Motoristas")]
    public class Exam2Controller : Controller
    {
        private readonly ILogger<Exam2Controller> _logger;
        private readonly MyDbContext _context;

        public Exam2Controller(ILogger<Exam2Controller> logger, MyDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("")]
        [Route("Index")]
        [Route("Motoristas/Index")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [Route("GetDetailsOfEach")]
        public async Task<IActionResult> GetDetailsOfEach(List<int> ids)
        {
            var model = new JourneyListVM()
            {
                Journeys = await _context.Journeys.Where(s => ids.Contains(s.Id)).Select(s => new JourneyVM()
                {
                    DataFinal = s.End,
                    DataInicial = s.Start,
                    DriverName = s.DriverName,
                    Id = s.Id
                }).ToListAsync()
            };

            return new JsonResult(model);
        }
    }
}