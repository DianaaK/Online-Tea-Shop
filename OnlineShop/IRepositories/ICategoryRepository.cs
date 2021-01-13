using OnlineShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.IRepositories
{
    public interface ICategoryRepository : IGenericRepository<Category>
    {
        Category GetCategoryById(int id);
    }
}
