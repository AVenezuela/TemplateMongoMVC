using System.Collections.Generic;
using TemplateMongo.Model;
namespace TemplateMongo.ViewModel
{
    public class InsuranceCompanyViewModel
    {
        public InsuranceCompany ModelBag { get; set; }
        public IEnumerable<InsuranceCompany> ListModel { get; set; }


        public InsuranceCompanyViewModel()
        {
            this.ModelBag = new InsuranceCompany();
            this.ListModel = new List<InsuranceCompany>();
        }
    }
}
