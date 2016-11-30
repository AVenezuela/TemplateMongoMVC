using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using TemplateMongo.ViewModel.Interfaces;

namespace TemplateMongo.Controllers.Filters
{
    public class ExecAditionalValidation : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            if (object.ReferenceEquals(filterContext, null))
                return;

            if (filterContext.ActionParameters.ContainsKey("model"))
            {
                var model = filterContext.ActionParameters["model"] as IBaseViewModel;
                if (model != null)
                {
                    model.ViewModelState = filterContext.Controller.ViewData.ModelState;

                    if (filterContext.ActionParameters.ContainsKey("Command"))
                        model.Command = filterContext.ActionParameters["Command"] as string;

                    model.AditionalValidation();
                }
            }
        }
    }
}
