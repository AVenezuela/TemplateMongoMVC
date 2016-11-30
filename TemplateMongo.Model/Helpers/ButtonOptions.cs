using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TemplateMongo.Model.Helpers
{
    public enum ButtonInsertPosition
    {
        After,
        Before
    }

    public class ButtonOptions
    {
        public string ID { get; set; }
        public string ClassName { get; set; }
        public string TagName { get; set; }
        public ButtonInsertPosition Position { get; set; }
        public IDictionary<string, object> buttonAttributes { get; set; }

        public string containerTagName { get; set; }
        public string containerButtonClassName { get; set; }
        public IDictionary<string, object> containerButtonAttributes { get; set; }

        public ButtonOptions()
        {
            this.Position = ButtonInsertPosition.After;
        }
    }
}
