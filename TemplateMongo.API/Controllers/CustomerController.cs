using System.Net;
using System.Net.Http;
using System.Web.Http;
using TemplateMongo.API.Commom;
using TemplateMongo.Services.Interfaces;
using TemplateMongo.Services;
using TemplateMongo.ViewModel.Interfaces;
using TemplateMongo.ViewModel;
using System.Threading.Tasks;
using MongoDB.Bson;
using System.Web.Http.Results;
using System.Web.Mvc;
using TemplateMongo.Model;
using System;

namespace TemplateMongo.API.Controllers
{
    public class CustomerController : BaseController
    {
        protected CustomerService service { get; set; }
        protected CustomerViewModel viewModel { get; set; }
        public CustomerController(ICustomerService _service, CustomerViewModel _viewModel)
        {
            this.service = (CustomerService)_service;
            this.viewModel = _viewModel;
        }

        public async Task<CustomerViewModel> Get()
        {
            this.viewModel.Customers = await this.service.GetAll();
            return this.viewModel;
        }

        public async Task<CustomerViewModel> Get(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                this.viewModel.CustomerBag = await this.service.FindById(new ObjectId(id));
            }

            return this.viewModel;
        }

        // POST: api/Employee
        public async Task<Customer> Post(Customer model)
        {
            if (ModelState.IsValid)
            {
                await this.service.Add(model);
            }
            else
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));

            return model;
        }

        // PUT: api/Employee/5
        public async Task<Customer> Put(Customer model)
        {
            if (ModelState.IsValid)
                await this.service.Replace(model);
            else
            {
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState));
            }

            return model;
        }
    }
}