using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Exam5.Utils;

namespace Exam5
{
    internal class Program
    {
        private static async Task Main(string[] args)
        {
            string connString = "Server=DESKTOP-DRNRF9P;Initial Catalog=ExamDB;Integrated Security=True; MultipleActiveResultSets=True;";

            using (var dbContext = DbContextCreator.CreateContext(connString))
            {
                var journeys = await dbContext.Journeys
                    .Where(s => (s.End - s.Start).TotalHours > 2.5)
                    .ToListAsync();

                Console.WriteLine(journeys.Count);
                Console.ReadLine();
            }
        }
    }

    public class MyDbContext : DbContext
    {
        public DbSet<Journey> Journeys { get; set; }

        public MyDbContext(DbContextOptions options) : base(options)
        {
        }
    }

    [TableAttribute("Journeys")]
    public class Journey
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string DriverName { get; set; }

        [Key]
        public int Id { get; set; }
    }
}