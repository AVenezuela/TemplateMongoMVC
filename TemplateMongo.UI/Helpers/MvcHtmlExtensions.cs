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

namespace System.Web.Mvc.Html
{
    public static class MvcHtmlExtensions
    {
        #region Constants
        private const string COMMON_PATH_EDITOR = "~/Views/Shared/EditorTemplates/";
        #endregion

        #region Form Control
        /// <summary>
        /// Gera um input text com label com a classe form-control pronta
        /// </summary>        
        public static MvcHtmlString FormControl<TModel, TProperty>(
            this HtmlHelper<TModel> helper,
            Expression<Func<TModel, TProperty>> expression, int colSize, bool hasLabel = true
            , IDictionary<string, object> htmlAttributes = null, string infoToolTip = "", string forceName = "")
        {

            if (!object.ReferenceEquals(helper, null))
            {
                //string htmlAtts = String.Empty;
                string classAppend = String.Empty;

                IDictionary<string, object> atts = new Dictionary<string, object> { };

                if (htmlAttributes != null)
                {
                    foreach (KeyValuePair<string, object> entry in htmlAttributes)
                    {
                        if (entry.Key.ToString().Trim().ToLower() == "class")
                        {
                            classAppend += String.Format(" {0}", entry.Value);
                        }
                        else
                        {
                            atts.Add(entry.Key, entry.Value);
                        }
                    }
                }

                atts.Add("class", String.Format("form-control input-xs {0}", classAppend));

                String input = helper.TextBoxFor(expression, atts).ToHtmlString();


                if ((!String.IsNullOrEmpty(infoToolTip)))
                {
                    TagBuilder span = new TagBuilder("span");
                    span.Attributes.Add("class", "glyphicon glyphicon-info-sign");
                    span.Attributes.Add("title", infoToolTip);

                    infoToolTip = span.ToString();
                }

                TagBuilder div = new TagBuilder("div");
                div.Attributes.Add("class", String.Format("form-group col-md-{0}", colSize));
                if (hasLabel)
                {
                    string label = helper.LabelFor(expression).ToHtmlString();
                    if ((!String.IsNullOrEmpty(infoToolTip)))
                    {
                        label = label.Replace("</label>", String.Format("{0}</label>", infoToolTip));
                    }
                    div.InnerHtml = label;
                }
                div.InnerHtml += input;

                return new MvcHtmlString(div.ToString());
            }
            return new MvcHtmlString(string.Empty);
        }
        #endregion

        #region EditFor List
        /// <summary>
        /// Gera o template de uma lista de objetos
        /// </summary>
        /// <typeparam name="TModel">Não informar. Modelo do template</typeparam>
        /// <typeparam name="TValue">Não informar. Valor</typeparam>
        /// <param name="html">Não informar. Classe htmlhelper</param>
        /// <param name="expression">Funcao do modelo com o valor</param>
        /// <param name="htmlFieldName">Nome que o campo sai na tela</param>
        /// <param name="parentField">Nome do campo do valor pai</param>
        /// <param name="hasIndex">Possui indexador?</param>
        /// <returns>Template dos objetos</returns>
        public static MvcHtmlString EditForList<TModel, TValue>(
                this HtmlHelper<TModel> html,
                Expression<Func<TModel, IEnumerable<TValue>>> expression,
                string htmlFieldName = null, string parentField = null, bool hasIndex = true) where TModel : class
        {

            if (!object.ReferenceEquals(html, null))
            {
                if (!object.ReferenceEquals(expression, null))
                {
                    var items = expression.Compile()(html.ViewData.Model);
                    var sb = new StringBuilder();

                    if (String.IsNullOrEmpty(htmlFieldName))
                    {
                        var prefix = html.ViewContext.ViewData.TemplateInfo.HtmlFieldPrefix;
                        htmlFieldName = (prefix.Length > 0 ? (prefix + ".") : String.Empty) + ExpressionHelper.GetExpressionText(expression);
                    }

                    if (items != null)
                    {
                        foreach (var item in items)
                        {
                            var dummy = new { Item = item };
                            var guid = Guid.NewGuid().ToString();

                            if (hasIndex)
                                item.GetType().GetProperty("Identity").SetValue(item, guid, null);

                            //se a chave do item pai for informada, troca no fieldname
                            if (!String.IsNullOrEmpty(parentField))
                            {
                                var parentKey = dummy.Item.GetType().GetProperty(parentField).GetValue(dummy.Item, null);
                                htmlFieldName = String.Format(htmlFieldName, parentKey);
                            }

                            var memberExp = Expression.MakeMemberAccess(Expression.Constant(dummy), dummy.GetType().GetProperty("Item"));

                            var singleItemExp = Expression.Lambda<Func<TModel, TValue>>(memberExp, expression.Parameters);

                            sb.Append(html.EditorFor(singleItemExp, null, String.Format("{0}[{1}]", htmlFieldName, guid)).ToHtmlString());

                        }
                    }
                    return new MvcHtmlString(sb.ToString());
                }
            }
            return new MvcHtmlString(string.Empty);
        }
        #endregion

