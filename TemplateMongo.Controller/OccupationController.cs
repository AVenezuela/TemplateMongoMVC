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
    //[Authorize]
    public class OccupationController : BaseController<OccupationViewModel, OccupationService>
    {
        public OccupationController(OccupationViewModel viewModel, IOccupationService service) : base(viewModel, (OccupationService)service) { }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            this._viewModel.Occupations = await this._service.GetAll(this._viewModel.PaginationBag);
            return View(this._viewModel);
        }

        [HttpGet]
        [ExecAditionalValidation]
        public async Task<ActionResult> Action(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                this._viewModel.OccupationBag = await this._service.FindById(new ObjectId(id));
            }

            return PartialView("_Action", this._viewModel);
        }

        [HttpPost]
        [ExecAditionalValidation]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Action([Bind]OccupationViewModel model)
        {
            if (ModelState.IsValid)
            {
                //inclusao
                if (ReferenceEquals(model.OccupationBag.MongoID, null))
                {
                    await this._service.Add(model.OccupationBag);
                }
                else
                {
                    //alteração
                    await this._service.Replace(model.OccupationBag);
                }
            }
            return PartialView("_Action", model);
        }

        [HttpPost]
        public async Task<PartialViewResult> SearchOccupation(OccupationViewModel model)
        {
            model.Occupations = await this._service.GetAll(model.PaginationBag);
            return PartialView("_List", model);
        }        
    }
}
