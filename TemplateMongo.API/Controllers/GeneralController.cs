using System.Net;
using System.Net.Http;
using System.Web.Http;
using TemplateMongo.API.Commom;
using TemplateMongo.Services.Interfaces;
using TemplateMongo.Services.Common;
using TemplateMongo.ViewModel.Interfaces;
using TemplateMongo.ViewModel;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.Web.Http.Results;
using System.Web.Mvc;
using TemplateMongo.Model;
using System;
using TemplateMongo.Services;
using System.Collections;
using System.Collections.Generic;

namespace TemplateMongo.API.Controllers
{
    public class GeneralController : BaseController
    {
        protected DocumentTypeService documentTypeService { get; set; }

        public GeneralController(DocumentTypeService _documentTypeService)
        {
            this.documentTypeService = _documentTypeService;
        }

        public async Task<IEnumerable<DocumentType>> GetDocumetTypes()
        {
            return await this.documentTypeService.GetAll();
        }
    }
}