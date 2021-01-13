using OnlineShop.IRepositories;
using OnlineShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnlineShop.Data;
using Microsoft.EntityFrameworkCore;

namespace OnlineShop.Repositories
{
    public class CategoryRepository : GenericRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
        public Category GetCategoryById(int id)
        {
            var category = _context.Categories.Where(x => x.Id == id)
                .Include(x => x.Products)
                .FirstOrDefault();

            return category;
        }
    }
}
