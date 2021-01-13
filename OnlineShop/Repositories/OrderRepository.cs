using Microsoft.EntityFrameworkCore;
using OnlineShop.Data;
using OnlineShop.Entities;
using OnlineShop.IRepositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Repositories
{
    public class OrderRepository : GenericRepository<Order>, IOrderRepository
    {
        public OrderRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public List<Order> GetOrdersForUser(int userID)
        {
            return _context.Orders.Where(x => x.UserId == userID).Where(x => x.Status != (int)(OrderStatus.CART)).ToList();
        }

        public Order GetOrderById(int id)
        {
            var order = _context.Orders.Where(x => x.Id == id)
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .FirstOrDefault();

            return order;
        }

        public Order GetCartOrder(int userId)
        {
            var order = _context.Orders.Where(x => x.UserId == userId).Where(x => x.Status == (int)(OrderStatus.CART))
                .Include(x => x.Products)
                .ThenInclude(x => x.Product)
                .FirstOrDefault();
            if(order==null)
            {
                Order newCart = new Order();
                newCart.UserId = userId;
                newCart.Status = (int)OrderStatus.CART;
                newCart.CreateTime = DateTime.UtcNow;
                newCart.UpdatedTime = DateTime.UtcNow;

                _context.Orders.Add(newCart);
                _context.SaveChanges();

                order = _context.Orders.Where(x => x.UserId == userId).Where(x => x.Status == (int)(OrderStatus.CART))
                .Include(x => x.Products)
                .ThenInclude(x=>x.Product)
                .FirstOrDefault();
            }
            return order;

        }
    }
}
