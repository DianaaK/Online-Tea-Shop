using OnlineShop.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.IServices
{
    public interface IAddressService
    {
        bool Insert(Address address);
        bool Update(Address address);
    }
}
