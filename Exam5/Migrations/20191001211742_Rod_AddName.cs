using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam5.Migrations
{
    public partial class Rod_AddName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DriverName",
                table: "Journeys",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DriverName",
                table: "Journeys");
        }
    }
}
