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
    [Authorize]
    public class EmployeeController : BaseController<EmployeeViewModel, EmployeeService>
    {        
        public EmployeeController(EmployeeViewModel viewmodel, IEmployeeService service) :
            base(viewmodel, (EmployeeService)service){}

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            this._viewModel.Employees = await this._service.GetAll(this._viewModel.PaginationBag);
            return View(this._viewModel);
        }

        [HttpGet]
        [ExecAditionalValidation]
        public async Task<ActionResult> Action(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                this._viewModel.EmployeeBag = await this._service.FindById(new ObjectId(id));
            }

            return PartialView("_Action", this._viewModel);
        }       

        [HttpPost]
        [ExecAditionalValidation]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Action([Bind]EmployeeViewModel model)
        {
            if (ModelState.IsValid)            
                await this._service.DoAction(model.EmployeeBag);                
            
            return PartialView("_Action", model);
        }

        [AddHtmlFieldPrefix]        
        public PartialViewResult AddPhone(Phone PhoneBag, string prefix)
        {
            if (!Request.IsAjaxRequest())
                throw new MissingMethodException("Invalid Request");

            return PartialView("Phone", PhoneBag);
        }

        [AddHtmlFieldPrefix]
        public PartialViewResult AddAddress(Address AddressBag, string prefix)
        {
            if (!Request.IsAjaxRequest())
                throw new MissingMethodException("Invalid Request");

            return PartialView("Address", AddressBag);
        }

        [HttpPost]
        public async Task<PartialViewResult> SearchEmployee(EmployeeViewModel model)
        {
            model.Employees = await this._service.GetAll(model.PaginationBag, model.SearchEmployeeBag);
            return PartialView("_List", model);
        }
        
        [Route("all-employees")]
        public async Task<JsonResult> GetAll(EmployeeViewModel model)
        {
            model.Employees = await this._service.GetAll(model.PaginationBag, model.SearchEmployeeBag);
            return new JsonResult { Data = model, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}
