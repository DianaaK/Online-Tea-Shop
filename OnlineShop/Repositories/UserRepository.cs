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
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(AppDbContext context) : base(context)
        {
        }

        public User GetByEmailAndPassword(string email, string password)
        {
            return _table.Where(x => x.Email == email && x.Password == password).FirstOrDefault();
        }

        public User GetById(int id)
        {
            return _table.Where(x => x.Id == id).Include(x => x.Address).Include(x=>x.Orders).FirstOrDefault();
        }
    }
}
