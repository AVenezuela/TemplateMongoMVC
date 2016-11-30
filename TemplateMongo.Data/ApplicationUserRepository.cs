using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using MongoDB.Bson;
using TemplateMongo.Data.Common;
using TemplateMongo.Data.Context;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Util;
using System.Security.Claims;

namespace TemplateMongo.Data
{
    public class ApplicationUserRepository : BaseRepository<Employee>, IApplicationUserRepository
    {        
        private Employee employeeLogin { get; set; }

        public ApplicationUserRepository(MongoDBContext context) : base(context)
        {
            SetCollection("employees");            
        }

        public Task<ClaimsIdentity> CreateIdentityAsync(ApplicationUser user, string applicationCookie)
        {
            Task<ClaimsIdentity> taskInvoke = Task<ClaimsIdentity>.Factory.StartNew(() =>
            {
                IList<Claim> claims = new List<Claim> {
                new Claim(ClaimTypes.Name, user.UserName)
                , new Claim(ClaimTypes.AuthenticationMethod, applicationCookie)
                , new Claim(ClaimTypes.NameIdentifier, user.Id)              
                , new Claim(ClaimTypes.Email, user.Email)
            };
                ClaimsIdentity newIdentity = new ClaimsIdentity(claims, applicationCookie);
                return newIdentity;
            });


            return taskInvoke;
        }

        public Task<ApplicationUser> FindUser(string userName, string password)
        {
            this.employeeLogin = this.FindSingle(user => user.Login.UserName == userName);
            Task<ApplicationUser> taskInvoke = Task<ApplicationUser>.Factory.StartNew(() =>
            {
                if (!ReferenceEquals(this.employeeLogin, null))
                {
                    //First Verify Password...
                    PasswordVerificationResult result = this.VerifyHashedPassword(employeeLogin.Login.Password, password);
                    if (result == PasswordVerificationResult.SuccessRehashNeeded)
                    {
                        //Return User Profile Object...
                        //So this data object will come from Database we can write custom ADO.net to retrieve details/
                        ApplicationUser applicationUser = new ApplicationUser();
                        applicationUser.UserName = employeeLogin.Login.UserName;
                        applicationUser.MongoID = employeeLogin.MongoID;
                        applicationUser.Email = employeeLogin.Email;
                        return applicationUser;
                    }
                }
                return null;
            });
            return taskInvoke;
        }

        public PasswordVerificationResult VerifyHashedPassword(string hashedPassword, string providedPassword)
        {
            return (providedPassword.ComparerToHash(hashedPassword, this.employeeLogin.Login.HashInfo))? PasswordVerificationResult.SuccessRehashNeeded : PasswordVerificationResult.Failed;            
        }
    }
}
