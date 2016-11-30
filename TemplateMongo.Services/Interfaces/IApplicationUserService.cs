using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using TemplateMongo.Model;

namespace TemplateMongo.Services.Interfaces
{
    public interface IApplicationUserService
    {
        Task<ApplicationUser> FindUser(string userName, string password);
        Task<ClaimsIdentity> CreateIdentityAsync(ApplicationUser user, string applicationCookie);
    }
}