        #region Add Component
        public static MvcHtmlString AddComponentFor<TModel, TValue>(
               this HtmlHelper<TModel> helper,
               Expression<Func<TModel, TValue>> addModelExpression,
               Expression<Func<TModel, IEnumerable<TValue>>> modelExpressionList,
               string partialListName,
               string addButtonID = null,
               string containerListID = null,
               ButtonOptions buttonOptions = null) where TValue : new()
        {
            if (!object.ReferenceEquals(helper, null))
            {
                TValue model = new TValue();
                string modelName = model.GetType().Name;
                string addTemplateName = String.Format("{0}{1}{2}.cshtml", COMMON_PATH_EDITOR, "Add", modelName);
                StringBuilder addTemplate = new StringBuilder(string.Empty);
                string temp = string.Empty;
                string htmlFieldPrefix = ExpressionHelper.GetExpressionText(addModelExpression);
                string htmlFieldPrefixControls = htmlFieldPrefix.Replace(".", String.Empty);
                string _containerListID = containerListID ?? String.Format("lst{0}", htmlFieldPrefixControls);
                string _addButtonID = addButtonID ?? String.Format("btnAdd{0}", htmlFieldPrefixControls);
                string _addWrapperID = String.Format("lblAdd{0}", htmlFieldPrefixControls);

                ViewDataDictionary viewData = new ViewDataDictionary()
                {
                    { "addButtonID", _addButtonID },
                    { "addWrapperID", _addWrapperID }
                };
                viewData.TemplateInfo = new TemplateInfo() { HtmlFieldPrefix = htmlFieldPrefix };


                //verifica se existe view específica de inserção de acordo com o nome do tipo do model
                if (ViewExistis(helper, addTemplateName))
                {
                    temp = helper.Partial(addTemplateName, model, viewData).ToHtmlString();
                }
                else
                {
                    temp = helper.EditorFor(addModelExpression, viewData).ToHtmlString();
                }

                //if (!object.ReferenceEquals(buttonOptions, null))
                //{
                //    #region Add Button
                //    TagBuilder button = new TagBuilder(buttonOptions.TagName);
                //    button.Attributes.Add("id", buttonOptions.ID);
                //    button.Attributes.Add("class", buttonOptions.ClassName);
                //    button.MergeAttributes<string, object>(buttonOptions.buttonAttributes, false);
                //    #endregion

                //    #region Button Container
                //    TagBuilder container = new TagBuilder(buttonOptions.containerTagName);
                //    container.Attributes.Add("class", buttonOptions.containerButtonClassName);
                //    container.MergeAttributes<string, object>(buttonOptions.containerButtonAttributes, false);
                //    container.InnerHtml = button.ToString();
                //    #endregion

                //    string positionMark = (buttonOptions.Position == ButtonInsertPosition.After) ? "{0}{1}" : "{1}{0}";
                //    temp = String.Format(positionMark, temp, container.ToString());
                //}

                addTemplate.Append(temp);

                htmlFieldPrefix = ExpressionHelper.GetExpressionText(modelExpressionList);
                viewData = new ViewDataDictionary() { { "containerListID", _containerListID } };
                viewData.TemplateInfo = new TemplateInfo() { HtmlFieldPrefix = htmlFieldPrefix };

                IEnumerable<TValue> items = modelExpressionList.Compile()(helper.ViewData.Model);
                if (!ReferenceEquals(items, null))
                    addTemplate.Append(helper.Partial(partialListName, items, viewData).ToHtmlString());

                return new MvcHtmlString(addTemplate.ToString());
            }
            return MvcHtmlString.Empty;
        }
        #endregion

