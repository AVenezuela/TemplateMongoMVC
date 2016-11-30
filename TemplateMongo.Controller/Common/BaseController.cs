using System;
using System.IO;
using System.Web.Mvc;
using TemplateMongo.Model;

namespace TemplateMongo.Controllers.Common
{
    public abstract class BaseController : Controller
    {
        [HttpPost]
        public ActionResult DownloadFile(Download download)
        {
            if (object.ReferenceEquals(download, null))
                download = new Download();

            if (download.isInApp)
                download.caminhoArquivo += Path.Combine(AppDomain.CurrentDomain.BaseDirectory, download.caminhoArquivo);

            byte[] fileBytes = System.IO.File.ReadAllBytes(Path.Combine(download.caminhoArquivo, download.NomeArquivo));

            return File(fileBytes, System.Net.Mime.MediaTypeNames.Application.Octet, download.NomeArquivo);
        }

        public void AddModelStateErrorMessage(string message)
        {
            ModelState.AddModelError(string.Empty, message);
        }

        public MvcHtmlString RenderRazorViewToString(string viewName, object model)
        {
            ViewData.Model = model;
            using (var sw = new StringWriter())
            {
                try
                {
                    var viewResult = ViewEngines.Engines.FindPartialView(ControllerContext,
                                                                         viewName);
                    var viewContext = new ViewContext(ControllerContext, viewResult.View,
                                                 ViewData, TempData, sw);
                    viewResult.View.Render(viewContext, sw);
                    viewResult.ViewEngine.ReleaseView(ControllerContext, viewResult.View);
                    return new MvcHtmlString(sw.GetStringBuilder().ToString());
                }
                catch (System.Web.HttpCompileException)
                {
                    return MvcHtmlString.Empty;
                }
            }
        }
    }

    public abstract class BaseController<TViewModel, TService> : BaseController
    {
        protected TViewModel _viewModel;
        protected TService _service;

        public BaseController() { }

        public BaseController(TViewModel viewModel, TService service) {
            this._viewModel = viewModel;
            this._service = service;
        }        
    }
}
