using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace TemplateMongo.UI
{
    public class PartialPathConfig
    {
        public static void Register()
        {
            RazorViewEngine razorEngine = ViewEngines.Engines.OfType<RazorViewEngine>().FirstOrDefault();
            if (!ReferenceEquals(razorEngine, null))
            {
                var newPartialViewFormats = new[] {
                    "~/Views/Shared/EditorTemplates/{0}.cshtml",
                    "~/Views/{1}/Partial/{0}.cshtml"
                };
                razorEngine.PartialViewLocationFormats = razorEngine.PartialViewLocationFormats.Union(newPartialViewFormats).ToArray();
            }            
        }
    }
}