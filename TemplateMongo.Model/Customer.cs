using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using MongoDB.Bson.Serialization.Attributes;

namespace TemplateMongo.Model
{
    public class Customer : Entity
    {
        public string Name { get; set; }
        public string BirthDate { get; set; }
        public string Email { get; set; }
        public Document Document { get; set; }

        [BsonIgnore]
        public string PhonePrincipal
        {
            get
            {
                Phone phone = null;
                if (this.Phones.Count > 0)
                    phone = Phones.FirstOrDefault(_phone => _phone.isPrincipal == true);

                return phone?.Number;
            }
        }

        public IEnumerable<Insurance> Insurances { get; set; }
        public List<Phone> Phones { get; set; }
        public IEnumerable<Address> Addresses { get; set; }

        public Customer()
        {
            this.Addresses = new List<Address>();
            this.Phones = new List<Phone>();
            this.Insurances = new List<Insurance>();
        }
    }
}
