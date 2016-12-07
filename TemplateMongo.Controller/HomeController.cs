using System;
using System.Web.Mvc;
using TemplateMongo.ViewModel;
using TemplateMongo.Controllers.Common;
using TemplateMongo.Services;
using TemplateMongo.Services.Interfaces;

namespace TemplateMongo.Controllers
{
    //[Authorize]
    public class HomeController : BaseController<HomeViewModel, HomeService>
    {
        public HomeController(IHomeService service, HomeViewModel viewModel) : base(viewModel, (HomeService)service)
        {        }

        public ActionResult Index()
        {
            //this._viewModel.Carregar();
            return View();
        }

        public PartialViewResult DashBoard()
        {
            return PartialView("_Home");
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult GetData()
        {
            return new JsonResult { Data = "Olaaaa", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}