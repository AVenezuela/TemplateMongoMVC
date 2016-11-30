using System.Threading.Tasks;
using TemplateMongo.Model;
using MongoDB.Bson;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Security.Claims;

namespace TemplateMongo.Data.Interfaces
{
    public interface IApplicationUserRepository : IBaseRepository<Employee>
    {
        Task<ApplicationUser> FindUser(string userName, string password);
        Task<ClaimsIdentity> CreateIdentityAsync(ApplicationUser user, string applicationCookie);
        //Task<string> GetPhoneNumberAsync(ObjectId id);
        //Task<bool> GetTwoFactorEnabledAsync(ObjectId id);
        //Task<IdentityResult> CreateAsync(ApplicationUser user, string password);
        //Task<IdentityResult> ConfirmEmailAsync(ObjectId id, string code);
        //Task<ApplicationUser> FindByNameAsync(string email);
        //Task<bool> IsEmailConfirmedAsync(ObjectId id);
        //Task<IdentityResult> ResetPasswordAsync(ObjectId id, string code, string password);
        //Task<List<string>> GetValidTwoFactorProvidersAsync(ObjectId id);
        //Task<IdentityResult> CreateAsync(ApplicationUser user);
        //Task<IdentityResult> AddLoginAsync(ObjectId id, UserLoginInfo login);
        //Task<IdentityResult> RemoveLoginAsync(string v, UserLoginInfo userLoginInfo);
        //Task<string> GenerateChangePhoneNumberTokenAsync(string v, string number);
        //Task<IdentityResult> ChangePhoneNumberAsync(string v, string phoneNumber, string code);
        //Task<IdentityResult> SetPhoneNumberAsync(string v, object p);
        //Task<IdentityResult> ChangePasswordAsync(string v, string oldPassword, string newPassword);
        //Task<IdentityResult> AddPasswordAsync(string v, string newPassword);
        //Task<ClaimsIdentity> CreateUserIdentityAsync(ApplicationUser user);
    }
}
