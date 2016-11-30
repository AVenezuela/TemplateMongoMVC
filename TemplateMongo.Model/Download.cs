using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TemplateMongo.Model
{
    public class Download
    {
        /// <summary>
        /// Caminho físico completo do arquivo
        /// </summary>
        public string caminhoArquivo { get; set; }

        /// <summary>
        /// Nome completo do arquivo com a extensão (ex.: Arquivo.ext)
        /// </summary>
        public string NomeArquivo { get; set; }

        /// <summary>
        /// Se o arquivo estiver no mesmo local físico da aplicação, setar para true
        /// Se for true o caminhoArquivo deve ser apenas o nome do diretório
        /// </summary>
        public bool isInApp { get; set; }
    }
}
