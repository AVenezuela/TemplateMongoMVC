using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TemplateMongo.Data;
using TemplateMongo.Services.Common;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Services
{
    public class BsonDocumentService : GeneralService<BsonDocument>, IGeneralService<BsonDocument>
    {
        protected BsonDocumentRepository _homeRepository { get; set; }

        public BsonDocumentService(BsonDocumentRepository homeRepository) : base(homeRepository)
        {
            this._homeRepository = homeRepository;
        }
    }
}
