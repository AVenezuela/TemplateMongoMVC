using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Model;
using TemplateMongo.Services.Common;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Services
{
    public class HomeService : EntityService<Home>, IEntityService<Home>, IHomeService 
    {
        protected IHomeRepository _homeRepository { get; set; }

        public HomeService(IHomeRepository homeRepository) : base(homeRepository)
        {
            this._homeRepository = homeRepository;
        }
    }
}
