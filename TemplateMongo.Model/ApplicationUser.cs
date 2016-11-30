using System;
using Microsoft.AspNet.Identity;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateMongo.Model
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, 
    //please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    
    public class ApplicationUser : Entity, IUser
    {
        public DateTime CreateDate { get; set; }        
        public string Email { get; set; }
        public string PasswordHash { get; set; }        

        [BsonIgnore]
        public string Id
        {
            get
            {
                return this.MongoID;
            }
        }

        public string UserName { get; set; }

        public ApplicationUser()
        {
            CreateDate = DateTime.Now;           
        }      
    }
 
}