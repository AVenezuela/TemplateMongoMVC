using System;
using System.Web.Mvc;
using TemplateMongo.Model.Binders;
using MongoDB.Bson;

namespace TemplateMongo.UI
{
    public class ModelBinderConfig
    {
        public static void RegisterBinders()
        {
            ModelBinders.Binders.Add(typeof(ObjectId), new ObjectIdBinder());            
        }
    }
}