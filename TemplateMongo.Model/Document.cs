using System;

namespace TemplateMongo.Model
{
    public class Document : Entity
    {
        public string Number { get; set; }

        public DocumentType Type { get; set; }
    }
}
