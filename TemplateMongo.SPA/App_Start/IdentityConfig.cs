using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using TemplateMongo.SPA.Models;
using TemplateMongo.Model;

namespace TemplateMongo.SPA
{
    public class EmailService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your email service here to send an email.
            return Task.FromResult(0);
        }
    }

    public class SmsService : IIdentityMessageService
    {
        public Task SendAsync(IdentityMessage message)
        {
            // Plug in your SMS service here to send a text message.
            return Task.FromResult(0);
        }
    }

    // Configure the application user manager which is used in this application.
    public class ApplicationUserManager : IDisposable 
    {
        public IIdentityMessageService SmsService { get; internal set; }

        public ApplicationUserManager()        {
        }              

        internal Task<IList<UserLoginInfo>> GetLoginsAsync(string userId)
        {
            throw new NotImplementedException();
        }      

        

        public void Dispose()
        {
            throw new NotImplementedException();
        }        
    }

    // Configure the application sign-in manager which is used in this application.  
    public class ApplicationSignInManager : IDisposable 
    {
        public ApplicationSignInManager() 
        { }

        internal Task SignInAsync(object user, bool isPersistent, bool rememberBrowser)
        {
            throw new NotImplementedException();
        }

        internal Task<SignInStatus> PasswordSignInAsync(string email, string password, bool rememberMe, bool shouldLockout)
        {
            throw new NotImplementedException();
        }

        internal Task<bool> HasBeenVerifiedAsync()
        {
            throw new NotImplementedException();
        }

        internal Task<SignInStatus> TwoFactorSignInAsync(string provider, string code, bool isPersistent, bool rememberBrowser)
        {
            throw new NotImplementedException();
        }

        internal Task<object> GetVerifiedUserIdAsync()
        {
            throw new NotImplementedException();
        }

        internal Task<bool> SendTwoFactorCodeAsync(string selectedProvider)
        {
            throw new NotImplementedException();
        }

        internal Task<SignInStatus> ExternalSignInAsync(ExternalLoginInfo loginInfo, bool isPersistent)
        {
            throw new NotImplementedException();
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }
    }
}
