using OnlineShop.Entities;
using OnlineShop.IRepositories;
using OnlineShop.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        public ProductService(IProductRepository repository)
        {
            this._repository = repository;
        }

        public bool Delete(int id)
        {
            var product = _repository.FindById(id);
            _repository.Delete(product);
            return _repository.SaveChanges();
        }

        public List<Product> GetAll()
        {
            return _repository.GetAllActive();
        }

        public Product GetById(int id)
        {
            return _repository.GetProductById(id);
        }

        public bool Insert(Product product)
        {
            _repository.Create(product);
            return _repository.SaveChanges();
        }

        public bool Update(Product product)
        {
            _repository.Update(product);
            return _repository.SaveChanges();
        }
    }
}
