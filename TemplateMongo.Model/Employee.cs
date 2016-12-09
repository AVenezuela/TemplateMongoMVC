using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateMongo.Model
{
    public class Employee : Entity
    {
        [Display(Name = "Nome")]
        [Required]
        public string Name { get; set; }

        [Display(Name = "Nascimento")]
        [Required]
        public string BirthDate { get; set; }

        [Display(Name = "Gênero")]
        [Required]
        public string Gender { get; set; }

        [BsonIgnore]
        public string PhonePrincipal {
            get {
                Phone phone = null;
                if (this.Phones.Count > 0)
                    phone = Phones.FirstOrDefault(_phone => _phone.isPrincipal == true);

                return phone?.Number;
            } }

        [Required]
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        public Login Login { get; set; }

        public IList<Phone> Phones { get; set; }
        public IList<Address> Addresses { get; set; }
        public IList<Occupation> Occupations { get; set; }

        public Employee()
        {
            this.Phones = new List<Phone>();
            this.Addresses = new List<Address>();
            this.Occupations = new List<Occupation>();
            this.Login = new Model.Login();
        }
    }
}
