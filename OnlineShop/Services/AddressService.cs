using OnlineShop.Entities;
using OnlineShop.IRepositories;
using OnlineShop.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Services
{
    public class AddressService: IAddressService
    {
        private readonly IAddressRepository _addressRepostiory;

        public AddressService(IAddressRepository addressRepository)
        {
            this._addressRepostiory = addressRepository;
        }

        public bool Insert(Address product)
        {
            _addressRepostiory.Create(product);
            return _addressRepostiory.SaveChanges();
        }

        public bool Update(Address user)
        {
            _addressRepostiory.Update(user);
            return _addressRepostiory.SaveChanges();
        }



    }
}
