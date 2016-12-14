using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using TemplateMongo.Model.Interfaces;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Data.Context;
using TemplateMongo.Model;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Reflection;
using MongoDB.Driver.Builders;

namespace TemplateMongo.Data.Common
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : class
    {
        protected MongoDBContext _mongoDBContext;
        protected IMongoCollection<TEntity> _collection;        
        protected FilterDefinition<TEntity> filter;
        protected Pagination _pagination { get; set; }

        public BaseRepository(MongoDBContext context)
        {
            filter = Builders<TEntity>.Filter.Empty;
            _mongoDBContext = context;
        }
        public void SetCollection(string collectionName)
        {
            _collection = _mongoDBContext.DataBase.GetCollection<TEntity>(collectionName);
        }
        public async Task<TEntity> Add(TEntity obj)
        {
            await _collection.InsertOneAsync(obj);
            return obj;
        }

        public async Task<IEnumerable<TEntity>> Find(Expression<Func<TEntity, bool>> predicate)
        {
            return await _collection.Find(predicate).ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> Find(Expression<Func<TEntity, bool>> predicate, ProjectionDefinition<TEntity, TEntity> projection)
        {
            return await _collection.Find(predicate).Project(projection).ToListAsync();
        }

        public async Task<TEntity> FindSingleAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _collection.Find(predicate).SingleOrDefaultAsync();
        }

        public TEntity FindSingle(Expression<Func<TEntity, bool>> predicate)
        {
            return _collection.Find(predicate).SingleOrDefault();
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {            
            return await _collection.Find(filter).ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAll(Pagination pagination)
        {
            this._pagination = pagination;
            IEnumerable<TEntity> result = await this.GetAll();

            if (ReferenceEquals(result, null))
                return new List<TEntity>();

            this._pagination.TotalRecords = result.Count();

            int startRange = ((this._pagination.ActualPage - 1) * this._pagination.TotalShownRecords);
            int endRange = (this._pagination.ActualPage * this._pagination.TotalShownRecords);

            result = result.Skip(startRange).Take(this._pagination.TotalShownRecords);
            return result;
        }

        public async Task<IEnumerable<TEntity>> GetAll<TSearch>(Pagination pagination, TSearch search)
        {
            this._pagination = pagination;

            this.BuildFilters(search);

            IEnumerable<TEntity> result = await this.GetAll();
            this._pagination.TotalRecords = result.Count();

            int startRange = ((this._pagination.ActualPage - 1) * this._pagination.TotalShownRecords);
            int endRange = (this._pagination.ActualPage * this._pagination.TotalShownRecords);

            result = result.Skip(startRange).Take(this._pagination.TotalShownRecords);
            return result;
        }

        private void BuildFilters<TSearch>(TSearch search) 
            //where TSearch : new() 
        {
            if (ReferenceEquals(search, null))
                return;

            PropertyInfo[] props = search.GetType().GetProperties();
            var builder = Builders<TEntity>.Filter;
            foreach (PropertyInfo prop in props)
            {
                object value = prop.GetValue(search);
                if (!ReferenceEquals(value, null))
                    this.filter = this.filter & builder.Eq(prop.Name, value);
            }
        }

        public async Task<TEntity> FindById(ObjectId id)
        {                        
            filter = Builders<TEntity>.Filter.Eq("_id", id);
            return await _collection.Find(filter).SingleOrDefaultAsync();
        }        

        public void Delete(string id)
        {
            filter = Builders<TEntity>.Filter.Eq("_id", id);
            _collection.DeleteOne(filter);
        }

        public async Task<TEntity> Replace(TEntity obj)
        {
            filter = Builders<TEntity>.Filter.Eq("_id", new ObjectId((obj as Entity).MongoID));
            await _collection.ReplaceOneAsync(filter, obj);
            return obj;
        }

        public async Task<bool> Update(FilterDefinition<TEntity> filter, UpdateDefinition<TEntity> update, UpdateOptions options)
        {
            try
            {                
                await _collection.UpdateOneAsync(filter, update, options);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        public void Delete(TEntity obj)
        {
            Delete((obj as Entity).MongoID);
        }

        public void Delete<T>(T entity) where T : BsoDocument
        {
            throw new NotImplementedException();
        }
    }
}
