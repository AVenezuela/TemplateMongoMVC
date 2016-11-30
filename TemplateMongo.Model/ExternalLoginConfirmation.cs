using System;
using System.ComponentModel.DataAnnotations;

namespace TemplateMongo.Model
{
    public class ExternalLoginConfirmation
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }

        [Display(Name = "Hometown")]
        public string Hometown { get; set; }
    }
}
