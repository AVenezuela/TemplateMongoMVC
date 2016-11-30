using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Services.Common;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Services
{
    public class ApplicationUserService : EntityService<Employee>, IEntityService<Employee>, IApplicationUserService 
    {
        protected IApplicationUserRepository  _myRepository { get; set; }

        public ApplicationUserService(IApplicationUserRepository myRepository) : base(myRepository)
        {
            this._myRepository = myRepository;
        }

        public Task<ApplicationUser> FindUser(string userName, string password)
        {
            return this._myRepository.FindUser(userName, password);
        }

        public Task<ClaimsIdentity> CreateIdentityAsync(ApplicationUser user, string applicationCookie)
        {
            return this._myRepository.CreateIdentityAsync(user, applicationCookie);
        }
    }
}
