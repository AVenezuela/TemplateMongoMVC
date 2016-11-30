using SimpleInjector;
using SimpleInjector.Integration.Web;
using SimpleInjector.Integration.Web.Mvc;
using System.Reflection;
using System.Web.Mvc;

namespace TemplateMongo.CrossCutting
{
    public class BootStrapper
    {
        public static void Start()
        {            
            Container container = new Container();
            container.Options.DefaultScopedLifestyle = new WebRequestLifestyle();

            Inject.DoInjections(container);

            container.RegisterMvcControllers(Assembly.GetExecutingAssembly());
            container.Verify();

            DependencyResolver.SetResolver(new SimpleInjectorDependencyResolver(container));
        }        
    }
}
