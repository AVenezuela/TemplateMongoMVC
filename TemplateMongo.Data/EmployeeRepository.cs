using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
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

        public async Task<Employee> Update(Employee entity)
        {
            FilterDefinition<Employee> filter = Builders<Employee>.Filter.Eq("_id", new ObjectId(entity.MongoID));
            UpdateDefinition<Employee> update = Builders<Employee>.Update.Set(emp => emp.Name, entity.Name)
                                                                            .Set(emp => emp.BirthDate, entity.BirthDate)
                                                                            .Set(emp => emp.Email, entity.Email)
                                                                            .Set(emp => emp.Gender, entity.Gender)
                                                                            .Set("Phones", entity.Phones)
                                                                            .Set("Addresses", entity.Addresses);

            await this.Update(filter, update, new UpdateOptions() { IsUpsert = true });

            return entity;
        }
    }
}
