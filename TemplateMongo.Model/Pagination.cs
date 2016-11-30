using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    public class Pagination
    {
        private int _actualPage;

        /// <summary>
        /// Página atual de registros
        /// </summary>
        public int ActualPage
        {
            get
            {
                if (this._actualPage == 0)
                    return 1;
                else
                    return _actualPage;
            }
            set
            {
                this._actualPage = value;
            }
        }

        public int TotalLinks { get; set; }
        public int TotalRecords { get; set; }
        public string Command { get; set; }

        private int _totalShownRecords;
        public int TotalShownRecords
        {
            get
            {
                if (this._totalShownRecords == 0)
                    return 10;
                else
                    return this._totalShownRecords;
            }
            set { this._totalShownRecords = value; }
        }
    }
}
