using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.Linq.Expressions;
using TemplateMongo.Model;
using MongoDB.Driver;
using MongoDB.Driver.Builders;

namespace TemplateMongo.Data.Interfaces
{
    public interface IBaseRepository<TEntity> : IDisposable where TEntity : class
    {
        Task<TEntity> Add(TEntity obj);
        Task<TEntity> FindById(ObjectId id);
        Task<IEnumerable<TEntity>> GetAll();
        Task<IEnumerable<TEntity>> GetAll(Pagination pagination);
        Task<IEnumerable<TEntity>> GetAll<TSearch>(Pagination pagination, TSearch search);
        Task<TEntity> Replace(TEntity obj);
        Task<bool> Update(FilterDefinition<TEntity> filter, UpdateDefinition<TEntity> update, UpdateOptions options);
        void Delete(string id);
        void Delete(TEntity obj);
        void Delete<T>(T entity) where T : BsoDocument;
        Task<IEnumerable<TEntity>> Find(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> FindSingleAsync(Expression<Func<TEntity, bool>> predicate);
        TEntity FindSingle(Expression<Func<TEntity, bool>> predicate);        
    }
}
