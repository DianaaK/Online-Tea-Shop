using OnlineShop.Entities;
using OnlineShop.Enums;
using OnlineShop.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Mapper
{
    public static class UserMapper
    {
        public static User ToUser(AuthenticationRequest request, UserTypeEnum userType)
        {
            return new User
            {
                Email = request.Email,
                Password = request.Password,
                Type = userType.ToString()
            };
        }

        public static User ToUserExtension(this RegisterRequest request, UserTypeEnum userType)
        {
            return new User
            {
                Email = request.Email,
                Password = request.Password,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Type = userType.ToString(),
                IsDeleted = false
            };
        }
    }
}
