using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using MongoDB.Bson;
using TemplateMongo.Data.Common;
using TemplateMongo.Data.Context;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;

namespace TemplateMongo.Data
{
    public class ApplicationSignInRepository : BaseRepository<ApplicationUser>, IApplicationUserRepository
    {
        public Task<ApplicationUser> FindUser(string userName, string password)
        {
            throw new NotImplementedException();
        }
    }
}
