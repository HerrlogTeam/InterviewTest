using Exam6.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Exam6.Utils
{
    public class BloggingContextFactory : IDesignTimeDbContextFactory<MyDbContext>
    {
        public MyDbContext CreateDbContext(string[] args)
        {
            string connString = "Server=DESKTOP-VFNCA1J\\MSSQLSERVER2017;Initial Catalog=ExamDB;Integrated Security=True; MultipleActiveResultSets=True;";

            var optionsBuilder = new DbContextOptionsBuilder<MyDbContext>();
            optionsBuilder.UseSqlServer(connString);

            return new MyDbContext(optionsBuilder.Options);
        }

    }

    public static class DbContextCreator
    {
        public static MyDbContext CreateContext(string connString)
        {
            var builder = new DbContextOptionsBuilder<MyDbContext>();

            builder.UseSqlServer(connString);

            var dbContext = new MyDbContext(builder.Options);
            return dbContext;
        }
    }
}