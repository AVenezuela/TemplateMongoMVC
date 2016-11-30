using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TemplateMongo.Data.Context
{
    public class MongoDBContextOptions
    {
        public string ConnectionString { get; set; }
        public string DataBaseName { get; set; }
    }
}
