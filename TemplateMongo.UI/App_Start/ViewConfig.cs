using System.Web.Mvc;

namespace TemplateMongo.UI
{
    public class ViewConfig
    {
        public static void Setup()
        {
            ControllerBuilder.Current.DefaultNamespaces.Add("TemplateMongo.Controllers");
            AreaRegistration.RegisterAllAreas();
            MvcHandler.DisableMvcResponseHeader = true;
            ModelMetadataProviders.Current = new CachedDataAnnotationsModelMetadataProvider();
        }
    }
}