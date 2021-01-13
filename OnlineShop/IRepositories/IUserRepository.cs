using OnlineShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.IRepositories
{
    public interface IUserRepository : IGenericRepository<User>
    {
        User GetById(int id);
        User GetByEmailAndPassword(string email, string password);
    }
}
