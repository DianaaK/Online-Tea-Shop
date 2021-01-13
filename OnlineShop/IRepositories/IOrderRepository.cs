using OnlineShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.IRepositories
{
    public interface IOrderRepository : IGenericRepository<Order>
    {
        Order GetOrderById(int id);
        Order GetCartOrder(int userId);
        List<Order> GetOrdersForUser(int userID);
    }
}