        #region Render Add PartialView
        public static MvcHtmlString RenderAddPartialView<TModel, TValue>(
               this HtmlHelper<TModel> helper,
               Expression<Func<TModel, TValue>> expression) where TValue : new()
        {
            if (!object.ReferenceEquals(helper, null))
            {
                TValue model = new TValue();
                string modelName = model.GetType().Name;
                string addTemplateName = String.Format("{0}{1}{2}.cshtml", COMMON_PATH_EDITOR, modelName, "Add");
                StringBuilder addTemplate = new StringBuilder(string.Empty);
                string temp = string.Empty;

                //verifica se existe view específica de inserção de acordo com o nome do tipo do model
                if (ViewExistis(helper, addTemplateName))
                {
                    addTemplate.Append(helper.Partial(addTemplateName, model).ToHtmlString());
                }
                else
                {
                    addTemplate.Append(helper.EditorFor(expression).ToHtmlString());
                }

                return new MvcHtmlString(addTemplate.ToString());
            }
            return MvcHtmlString.Empty;
        }
        #endregion

        #region Util
        public static bool ViewExistis<TModel>(HtmlHelper<TModel> helper, string name)
        {
            ViewEngineResult result = ViewEngines.Engines.FindPartialView(helper.ViewContext.Controller.ControllerContext, name);
            return (!object.ReferenceEquals(result.View, null));
        }

        private static string getNamePropertyFromString<TModel, TProperty>(HtmlHelper<TModel> helper,
            Expression<Func<TModel, TProperty>> expression)
        {
            String editor = helper.EditorFor(expression).ToHtmlString();
            Regex check = new Regex("name=\"([^\"]*)\"");
            MatchCollection matchs = check.Matches(editor);

            if (check.IsMatch(editor))
            {
                return matchs[0].Groups[1].ToString();
            }
            return string.Empty;
        }
        #endregion

        #region Collection Item
        private const string IdsToReuseKey = "__htmlPrefixScopeExtensions_IdsToReuse_";

        public static IDisposable BeginCollectionItem(this HtmlHelper html, string collectionName)
        {
            return BeginCollectionItem(html, collectionName, html.ViewContext.Writer);
        }

        public static IDisposable BeginCollectionItem(this HtmlHelper html, string collectionName, TextWriter writer)
        {
            var idsToReuse = GetIdsToReuse(html.ViewContext.HttpContext, collectionName);
            var itemIndex = idsToReuse.Count > 0 ? idsToReuse.Dequeue() : Guid.NewGuid().ToString();

            // autocomplete="off" is needed to work around a very annoying Chrome behaviour
            // whereby it reuses old values after the user clicks "Back", which causes the
            // xyz.index and xyz[...] values to get out of sync.
            TagBuilder input = new TagBuilder("input");
            input.Attributes.Add("type", "hidden");
            input.Attributes.Add("name", String.Format("{0}.Index", collectionName));
            input.Attributes.Add("autocomplete", "off");
            input.Attributes.Add("value", html.Encode(itemIndex));
            writer.WriteLine(input.ToString());

            return BeginHtmlFieldPrefixScope(html, string.Format("{0}[{1}]", collectionName, itemIndex));
        }

        public static IDisposable BeginHtmlFieldPrefixScope(this HtmlHelper html, string htmlFieldPrefix)
        {
            return new HtmlFieldPrefixScope(html.ViewData.TemplateInfo, htmlFieldPrefix);
        }

