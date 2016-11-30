using System;
using System.Collections.Generic;


namespace TemplateMongo.ViewModel
{
    public class ExternalLoginListViewModel
    {
        public string ReturnUrl { get; set; }
    }

    public class SendCodeViewModel
    {
        public string SelectedProvider { get; set; }
        public ICollection<System.Web.Mvc.SelectListItem> Providers { get; set; }
        public string ReturnUrl { get; set; }
        public bool RememberMe { get; set; }
    }

    // Models returned by AccountController actions.
    public class ExternalLoginConfirmationViewModel
    {

    }

    public class VerifyCodeViewModel
    {
        
    }

    public class ForgotViewModel
    {
        
    }
    

    public class ResetPasswordViewModel
    {

    }

    public class ForgotPasswordViewModel
    {

    }

    //public class RegisterViewModel
    //{
    //    [Required]
    //    [EmailAddress]
    //    [Display(Name = "Email")]
    //    public string Email { get; set; }

    //    [Required]
    //    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    //    [DataType(DataType.Password)]
    //    [Display(Name = "Password")]
    //    public string Password { get; set; }

    //    [DataType(DataType.Password)]
    //    [Display(Name = "Confirm password")]
    //    [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
    //    public string ConfirmPassword { get; set; }

    //    [Display(Name = "Hometown")]
    //    public string Hometown { get; set; }
    //}
}
