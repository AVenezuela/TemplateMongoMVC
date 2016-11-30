﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Routing;
using TemplateMongo.CrossCutting;

namespace TemplateMongo.API
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configure(WebApiConfig.Register);
            BootStrapperAPI.Start(GlobalConfiguration.Configuration);
        }
    }
}