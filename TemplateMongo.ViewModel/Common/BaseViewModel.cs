using System.Collections.Generic;
using System.Text;
using System.Web.Mvc;
using TemplateMongo.Model;

namespace TemplateMongo.ViewModel.Common
{
    public enum TipoMensagem
    {
        Warning
        , Success
    }

    public class BaseViewModel
    {
        public const string PaginacaoCommand = "Paginacao";

        #region Propriedades
        private IDictionary<TipoMensagem, StringBuilder> _dicMessages;
        public bool HasMessage { get; set; }
        public bool HasSuccessMessage { get; set; }
        public bool HasWarningMessage { get; set; }
        public ModelStateDictionary ViewModelState { get; set; }
        public string Command { get; set; }
        public Pagination PaginationBag { get; set; }
        #endregion

        #region Metodos de Mensageria em View
        public BaseViewModel()
        {
            this.HasMessage = false;            
            this._dicMessages = new Dictionary<TipoMensagem, StringBuilder>();
        }

        public void AddSuccessMessage(string message)
        {
            this.AddMessage(TipoMensagem.Success, message);
            this.HasSuccessMessage = true;
        }

        public void AddWarningMessage(string message)
        {
            this.AddMessage(TipoMensagem.Warning, message);
            this.HasWarningMessage = true;
        }

        private void AddMessage(TipoMensagem tipo, string message)
        {
            this.HasMessage = (this.HasSuccessMessage || this.HasWarningMessage);
            if (!this._dicMessages.ContainsKey(tipo))
            {
                this._dicMessages.Add(tipo, (new StringBuilder()));
            }

            if (!string.IsNullOrEmpty(message))
            {
                ((StringBuilder)this._dicMessages[tipo]).AppendLine(message);
            }
        }

        public string getSuccessMessages()
        {
            return (this.HasSuccessMessage) ? this._dicMessages[TipoMensagem.Success].ToString() : string.Empty;
        }

        public string getWarningMessages()
        {
            return (this.HasWarningMessage) ? this._dicMessages[TipoMensagem.Warning].ToString() : string.Empty;
        }
        #endregion
    }
}
