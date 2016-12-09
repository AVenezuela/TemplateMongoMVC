using TemplateMongo.Data.Common;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Services.Common;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Services
{
    public class DocumentTypeService : EntityService<DocumentType>, IEntityService<DocumentType>
    {
        public DocumentTypeService(BaseRepository<DocumentType> repository) : base(repository){
            repository.SetCollection("document_type");
        }
    }
}
