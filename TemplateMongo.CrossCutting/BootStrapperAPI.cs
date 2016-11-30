
using SimpleInjector;
using SimpleInjector.Integration.WebApi;
using System.Web.Http;

namespace TemplateMongo.CrossCutting
{
    public class BootStrapperAPI
    {
        public static void Start(HttpConfiguration globalConfiguration)
        {
            Container container = new Container();
            container.Options.DefaultScopedLifestyle = new WebApiRequestLifestyle();

            Inject.DoInjections(container);

            container.RegisterWebApiControllers(globalConfiguration);
            container.Verify();

            globalConfiguration.DependencyResolver = new SimpleInjectorWebApiDependencyResolver(container);
        }
    }
}
