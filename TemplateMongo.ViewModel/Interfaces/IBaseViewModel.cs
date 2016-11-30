using System.Web.Mvc;

namespace TemplateMongo.ViewModel.Interfaces
{
    public interface IBaseViewModel
    {
        ModelStateDictionary ViewModelState { get; set; }
        string Command { get; set; }
        void ViewRules();
        void AditionalValidation();
    }
}
