using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OnlineShop.Entities;
using OnlineShop.Helpers;
using OnlineShop.IRepositories;
using OnlineShop.IServices;
using OnlineShop.Mapper;
using OnlineShop.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OnlineShop.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepostiory;
        private readonly AppSettings _appSettings;

        public UserService(IUserRepository userRepository, IOptions<AppSettings> appSettings)
        {
            this._userRepostiory = userRepository;
            this._appSettings = appSettings.Value;
        }

        public bool Register(RegisterRequest request)
        {
            var entity = request.ToUserExtension(Enums.UserTypeEnum.Customer);

            _userRepostiory.Create(entity);

            return _userRepostiory.SaveChanges();
        }

        public List<User> GetAll()
        {
            return _userRepostiory.GetAllActive();
        }

        public User GetById(int id)
        {
            return _userRepostiory.GetById(id);
        }
        public bool Update(User user)
        {
            _userRepostiory.Update(user);
            return _userRepostiory.SaveChanges();
        }

        public AuthenticationResponse Login(AuthenticationRequest request)
        {
            var user = _userRepostiory.GetByEmailAndPassword(request.Email, request.Password);
            if (user == null)
                return null;

            var token = GenerateJwtForUser(user);

            return new AuthenticationResponse
            {
                Id = user.Id,
                Email = user.Email,
                Type = user.Type,
                Token = token
            };
        }

        private string GenerateJwtForUser(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
