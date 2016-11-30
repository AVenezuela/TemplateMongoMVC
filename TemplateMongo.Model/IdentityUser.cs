using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    #region User
    public interface IUser : IUser<string>
    {
    }    
    public interface IUser<out TKey>
    {
        //
        // Summary:
        //     Unique key for the user
        TKey Id { get; }
        //
        // Summary:
        //     Unique username
        string UserName { get; set; }
    }
    #endregion

    #region Login
    public class IdentityUserLogin<TKey>
    {
        public IdentityUserLogin() { }

        //
        // Summary:
        //     The login provider for the login (i.e. facebook, google)
        public virtual string LoginProvider { get; set; }
        //
        // Summary:
        //     Key representing the login for the provider
        public virtual string ProviderKey { get; set; }
        //
        // Summary:
        //     User Id for the user who owns this login
        public virtual TKey UserId { get; set; }
    }    
    public class IdentityUserLogin : IdentityUserLogin<string>
    {
        public IdentityUserLogin() { }
    }
    #endregion

    #region Role
    public interface IRole<out TKey>
    {
        //
        // Summary:
        //     Id of the role
        TKey Id { get; }
        //
        // Summary:
        //     Name of the role
        string Name { get; set; }
    }
    public class IdentityUserRole<TKey>
    {
        public IdentityUserRole() { }

        //
        // Summary:
        //     RoleId for the role
        public virtual TKey RoleId { get; set; }
        //
        // Summary:
        //     UserId for the user that is in the role
        public virtual TKey UserId { get; set; }
    }    
    public class IdentityUserRole : IdentityUserRole<string>
    {
        public IdentityUserRole() { }
    }
    public class IdentityRole<TKey, TUserRole> : IRole<TKey> where TUserRole : IdentityUserRole<TKey>
    {
        //
        // Summary:
        //     Constructor
        public IdentityRole() { }

        //
        // Summary:
        //     Role id
        public TKey Id { get; set; }
        //
        // Summary:
        //     Role name
        public string Name { get; set; }
        //
        // Summary:
        //     Navigation property for users in the role
        public virtual ICollection<TUserRole> Users { get; }
    }
    #endregion

    #region Claims
    public class IdentityUserClaim<TKey>
    {
        public IdentityUserClaim() { }

        //
        // Summary:
        //     Claim type
        public virtual string ClaimType { get; set; }
        //
        // Summary:
        //     Claim value
        public virtual string ClaimValue { get; set; }
        //
        // Summary:
        //     Primary key
        public virtual int Id { get; set; }
        //
        // Summary:
        //     User Id for the user who owns this login
        public virtual TKey UserId { get; set; }
    }
    public class IdentityUserClaim : IdentityUserClaim<string>
    {
        public IdentityUserClaim() { }
    }
    #endregion

    #region Identity
    public class IdentityUser<TKey, TLogin, TRole, TClaim> : IUser<TKey>
        where TLogin : IdentityUserLogin<TKey>
        where TRole : IdentityUserRole<TKey>
        where TClaim : IdentityUserClaim<TKey>
    {
        //
        // Summary:
        //     Constructor
        public IdentityUser() { }

        //
        // Summary:
        //     Used to record failures for the purposes of lockout
        public virtual int AccessFailedCount { get; set; }
        //
        // Summary:
        //     Navigation property for user claims
        public virtual ICollection<TClaim> Claims { get; }
        //
        // Summary:
        //     Email
        public virtual string Email { get; set; }
        //
        // Summary:
        //     True if the email is confirmed, default is false
        public virtual bool EmailConfirmed { get; set; }
        //
        // Summary:
        //     User ID (Primary Key)
        public virtual TKey Id { get; set; }
        //
        // Summary:
        //     Is lockout enabled for this user
        public virtual bool LockoutEnabled { get; set; }
        //
        // Summary:
        //     DateTime in UTC when lockout ends, any time in the past is considered not locked
        //     out.
        public virtual DateTime? LockoutEndDateUtc { get; set; }
        //
        // Summary:
        //     Navigation property for user logins
        public virtual ICollection<TLogin> Logins { get; }
        //
        // Summary:
        //     The salted/hashed form of the user password
        public virtual string PasswordHash { get; set; }
        //
        // Summary:
        //     PhoneNumber for the user
        public virtual string PhoneNumber { get; set; }
        //
        // Summary:
        //     True if the phone number is confirmed, default is false
        public virtual bool PhoneNumberConfirmed { get; set; }
        //
        // Summary:
        //     Navigation property for user roles
        public virtual ICollection<TRole> Roles { get; }
        //
        // Summary:
        //     A random value that should change whenever a users credentials have changed (password
        //     changed, login removed)
        public virtual string SecurityStamp { get; set; }
        //
        // Summary:
        //     Is two factor enabled for the user
        public virtual bool TwoFactorEnabled { get; set; }
        //
        // Summary:
        //     User name
        public virtual string UserName { get; set; }
    }
    public class IdentityUser : IdentityUser<string, IdentityUserLogin, IdentityUserRole, IdentityUserClaim>, IUser, IUser<string>
    {
        //
        // Summary:
        //     Constructor which creates a new Guid for the Id
        public IdentityUser() { }
        //
        // Summary:
        //     Constructor that takes a userName
        //
        // Parameters:
        //   userName:
        public IdentityUser(string userName) { }
    }
    #endregion
}
