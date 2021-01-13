using OnlineShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.IRepositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Product GetProductById(int productId);
    }
}
