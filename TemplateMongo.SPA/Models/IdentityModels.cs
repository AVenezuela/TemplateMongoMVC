using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using TemplateMongo.Model;
using TemplateMongo.Model.Interfaces;

namespace TemplateMongo.SPA.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string Hometown { get; set; }        
        
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync()
        {
            throw new NotImplementedException();
        }

        internal Task<ClaimsIdentity> GenerateUserIdentityAsync(ApplicationUserManager userManager)
        {
            throw new NotImplementedException();
        }
    }
}