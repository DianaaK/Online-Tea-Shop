using OnlineShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.IRepositories
{
    public interface IOrderProductRepository : IGenericRepository<OrderProduct>
    {
        OrderProduct GetByOrderAndProduct(int orderId, int productId);
    }
}