        private static Queue<string> GetIdsToReuse(HttpContextBase httpContext, string collectionName)
        {
            // We need to use the same sequence of IDs following a server-side validation failure,
            // otherwise the framework won't render the validation error messages next to each item.
            var key = IdsToReuseKey + collectionName;
            var queue = (Queue<string>)httpContext.Items[key];
            if (queue == null)
            {
                httpContext.Items[key] = queue = new Queue<string>();
                var previouslyUsedIds = httpContext.Request[collectionName + ".Index"];
                if (!string.IsNullOrEmpty(previouslyUsedIds))
                    foreach (var previouslyUsedId in previouslyUsedIds.Split(','))
                        queue.Enqueue(previouslyUsedId);
            }
            return queue;
        }

        internal class HtmlFieldPrefixScope : IDisposable
        {
            internal readonly TemplateInfo TemplateInfo;
            internal readonly string PreviousHtmlFieldPrefix;

            public HtmlFieldPrefixScope(TemplateInfo templateInfo, string htmlFieldPrefix)
            {
                TemplateInfo = templateInfo;

                PreviousHtmlFieldPrefix = TemplateInfo.HtmlFieldPrefix;
                TemplateInfo.HtmlFieldPrefix = htmlFieldPrefix;
            }

            public void Dispose()
            {
                TemplateInfo.HtmlFieldPrefix = PreviousHtmlFieldPrefix;
            }
        }
        #endregion

        #region Add Hidden Field For Mongo ID
        public static MvcHtmlString AddHiddenForMongoID<TModel, TValue>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TValue>> expression)
        {
            if (!ReferenceEquals(helper, null))
            {
                TagBuilder input = new TagBuilder("input");
                input.Attributes.Add("type", "hidden");
                input.Attributes.Add("name", getNamePropertyFromString(helper, expression));
                input.Attributes.Add("autocomplete", "off");

                string valor = expression.Compile()(helper.ViewData.Model)?.ToString();
                input.Attributes.Add("value", valor?.ToString());

                return MvcHtmlString.Create(input.ToString());
            }
            return MvcHtmlString.Empty;
        }
        #endregion

        #region Components Pagination
        public static MvcHtmlString PagerEditor<TModel>(this HtmlHelper<TModel> helper)
        {
            if (!ReferenceEquals(helper, null))
            {
                BaseViewModel _base = helper.ViewData.Model as BaseViewModel;
                if (!ReferenceEquals(_base, null))
                {
                    Pagination pagination = _base.PaginationBag;
                    if (pagination.TotalRecords <= 0) return MvcHtmlString.Empty;

                    int totalPages = (int)Math.Ceiling(pagination.TotalRecords / (double)pagination.TotalShownRecords);
                    int lastPage = (int)Math.Ceiling(pagination.ActualPage / (double)pagination.TotalLinks) * pagination.TotalLinks;
                    int firstPage = (lastPage - (pagination.TotalLinks - 1));

                    bool hasPreviousPage = (pagination.ActualPage > 1);
                    bool hasNextPage = (pagination.ActualPage < totalPages);

                    if (lastPage > totalPages) lastPage = totalPages;

                    TagBuilder ul = new TagBuilder("div");
                    ul.AddCssClass("pagination");
                    ul.AddCssClass("btn-group");
                    ul.Attributes.Add("data-toggle", "pagination");

                    ul.InnerHtml += AddLink(1, (pagination.ActualPage == 1), "disabled", "«", "Primeira").ToString();
                    ul.InnerHtml += AddLink((pagination.ActualPage - 1), (!hasPreviousPage), "disabled", "<", "Anterior").ToString();

                    for (int counter = firstPage; counter < lastPage; counter++)
                    {
                        ul.InnerHtml += AddLink(counter, (counter == pagination.ActualPage), "active", counter.ToString(), counter.ToString()).ToString();
                    }

                    ul.InnerHtml += AddLink((pagination.ActualPage + 1), (!hasNextPage), "disabled", ">", "Próxima").ToString();
                    ul.InnerHtml += AddLink(totalPages, (pagination.ActualPage == totalPages), "disabled", "»", "Última").ToString();

                    ViewDataDictionary viewData = new ViewDataDictionary(helper.ViewData);
                    viewData.TemplateInfo = new TemplateInfo() { HtmlFieldPrefix = "PaginationBag" };
                    string paginacaoEdit = helper.Partial("_Pagination", pagination, viewData).ToHtmlString();

                    StringBuilder sb = new StringBuilder();
                    if (totalPages > 1)
                    {
                        sb.Append(ul.ToString());
                    }

                    sb.Append(paginacaoEdit);

                    return MvcHtmlString.Create(sb.ToString());
                }
            }

            return MvcHtmlString.Create(String.Empty);
        }

