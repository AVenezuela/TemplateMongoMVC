using TemplateMongo.Data.Common;
using TemplateMongo.Data.Context;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;

namespace TemplateMongo.Data
{
    public class OccupationRepository : BaseRepository<Occupation>, IOccupationRepository
    {
        public OccupationRepository(MongoDBContext context) : base(context)
        {
            SetCollection("occupations");
        }
    }
}
