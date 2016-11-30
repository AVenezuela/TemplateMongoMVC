using System;
using System.Threading.Tasks;
using TemplateMongo.Model;

namespace TemplateMongo.Services.Interfaces
{
    public interface IEmployeeService
    {
        Task<Employee> DoAction(Employee entity);
    }
}
