using backend.Models;

public class UserService(IUnitOfWork unitOfWork) : IUserService
{
      private readonly IUnitOfWork _unitOfWork = unitOfWork;

      public async Task<IEnumerable<UserModel>> GetUsersAsync()
      {
            return await _unitOfWork.Users.GetUsersAsync();
      }
      public async Task<IEnumerable<UserModel>> GetUsesByRoleIdAsync(int id)
      {
            return await _unitOfWork.Users.GetUsesByRoleIdAsync(id);
      }

      public async Task<UserModel> GetUserByIdAsync(int id)
      {
            return await _unitOfWork.Users.GetUserByIdAsync(id);
      }

      public async Task<UserModel> GetUserByEmailAsync(string email)
      {
            return await _unitOfWork.Users.GetUserByEmailAsync(email);
      }

      public async Task CreateUserAsync(UserModel user)
      {
            await _unitOfWork.Users.CreateAsync(user);
            await _unitOfWork.CompleteAsync();
      }

      public async Task<UserModel> GetUserByPhoneAsync(string phoneNumber)
      {
            return await _unitOfWork.Users.GetUserByPhoneAsync(phoneNumber);
      }

      public async Task DeleteUserAsync(object id)
      {
            await _unitOfWork.Users.DeleteAsync(id);
            await _unitOfWork.CompleteAsync();
      }

      public async Task UpdateUserAsync(UserModel user)
      {
            await _unitOfWork.Users.UpdateAsync(user);
            await _unitOfWork.CompleteAsync();
      }
}
