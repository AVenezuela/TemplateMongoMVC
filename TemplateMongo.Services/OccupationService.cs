using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Services.Common;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Services
{
    public class OccupationService : EntityService<Occupation>, IEntityService<Occupation>, IOccupationService 
    {
        protected IOccupationRepository _myRepository { get; set; }

        public OccupationService(IOccupationRepository repository) : base(repository)
        {
            this._myRepository = repository;
        }
    }
}
