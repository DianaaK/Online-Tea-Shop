using OnlineShop.Entities;
using OnlineShop.IRepositories;
using OnlineShop.IServices;
using OnlineShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;
        private readonly IOrderProductRepository _orderProductRepository;
        public OrderService(IOrderRepository repository, IOrderProductRepository orderProductRepository)
        {
            this._repository = repository;
            this._orderProductRepository = orderProductRepository;
        }

        public bool Delete(int id)
        {
            var course = _repository.FindById(id);
            _repository.Delete(course);
            return _repository.SaveChanges();
        }

        public List<Order> GetAll()
        {
            return _repository.GetAllActive();
        }

        public List<Order> GetOrdersForUser(int userId)
        {
            return _repository.GetOrdersForUser(userId);
        }

        public Order GetById(int id)
        {
            return _repository.GetOrderById(id);
        }
        public Order GetCartOrder(int userId)
        {
            return _repository.GetCartOrder(userId);
        }

        public bool Insert(Order order)
        {
            _repository.Create(order);
            return _repository.SaveChanges();
        }

        public bool Update(Order order)
        {
            _repository.Update(order);
            return _repository.SaveChanges();
        }

        public bool AddProductToOrder(ProductOrderRegister payload)
        {
            var entity = new OrderProduct
            {
                OrderId = payload.OrderId,
                ProductId = payload.ProductId,
                Amount = 1
            };

            var itemExists = _orderProductRepository.GetByOrderAndProduct(payload.OrderId, payload.ProductId);
            if(itemExists!=null)
            {
                itemExists.Amount++;
                _orderProductRepository.Update(itemExists);
                return _repository.SaveChanges();
            } else
            {
                _orderProductRepository.Create(entity);
                return _repository.SaveChanges();
            }

        }

        public bool RemoveProductFromOrder(ProductOrderRegister payload)
        {
            var entity = _orderProductRepository.GetByOrderAndProduct(payload.OrderId, payload.ProductId);
            _orderProductRepository.HardDelete(entity);
            return _orderProductRepository.SaveChanges();
        }
    }
}
