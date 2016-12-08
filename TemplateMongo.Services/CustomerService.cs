using System;
using System.Threading.Tasks;
using TemplateMongo.Data;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Services.Common;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Services
{
    public class CustomerService : EntityService<Customer>, IEntityService<Customer>, ICustomerService
    {
        protected ICustomerRepository _myRepository { get; set; }

        public CustomerService(ICustomerRepository myRepository) : base(myRepository)
        {
            this._myRepository = myRepository;
        }
    }
}
