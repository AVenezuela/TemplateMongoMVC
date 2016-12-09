using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using MongoDB.Bson;
using TemplateMongo.Data.Common;
using TemplateMongo.Data.Context;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Services.Common;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Services.Common
{
    public class GeneralService<T> : IGeneralService<T> where T : BsonDocument
    {
        public readonly IBaseRepository<T> _repository;

        public GeneralService(IBaseRepository<T> repository)
        {
            _repository = repository;
        }

        public void SetCollection(string _name)
        {
            (_repository as BaseRepository<T>).SetCollection(_name);
        }

        public Task<T> Add(T entity)
        {
            throw new NotImplementedException();
        }

        public void Delete(T entity)
        {
            throw new NotImplementedException();
        }

        public Task<T> FindById(ObjectId id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<T>> GetAll(Pagination pagination)
        {
            throw new NotImplementedException();
        }

        public Task<T> Update(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
