using Microsoft.EntityFrameworkCore.Migrations;

namespace OnlineShop.Migrations
{
    public partial class addressFix2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAdresses_Users_UserId",
                table: "UserAdresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserAdresses",
                table: "UserAdresses");

            migrationBuilder.RenameTable(
                name: "UserAdresses",
                newName: "Adresses");

            migrationBuilder.RenameIndex(
                name: "IX_UserAdresses_UserId",
                table: "Adresses",
                newName: "IX_Adresses_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Adresses",
                table: "Adresses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Adresses_Users_UserId",
                table: "Adresses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Adresses_Users_UserId",
                table: "Adresses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Adresses",
                table: "Adresses");

            migrationBuilder.RenameTable(
                name: "Adresses",
                newName: "UserAdresses");

            migrationBuilder.RenameIndex(
                name: "IX_Adresses_UserId",
                table: "UserAdresses",
                newName: "IX_UserAdresses_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserAdresses",
                table: "UserAdresses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAdresses_Users_UserId",
                table: "UserAdresses",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
