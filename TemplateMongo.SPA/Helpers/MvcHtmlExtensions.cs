using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Helpers;
using System.Text.RegularExpressions;
using System.Collections;
using System.Collections.Generic;
using System;
using System.Text;
using System.IO;
using TemplateMongo.Model;
using TemplateMongo.Model.Helpers;
using TemplateMongo.ViewModel.Common;
using System.Web.Optimization;

namespace System.Web.Mvc.Html
{
    public static class MvcHtmlExtensions
    {
        #region :: GetJSPath ::
        public static MvcHtmlString oLazyLoadJS(this HtmlHelper helper)
        {
            return MvcHtmlString.Empty;
        }
        #endregion
    }
}