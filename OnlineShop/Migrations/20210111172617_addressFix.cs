using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineShop.Migrations
{
    public partial class addressFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Address",
                table: "UserAdresses",
                newName: "Street");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreateTime",
                table: "UserAdresses",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserAdresses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedTime",
                table: "UserAdresses",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreateTime",
                table: "UserAdresses");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserAdresses");

            migrationBuilder.DropColumn(
                name: "UpdatedTime",
                table: "UserAdresses");

            migrationBuilder.RenameColumn(
                name: "Street",
                table: "UserAdresses",
                newName: "Address");
        }
    }
}
