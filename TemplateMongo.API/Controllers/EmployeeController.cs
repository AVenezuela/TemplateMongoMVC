using System;
using System.Collections.Generic;
using System.Linq;
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

namespace TemplateMongo.API.Controllers
{
    public class EmployeeController : BaseController
    {
        protected EmployeeService service { get; set; }
        protected EmployeeViewModel viewModel { get; set; }

        public EmployeeController(IEmployeeService _service, EmployeeViewModel _viewModel) {
            this.service = (EmployeeService)_service;
            this.viewModel = _viewModel;
        }        
        
        public async Task<EmployeeViewModel> Get()
        {
            this.viewModel.Employees = await this.service.GetAll();
            return this.viewModel;
        }

        // GET: api/Employee/5
        public async Task<EmployeeViewModel> Get(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                this.viewModel.EmployeeBag = await this.service.FindById(new ObjectId(id));
            }

            return this.viewModel;
        }

        // POST: api/Employee
        public async Task<Employee> Post(Employee model)
        {
            base.isModelValid();
            
                await this.service.DoAction(model);
                model.Login = null;
            

            return model;
        }

        // PUT: api/Employee/5
        public async Task<Employee> Put(Employee model)
        {
            base.isModelValid();
            await this.service.DoAction(model);            

            return model;
        }

        // DELETE: api/Employee/5
        public void Delete(int id)
        {
            //this.service.Delete()
        }
    }
}
