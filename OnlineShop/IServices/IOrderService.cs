using OnlineShop.Entities;
using OnlineShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.IServices
{
    public interface IOrderService
    {
        List<Order> GetAll();
        Order GetById(int id);
        Order GetCartOrder(int userId);
        List<Order> GetOrdersForUser(int userId);
        bool Insert(Order order);
        bool Update(Order order);
        bool Delete(int id);

        bool AddProductToOrder(ProductOrderRegister paylaod);
        bool RemoveProductFromOrder(ProductOrderRegister payload);
    }
}
