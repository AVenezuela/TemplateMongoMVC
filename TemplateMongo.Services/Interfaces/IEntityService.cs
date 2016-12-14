using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TemplateMongo.Model;
using MongoDB.Bson;

namespace TemplateMongo.Services.Interfaces
{
    public interface IEntityService<T> : IService
     where T : BsoDocument
    {
        Task<T> Add(T entity);
        void Delete(T entity);
        Task<T> FindById(ObjectId id);
        Task<IEnumerable<T>> GetAll();
        Task<IEnumerable<T>> GetAll(Pagination pagination);
        Task<T> Replace(T entity);
    }
}
