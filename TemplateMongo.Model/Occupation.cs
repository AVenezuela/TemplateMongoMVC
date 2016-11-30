using System;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateMongo.Model
{
    public class Occupation : Entity
    {
        [Required]
        [Display(Description ="Occupation")]
        public string Name { get; set; }
        [Required]
        [Display(Description = "Salary")]
        public decimal? Salary { get; set; } 
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
