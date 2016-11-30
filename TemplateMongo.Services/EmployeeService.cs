using System;
using System.Threading.Tasks;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Services.Common;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Services
{
    public class EmployeeService : EntityService<Employee>, IEntityService<Employee>, IEmployeeService
    {
        protected IEmployeeRepository _employeeRepository { get; set; }

        public EmployeeService(IEmployeeRepository employeeRepository) : base(employeeRepository)
        {
            this._employeeRepository = employeeRepository;
        }

        public Task<Employee> DoAction(Employee entity)
        {
            if (ReferenceEquals(entity.MongoID, null))            
                return this._employeeRepository.AddEmployee(entity);
            else
                return this._employeeRepository.Update(entity);
        }
    }
}
