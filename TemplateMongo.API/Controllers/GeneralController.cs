using TemplateMongo.API.Commom;
using TemplateMongo.ViewModel;
using System.Threading.Tasks;
using TemplateMongo.Model;
using TemplateMongo.Services;
using System.Collections.Generic;
using System.Web.Http;

namespace TemplateMongo.API.Controllers
{
    public class GeneralController : BaseController
    {
        protected GenericService genericService { get; set; }        

        public GeneralController(GenericService _genericService)
        {
            this.genericService = _genericService;
        }        

        public async Task<IEnumerable<DocumentType>> GetDocumetTypes()
        {
            return await this.genericService.DocumentType().GetAll();
        }

        [HttpGet]
        public async Task<InsuranceCompanyViewModel> InsuranceCompany()
        {
            InsuranceCompanyViewModel viewModel = new InsuranceCompanyViewModel();
            viewModel.ListModel = await this.genericService.InsuranceCompany().GetAll();
            return viewModel;
        }
    }
}