using OnlineShop.Data;
using OnlineShop.Entities;
using OnlineShop.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Repositories
{
    public class OrderProductRepository : GenericRepository<OrderProduct>, IOrderProductRepository
    {
        public OrderProductRepository(AppDbContext context) : base(context)
        {
        }

        public OrderProduct GetByOrderAndProduct(int orderId, int productId)
        {
            return _context.OrderProducts.Where(x => x.OrderId == orderId && x.ProductId == productId)
                .FirstOrDefault();
        }
    }
}
