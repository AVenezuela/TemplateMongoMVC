using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    public class Forgot
    {
        [Required]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}
