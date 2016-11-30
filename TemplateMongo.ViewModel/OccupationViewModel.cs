using System;
using TemplateMongo.ViewModel.Common;
using TemplateMongo.ViewModel.Interfaces;
using TemplateMongo.Model;
using System.Collections.Generic;
using System.Web.Mvc;

namespace TemplateMongo.ViewModel
{
    public class OccupationViewModel : BaseViewModel, IBaseViewModel
    {
        public Occupation OccupationBag { get; set; }
        public IEnumerable<Occupation> Occupations { get; set; }

        public OccupationViewModel()
        {
            this.OccupationBag = new Occupation();
            this.Occupations = new List<Occupation>();
            this.PaginationBag = new Pagination();
            this.PaginationBag.TotalShownRecords = 10;
            this.PaginationBag.TotalLinks = 5;
        }

        public void AditionalValidation()
        {
        }

        public void ViewRules()
        {
        }
    }
}
