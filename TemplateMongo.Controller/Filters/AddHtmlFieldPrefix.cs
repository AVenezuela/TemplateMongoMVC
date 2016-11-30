using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using TemplateMongo.ViewModel.Interfaces;

namespace TemplateMongo.Controllers.Filters
{
    public class AddHtmlFieldPrefix : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            if (object.ReferenceEquals(filterContext, null))
                return;

            if (filterContext.ActionParameters.ContainsKey("prefix"))
                filterContext.Controller.ViewData.TemplateInfo.HtmlFieldPrefix = filterContext.ActionParameters["prefix"] as string;            
        }
    }
}
