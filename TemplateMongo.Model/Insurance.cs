using System;

namespace TemplateMongo.Model
{
    public class Insurance
    {
        public string Number { get; set; }
        public InsuranceCompany Company { get; set; }

        public Insurance()
        {
            this.Company = new InsuranceCompany();
        }
    }
}
