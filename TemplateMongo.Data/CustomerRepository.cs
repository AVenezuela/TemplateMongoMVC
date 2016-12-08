using System;
using System.Threading.Tasks;
using TemplateMongo.Data.Common;
using TemplateMongo.Data.Context;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Util;

namespace TemplateMongo.Data
{
    public class CustomerRepository : BaseRepository<Customer>, ICustomerRepository
    {
        public CustomerRepository(MongoDBContext context) : base(context)
        {
            SetCollection("customers");
        }
    }
}
