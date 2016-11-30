/// <reference path="jquery.min.js" />
/// <reference path="jquery-x.js" />
/// <reference path="bootstrap.min.js" />
/*
VALIDACAO POR QUANTIDADE DE CHILDS DE UM ELEMENTO
adicionar ao elemento 
 "data-val" = "true" // informa que o elemento é obrigatorio
 "data-val-musthaschildin-elementtowatch" // id(s) do(s) elemento(s) a ser(erem) observado(s). usar virgula para mais de um elemento (ex: "lstTabela, lstLista")
 "data-val-musthaschildin"// mensagem a ser exibida na validação
*/
$.validator.addMethod("musthaschildin", function (value, element, params) {    
    var data = $(element).data('params');
    var elementsToWatch = data.param;
    var countChild = 0;
    $(elementsToWatch).each(function (index, value) {
        countChild += $('#' + value).children(':visible').length;
    });
    return (countChild > 0)
});
$.validator.unobtrusive.adapters.add("musthaschildin", ["elementtowatch"], function (options) {
    var arr = options.params.elementtowatch.split(',');
    var params = { "param": [] }
    $(arr).each(function (index, value) {
        params.param.push(value);
    });
    
    $(options.element).data('params', params);
    options.rules["musthaschildin"] = params; //"#" + options.params.elementtowatch;
    options.messages["musthaschildin"] = options.message;
});
/*FiM VALIDACAO POR QUANTIDADE DE CHILDS DE UM ELEMENTO*/

/*VALIDACAO POR PREENCHIMENTO, OU NÃO, DE OUTRO ELEMENTO 
adicionar ao elemento 
 "data-val" = "true" // informa que o elemento é obrigatorio
 "data-val-checkvalueof-elementtowatch" // id(s) do(s) elemento(s) a ser(erem) observado(s). usar virgula para mais de um elemento (ex: "lstTabela, lstLista")
 "data-val-checkvalueof-condition"
    regras:
        "isempty"   = apenas verifica se o objeto está vazio
        "isfill"    = apenas verifica se o objeto está preenchido
        "isvalid"   = verifica se o objeto está valido de acordo com suas regras
        "isinvalid" = verifica se o objeto está invalido de acordo com suas regras
 "data-val-checkvalueof"// mensagem a ser exibida na validação
*/
$.validator.addMethod("checkvalueof", function (value, element, params) {    
    var data = $(element).data('params');
    var elementToWatch = $('#' + data.param);
    var ret = false;
    switch (data.condition) {
        case "isempty":
            ret = ((elementToWatch.val() != "") || ($(element).val() != ""));
            break;
        case "isfill":
            ret = ((elementToWatch.val() == "") || ($(element).val() != ""));
            break;
        case "isvalid": 
            ret = (!elementToWatch.valid());
            break;
        case "isinvalid":
            ret = elementToWatch.valid();
            break;
        case "byvalue":
            ret = ((elementToWatch.val() == data.value) && ($(element).val() != ''));
            break;
        default:
            break;
    }

    return ret;
});
$.validator.unobtrusive.adapters.add("checkvalueof", ["elementtowatch", "condition", "value"], function (options) {    
    var params = { "param": null, "condition": null, "value": null }
    params.param = options.params.elementtowatch;
    params.condition = options.params.condition;
    params.value = options.params.value;
    $(options.element).data('params', params);
    options.rules["checkvalueof"] = params;
    options.messages["checkvalueof"] = options.message;
});
/*FIM VALIDACAO POR PREENCHIMENTO, OU NÃO, DE OUTRO ELEMENTO */

/*
VALIDACAO SE É HORARIO VALIDO
adicionar ao elemento 
"data-val" = "true" // informa que o elemento é obrigatorio
"data-val-istime"// mensagem a ser exibida na validação
*/
$.validator.addMethod("istime", function (value, element, params) {
    var val = $(element).val();
    var regex = /^([0-9]{2}):([0-9]{2})\s?(AM|PM)?/;

    return ((regex.exec(val)) !== null);
});
$.validator.unobtrusive.adapters.add("istime", function (options) {
    options.rules["istime"] = options.element;
    options.messages["istime"] = options.message;
});
/*FiM VALIDACAO POR QUANTIDADE DE CHILDS DE UM ELEMENTO*/
/*/^([0-9]{1,2})\s?:([0-9]{1,2})\s?([AM, PM]{2})?/*/

$.validator.addMethod("noSpace", function (value, element) {
    return value.indexOf(" ") < 0 && value != "";
}, "Campo contém espaços em branco.");