using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ExamWeb.Context
{
    public class MyDbContext : DbContext
    {
        public DbSet<Journey> Journeys { get; set; }

        public MyDbContext(DbContextOptions options) : base(options)
        {
        }
    }


    [Table("Journeys")]
    public class Journey
    {
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string DriverName { get; set; }

        [Key]
        public int Id { get; set; }
    }
}
