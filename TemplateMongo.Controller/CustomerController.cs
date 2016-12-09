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
    public class CustomerController : BaseController<CustomerViewModel, CustomerService>
    {
        public CustomerController(CustomerViewModel viewmodel, ICustomerService service) :
            base(viewmodel, (CustomerService)service){ }

        [HttpGet]
        public async Task<ActionResult> Index()
        {
            this._viewModel.Customers = await this._service.GetAll();
            return View(this._viewModel);
        }

        [HttpGet]
        [ExecAditionalValidation]
        public async Task<ActionResult> Action(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                this._viewModel.CustomerBag = await this._service.FindById(new ObjectId(id));
            }

            return PartialView("_Action", this._viewModel);
        }
    }
}
