using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TemplateMongo.Data.Common;
using TemplateMongo.Data.Context;

namespace TemplateMongo.Data
{
    public class BsonDocumentRepository : BaseRepository<BsonDocument>
    {
        public BsonDocumentRepository(MongoDBContext context) : base(context){}
    }
}
