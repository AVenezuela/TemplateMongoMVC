using System;
using TemplateMongo.ViewModel.Common;
using TemplateMongo.ViewModel.Interfaces;

namespace TemplateMongo.ViewModel
{
    public class HomeViewModel : BaseViewModel, IBaseViewModel
    {
        public HomeViewModel()
        {}

        public void Carregar()
        {
            
        }

        public void ViewRules()
        {
            throw new NotImplementedException();
        }

        public void AditionalValidation()
        {
            throw new NotImplementedException();
        }
    }
}
