using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    public class Hash
    {
        public string Salt { get; set; }
        public int SaltLength { get; set; }
        public int Iterations { get; set; }
    }
}
