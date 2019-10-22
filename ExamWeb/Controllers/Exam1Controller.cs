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
    [Route("Jornadas")]
    public class Exam1Controller : Controller
    {
        private readonly ILogger<Exam1Controller> _logger;
        private readonly MyDbContext _context;

        public Exam1Controller(ILogger<Exam1Controller> logger, MyDbContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        [Route("")]
        [Route("Index")]
        [Route("Jornadas/Index")]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        [Route("GetJournadas")]
        public async Task<IActionResult> GetJourneys(JourneyFilterVM filter)
        {
            var model = new JourneyListVM()
            {
                Journeys = await _context.Journeys.Where(s => s.End >= filter.From && s.End <= filter.To).Select(s => new JourneyVM()
                {
                    DataFinal = s.End,
                    DataInicial = s.Start,
                    DriverName = s.DriverName,
                    Id = s.Id
                }).ToListAsync()
            };

            return PartialView("_ListOfJourneys", model);
        }
    }

    public class JourneyListVM
    {
        public List<JourneyVM> Journeys { get; set; }
    }

    public class JourneyVM
    {
        public int Id { get; set; }
        public string DriverName { get; set; }
        public DateTime DataInicial { get; set; }
        public DateTime DataFinal { get; set; }
    }

    public class JourneyFilterVM
    {
        public DateTime From { get; set; }
        public DateTime To { get; set; }
    }
}