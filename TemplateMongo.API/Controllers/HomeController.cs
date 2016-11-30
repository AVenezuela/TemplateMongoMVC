using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TemplateMongo.API.Commom;
using TemplateMongo.Services.Interfaces;
using TemplateMongo.ViewModel;

namespace TemplateMongo.API.Controllers
{
    public class HomeController : BaseController
    {
        protected IHomeService service { get; set; }
        protected HomeViewModel viewModel { get; set; }

        public HomeController(IHomeService _service, HomeViewModel _viewModel) {
            this.service = _service;
            this.viewModel = _viewModel;
        }

        // GET: api/Home
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Home/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Home
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Home/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Home/5
        public void Delete(int id)
        {
        }
    }
}
