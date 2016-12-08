using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateMongo.Model
{
    public class InsuranceCompany : Entity
    {
        public string Name { get; set; }
        public bool isActive { get; set; }
    }
}
