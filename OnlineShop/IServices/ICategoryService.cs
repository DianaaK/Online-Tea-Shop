using OnlineShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.IServices
{
    public interface ICategoryService
    {
        List<Category> GetAll();
        Category GetById(int id);
        bool Insert(Category category);
        bool Update(Category category);
        bool Delete(int id);

    }
}
