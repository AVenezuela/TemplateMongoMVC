using System;
using System.Threading.Tasks;
using TemplateMongo.Data.Common;
using TemplateMongo.Data.Context;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Util;

namespace TemplateMongo.Data
{
    public class EmployeeRepository : BaseRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(MongoDBContext context) : base(context)
        {
            SetCollection("employees");
        }

        public Task<Employee> AddEmployee(Employee entity)
        {
            entity.Login.HashInfo = new Hash();
            entity.Login.HashInfo.Iterations = new Random().Next(100, 1000);
            entity.Login.HashInfo.SaltLength = Util.Util.getSaltLength();
            entity.Login.Password = entity.Login.Password.hashText(entity.Login.HashInfo);            
            return this.Add(entity);
        }
    }
}
