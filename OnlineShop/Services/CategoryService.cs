using OnlineShop.Entities;
using OnlineShop.IRepositories;
using OnlineShop.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        public CategoryService(ICategoryRepository repository)
        {
            this._repository = repository;
        }

        public bool Delete(int id)
        {
            var category = _repository.FindById(id);
            _repository.Delete(category);
            return _repository.SaveChanges();
        }

        public List<Category> GetAll()
        {
            return _repository.GetAllActive();
        }

        public Category GetById(int id)
        {
            return _repository.GetCategoryById(id);
        }

        public bool Insert(Category prof)
        {
            _repository.Create(prof);
            return _repository.SaveChanges();
        }

        public bool Update(Category prof)
        {
            _repository.Update(prof);
            return _repository.SaveChanges();
        }
    }
}
