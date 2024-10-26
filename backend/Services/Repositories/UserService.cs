using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Web.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Repositories.Interfaces;
using Services.Interfaces;

public class UserService : IUserService
{
      private readonly IUserRepository _userRepository;
      private readonly IConfiguration _configuration;
      private readonly ILogger<UserService> _logger;

      public UserService(IUserRepository userRepository, IConfiguration configuration, ILogger<UserService> logger)
      {
            _userRepository = userRepository;
            _configuration = configuration;
            _logger = logger;
      }

      public async Task<IEnumerable<UserModel>> GetUsersAsync()
      {
            return await _userRepository.GetUsersAsync();
      }

      public async Task<UserModel> GetUserByIdAsync(object id)
      {
            return await _userRepository.GetByIdAsync(id);
      }

      public async Task<UserModel> GetUserByEmailAsync(string email)
      {
            return await _userRepository.GetUserByEmailAsync(email);
      }

      public async Task CreateUserAsync(UserModel user)
      {
            await _userRepository.CreateAsync(user);
            await _userRepository.SaveAsync();
      }

      public async Task<UserModel> GetUserByPhoneAsync(string phoneNumber)
      {
            return await _userRepository.GetUserByPhoneAsync(phoneNumber);
      }

      public async Task DeleteUserAsync(object id)
      {
            await _userRepository.DeleteAsync(id);
      }

      public async Task UpdateUserAsync(UserModel user)
      {
            await _userRepository.UpdateAsync(user);
      }

      public async Task SaveAsync()
      {
            await _userRepository.SaveAsync();
      }


}
