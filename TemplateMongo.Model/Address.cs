using System;
using System.ComponentModel.DataAnnotations;

namespace TemplateMongo.Model
{
    public class Address :  Entity
    {
        [Display(Name = "Logradouro")]
        [Required]
        public string Street { get; set; }
        
        [Display(Name = "Número")]
        [Required]
        public string Number { get; set; }

        [Display(Name = "Complemento")]
        public string Additional { get; set; }

        [Display(Name = "Bairro")]
        [Required]
        public string Neighborhood { get; set; }

        [Display(Name = "Cidade")]
        [Required]
        public string City { get; set; }

        [Display(Name = "Estado")]
        [Required]
        public string State { get; set; }

        [Display(Name = "CEP")]
        [Required]
        public string PostalCode { get; set; }

        [Display(Name = "Principal")]
        public bool isPrincipal { get; set; }
    }
}
