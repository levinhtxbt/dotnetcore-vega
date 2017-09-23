using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace vega.Migrations
{
    public partial class SeedMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Makes (Name) values ('Make 3')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) values ('Make 1')");
            migrationBuilder.Sql("INSERT INTO Makes (Name) values ('Make 2')");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) values ('Make 1 - Model B', (SELECT ID FROM Makes WHERE Name = 'Make 1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) values ('Make 1 - Model A', (SELECT ID FROM Makes WHERE Name = 'Make 1'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) values ('Make 1 - Model C', (SELECT ID FROM Makes WHERE Name = 'Make 1'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) values ('Make 2 - Model A', (SELECT ID FROM Makes WHERE Name = 'Make 2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) values ('Make 2 - Model B', (SELECT ID FROM Makes WHERE Name = 'Make 2'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) values ('Make 2 - Model C', (SELECT ID FROM Makes WHERE Name = 'Make 2'))");

            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) values ('Make 3 - Model A', (SELECT ID FROM Makes WHERE Name = 'Make 3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) values ('Make 3 - Model B', (SELECT ID FROM Makes WHERE Name = 'Make 3'))");
            migrationBuilder.Sql("INSERT INTO Models (Name, MakeId) values ('Make 3 - Model C', (SELECT ID FROM Makes WHERE Name = 'Make 3'))");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Makes");
        }
    }
}
