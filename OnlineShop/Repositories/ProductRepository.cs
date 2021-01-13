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
    public class ProductRepository : GenericRepository<Product>, IProductRepository
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }
        public Product GetProductById(int id)
        {
            var product = _context.Products.Where(x => x.Id == id)
                .Include(x => x.Category)
                .FirstOrDefault();

            Console.WriteLine(product);

            return product;
        }
    }
}
