using OnlineShop.Entities;
using OnlineShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.IServices
{
    public interface IUserService
    {
        User GetById(int id);
        List<User> GetAll();
        bool Update(User user);
        bool Register(RegisterRequest request);
        AuthenticationResponse Login(AuthenticationRequest request);
    }
}
