﻿using System;
using SimpleInjector;
using SimpleInjector.Integration.Web;
using SimpleInjector.Integration.Web.Mvc;
using System.Web.Mvc;
using System.Reflection;
using System.Configuration;
using TemplateMongo.Data;
using TemplateMongo.Data.Interfaces;
using TemplateMongo.Data.Context;
using TemplateMongo.Services.Interfaces;
using TemplateMongo.Services;
using TemplateMongo.ViewModel;
using TemplateMongo.Data.Common;
using TemplateMongo.Model;

namespace TemplateMongo.CrossCutting
{
    public static class Inject
    {
        public static void DoInjections(Container container)
        {
            container.Register<IHomeRepository, HomeRepository>(Lifestyle.Scoped);
            container.Register<IHomeService, HomeService>(Lifestyle.Scoped);
            container.Register<HomeViewModel>(Lifestyle.Scoped);

            container.Register<IEmployeeRepository, EmployeeRepository>(Lifestyle.Scoped);
            container.Register<IEmployeeService, EmployeeService>(Lifestyle.Scoped);
            container.Register<EmployeeViewModel>(Lifestyle.Scoped);

            container.Register<IOccupationRepository, OccupationRepository>(Lifestyle.Scoped);
            container.Register<IOccupationService, OccupationService>(Lifestyle.Scoped);
            container.Register<OccupationViewModel>(Lifestyle.Scoped);

            container.Register<IApplicationUserRepository, ApplicationUserRepository>(Lifestyle.Scoped);
            container.Register<IApplicationUserService, ApplicationUserService>(Lifestyle.Scoped);

            container.Register<ICustomerRepository, CustomerRepository>(Lifestyle.Scoped);
            container.Register<ICustomerService, CustomerService>(Lifestyle.Scoped);
            container.Register<CustomerViewModel>(Lifestyle.Scoped);

            //container.Register<BaseRepository<DocumentType>>(Lifestyle.Scoped);
            //container.Register<BaseRepository<InsuranceCompany>>(Lifestyle.Scoped);
            //container.Register<DocumentTypeService>(Lifestyle.Scoped);
            container.Register<GenericService>(Lifestyle.Scoped);

            container.Register<BsonDocumentRepository>(Lifestyle.Scoped);
            container.Register<BsonDocumentService>(Lifestyle.Scoped);

            container.Register<MongoDBContextOptions>(Lifestyle.Scoped);
            container.RegisterInitializer<MongoDBContextOptions>(options =>
            {
                options.ConnectionString = getConfig("MongoConnection");
                options.DataBaseName = getConfig("MongoDBName");
            });
            container.Register<MongoDBContext>(Lifestyle.Scoped);
        }

        public static string getConfig(string name)
        {
            return ConfigurationManager.AppSettings[name];
        }
    }
}
