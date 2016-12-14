using System;
using System.Web.Mvc;
using TemplateMongo.ViewModel;
using TemplateMongo.Model;
using TemplateMongo.Controllers.Common;
using System.Threading.Tasks;
using TemplateMongo.Services.Interfaces;
using TemplateMongo.Services;
using TemplateMongo.Controllers.Filters;
using MongoDB.Bson;


namespace TemplateMongo.Controllers
{
    public class PartialController : BaseController
    {
        [HttpGet]
        public PartialViewResult Phone()
        {
            return PartialView("_Phone");
        }

        [HttpGet]
        public PartialViewResult Address()
        {
            return PartialView("_Address");
        }

        [HttpGet]
        public PartialViewResult SimpleRegister()
        {
            return PartialView("_SimpleRegister");
        }
    }
}
