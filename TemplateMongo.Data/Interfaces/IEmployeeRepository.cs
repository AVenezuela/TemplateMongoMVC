using System.Threading.Tasks;
using TemplateMongo.Model;

namespace TemplateMongo.Data.Interfaces
{
    public interface IEmployeeRepository : IBaseRepository<Employee>
    {
        Task<Employee> AddEmployee(Employee entity);
    }
}
