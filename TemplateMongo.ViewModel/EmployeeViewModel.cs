using System;
using TemplateMongo.ViewModel.Common;
using TemplateMongo.ViewModel.Interfaces;
using TemplateMongo.Model;
using System.Collections.Generic;
using System.Web.Mvc;

namespace TemplateMongo.ViewModel
{
    public class EmployeeViewModel : BaseViewModel, IBaseViewModel
    {
        #region Properties        
        public Employee EmployeeBag { get; set; }
        public Phone PhoneBag { get; set; }
        public Address AddressBag { get; set; }
        public IEnumerable<Employee> Employees { get; set; }
        public SearchEmployee SearchEmployeeBag { get; set; }        
        #endregion

        public EmployeeViewModel()
        {
            this.EmployeeBag = new Employee();
            this.PhoneBag = new Phone();
            this.AddressBag = new Address();
            this.Employees = new List<Employee>();
            this.PaginationBag = new Pagination();
            this.PaginationBag.TotalLinks = 5;
            this.PaginationBag.TotalShownRecords = 5;
            this.SearchEmployeeBag = new SearchEmployee();            
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
