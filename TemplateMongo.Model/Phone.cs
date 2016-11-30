using System;
using System.ComponentModel.DataAnnotations;

namespace TemplateMongo.Model
{
    public class Phone : Entity
    {
        [Display(Name = "Número")]
        [Required]
        public string Number { get; set; }

        [Display(Name = "Principal")]
        public bool isPrincipal { get; set; }
    }
}
