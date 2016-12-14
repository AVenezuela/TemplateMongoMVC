using TemplateMongo.Data.Common;
using TemplateMongo.Data.Context;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Services.Common;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Services
{
    public class GenericService
    {
        protected MongoDBContext context { get; set; }
        public GenericService(MongoDBContext _context){
            this.context = _context;
        }
        public IEntityService<DocumentType> DocumentType()
        {            
            return this.createService<DocumentType>("document_type");
        }
        public IEntityService<InsuranceCompany> InsuranceCompany()
        {            
            return this.createService<InsuranceCompany>("insurance_companies");
        }
        private IEntityService<TEntity> createService<TEntity>(string collectionName) where TEntity : Entity
        {
            BaseRepository<TEntity> _repository = new BaseRepository<TEntity>(this.context);
            _repository.SetCollection(collectionName);
            IEntityService<TEntity> service = new EntityService<TEntity>(_repository);
            return service;
        }
    }
}