        private static TagBuilder AddLink(int index, bool condition, string classToAdd, string linkText, string tooltip)
        {
            TagBuilder btn = new TagBuilder("button");
            btn.Attributes.Add("type", "submit");
            btn.MergeAttribute("title", tooltip);
            if (condition)
            {
                btn.AddCssClass(classToAdd);
                btn.Attributes.Add(classToAdd, classToAdd);
            }
            btn.AddCssClass("btn btn-default");
            btn.Attributes.Add("value", index.ToString());
            btn.Attributes.Add("name", "PaginationBag.ActualPage");

            TagBuilder span = new TagBuilder("span");
            span.AddCssClass("min");
            span.InnerHtml = linkText;

            btn.InnerHtml = span.ToString();

            return btn;
        }

        public static MvcHtmlString AddTotalRecordsCombo<TModel, TProperty>(this HtmlHelper<TModel> helper
            , Expression<Func<TModel, TProperty>> expression
            , int stepBy = 5)
        {
            IList<SelectListItem> items = new List<SelectListItem>();

            for (int i = 5; i <= 30; i += stepBy)
            {
                items.Add(new SelectListItem() { Text = i.ToString(), Value = i.ToString() });
            }
            SelectList selList = new SelectList(items, "Value", "Text");
            
            Dictionary<String, Object> attrs = new Dictionary<String, Object>();
            attrs.Add("name", "PaginationBag.TotalShownRecords");
            attrs.Add("id", "PaginationBag_TotalShownRecords");
            attrs.Add("class", "form-control input-xs");
            attrs.Add("data-toggle", "combopagination");
            attrs.Add("data-form", helper.ViewContext.FormContext.FormId);

            string combo = helper.DropDownListFor(expression, selList, attrs).ToHtmlString();

            return MvcHtmlString.Create(combo);
        }
        #endregion

        #region Filter Component
        public static MvcHtmlString AddFilter<TModel, TProperty>(this HtmlHelper<TModel> helper, string partialName, TProperty filterModel)
        {
            if(!ReferenceEquals(helper, null))
            {
                SearchTemplate filter = new SearchTemplate();
                filter.GuidID = Guid.NewGuid().ToString();
                filter.FormID = helper.ViewContext.FormContext.FormId;

                string searchTemplate = helper.Partial("_SearchTemplate", filter).ToHtmlString();
                ViewDataDictionary viewData = new ViewDataDictionary(helper.ViewData);
                viewData.TemplateInfo = new TemplateInfo() { HtmlFieldPrefix = String.Format("{0}Bag", filterModel.GetType().Name) };

                string modelTemplate = helper.Partial(partialName, filterModel, viewData).ToHtmlString();

                searchTemplate = String.Format(searchTemplate, modelTemplate);

                return MvcHtmlString.Create(searchTemplate);
            }
            return MvcHtmlString.Empty;
        }
        #endregion

        #region ActionLinkMenu
        /// <summary>
        /// Gera um input na tela com a classe form-control pronta
        /// </summary>        
        public static MvcHtmlString ActionLinkMenu(
            this HtmlHelper helper,
            String linkText, String actionName)
        {
            String link = helper.ActionLink("{0}" + linkText, actionName).ToHtmlString();
            return new MvcHtmlString(String.Format(link, "<div>&nbsp;</div>"));
        }
        #endregion
    }
}