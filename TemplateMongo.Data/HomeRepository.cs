using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TemplateMongo.Data.Common;
using TemplateMongo.Data.Context;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;

namespace TemplateMongo.Data
{
    public class HomeRepository : BaseRepository<Home>, IHomeRepository 
    {
        public HomeRepository(MongoDBContext context) : base(context)
        {
            SetCollection("home");
        }
    }
}
