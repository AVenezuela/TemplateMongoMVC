using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;
using TemplateMongo.Services.Interfaces;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;

namespace TemplateMongo.Services.Common
{
    public abstract class EntityService<T> : IEntityService<T> where T : BaseEntity
    {
        protected readonly IBaseRepository<T> _repository;

        public EntityService(IBaseRepository<T> repository)
        {
            _repository = repository;
        }

        public async Task<T> Add(T entity)
        {
            checkIfIsNull(entity);
            await _repository.Add(entity);
            return entity;
        }

        public async Task<T> FindById(ObjectId id)
        {
            return await _repository.FindById(id);
        }

        public async Task<T> Update(T entity)
        {
            checkIfIsNull(entity);
            await _repository.Update(entity);
            return entity;
        }

        public void Delete(T entity)
        {
            checkIfIsNull(entity);
            _repository.Delete(entity);
        }

        public Task<IEnumerable<T>> GetAll()
        {
            return _repository.GetAll();
        }

        public Task<IEnumerable<T>> GetAll(Pagination pagination)
        {
            return _repository.GetAll(pagination);
        }

        public Task<IEnumerable<T>> GetAll<TSearch>(Pagination pagination, TSearch search)
        {
            return _repository.GetAll(pagination, search);
        }

        private void checkIfIsNull(T entity)
        {
            if (object.ReferenceEquals(entity, null)) throw new ArgumentNullException("entity");
        }
    }
}
