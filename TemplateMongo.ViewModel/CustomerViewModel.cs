using System;
using TemplateMongo.ViewModel.Common;
using TemplateMongo.ViewModel.Interfaces;
using TemplateMongo.Model;
using System.Collections.Generic;
using System.Web.Mvc;


namespace TemplateMongo.ViewModel
{
    public class CustomerViewModel : BaseViewModel, IBaseViewModel
    {
        #region Properties        
        public Customer CustomerBag { get; set; }
        public Phone PhoneBag { get; set; }
        public Address AddressBag { get; set; }
        public Insurance InsuranceBag { get; set; }
        public IEnumerable<Customer> Customers { get; set; }

        public IEnumerable<InsuranceCompany> InsuranceCompanies { get; set; }
        #endregion

        public CustomerViewModel()
        {
            this.CustomerBag = new Customer();
            this.PhoneBag = new Phone();
            this.AddressBag = new Address();
            this.Customers = new List<Customer>();
            this.InsuranceBag = new Insurance();
            this.InsuranceCompanies = new List<InsuranceCompany>();
        }

        public void ViewRules()
        {
            throw new NotImplementedException();
        }

        public void AditionalValidation()
        {
            this.ViewModelState.RemoveItemsContainsKey("PhoneBag");
            this.ViewModelState.RemoveItemsContainsKey("AddressBag");
        }
    }
}
