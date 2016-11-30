using System.Web;
using System.Web.Optimization;

namespace TemplateMongo.UI
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            //TODO: DESCOMENTAR AO PUBLICAR
            //BundleTable.EnableOptimizations = true;
            if (!object.ReferenceEquals(bundles, null))
            {
                bundles.FileSetOrderList.Clear();
                bundles.Add(GetCSSThemes());
                bundles.Add(GetCSS());
                bundles.Add(GetJS());
                GetJSForPartials(bundles);
            }
        }

        static Bundle GetCSSThemes()
        {
            StyleBundle css = new StyleBundle("~/Content/themes/css");
            css.IncludeDirectory("~/Content/themes", "*.css");
            return css;
        }

        static Bundle GetCSS()
        {
            StyleBundle css = new StyleBundle("~/Content/css");
            css.IncludeDirectory("~/Content/", "*.css");
            css.Include("~/Content/Site.css");
            css.Include("~/Content/datepicker.css");
            css.Include("~/Content/timepicker.css");
            return css;
        }

        static Bundle GetJS()
        {
            ScriptBundle scripts = new ScriptBundle("~/Scripts/js");
            scripts.Include("~/Scripts/errorHandling.js");
            scripts.Include("~/Scripts/jquery-3.1.1.js");
            scripts.Include("~/Scripts/jquery-x.js");
            scripts.Include("~/Scripts/jquery-ui-1.12.1.js");
            scripts.Include("~/Scripts/jquery.validate.js");
            scripts.Include("~/Scripts/jquery.validate.unobtrusive.js");
            scripts.Include("~/Scripts/jquery.unobtrusive-ajax.js");
            scripts.Include("~/Scripts/customValidation.js");
            scripts.Include("~/Scripts/bootstrap.js");
            scripts.Include("~/Scripts/confirm.js");
            scripts.Include("~/Scripts/modal.js");
            //scripts.Include("~/Scripts/menu.js");
            scripts.Include("~/Scripts/timepicker.js");
            scripts.Include("~/Scripts/ie10-viewport-bug-workaround.js");
            scripts.Include("~/Scripts/App.js");            
            return scripts;
        }

        static void GetJSForPartials(BundleCollection bundles)
        {
            //script para a view Views/Employee
            ScriptBundle scripts = new ScriptBundle("~/Scripts/EmployeeJS");
            scripts.Include("~/Scripts/App.Employee.js");            
            bundles.Add(scripts);
            scripts = new ScriptBundle("~/Scripts/OccupationJS");
            scripts.Include("~/Scripts/App.Occupation.js");
            bundles.Add(scripts);
        }
    }
}
