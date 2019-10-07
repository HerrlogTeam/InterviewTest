/*!
 * jQuery Validation Plugin v1.17.0
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2016 Ian
 */


$.validator.addMethod("Decimal_18_2", function (value, element) {
    // Allow decimals only.
    // Usual format here is x.xxx,xx
	return this.optional(element) || /^(((\+|\-)?0*[1-9](\d{1,2})?(?:\.\d{3}){0,5}(\,\d{1,2})?)|(0)?(\,\d{1,2}))$|(0)+$/.test(value);
}, 'Somente decimais são permitidos. <br /> \
    Separe os milhares com ponto e casas decimais com vírgula. <br /> \
    O campo permite de zero à duas casas decimais');

$.validator.addMethod("myDouble", function (value, element) {
    // Allow decimals only.
    // Usual format here is x.xxx,xx
    return this.optional(element) || /^(((\+|\-)?0*[1-9](\d{1,2})?(?:\.*\d{3}){0,3}(\,\d{1,20})?)|(0)?(\,\d{1,20}))$|(0)+$/.test(value);
}, 'Somente decimais são permitidos. <br /> \
    Separe os milhares com ponto e casas decimais com vírgula. <br /> \
    O campo permite de zero à quinze casas decimais');

$.validator.addMethod("myInt", function (value, element) {
    // Allow decimals only.
    return this.optional(element) ||  /-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
}, 'Por favor, inserir campo numérico.');


$.validator.addMethod("fullEmail", function (value, element) {
    // Allow full emails only.
    // Usual format here is xxx@xxx.xx.xx
    return this.optional(element) ||
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
}, 'Por favor, inserir Email Válido.');

//$.validator.addMethod("greaterThanZero", function (value, element) {
//    return this.optional(element) || (parseFloat(value) > 0);
//}, "Por Favor, inserir valor maior que 0.");

$.validator.addMethod("minStrict", function (value, element, param) {
    return this.optional(element) || parseFloat(value) > param;
}, function (param, element) {
    return 'Por Favor, inserir valor maior que ' + param;
});

$.validator.setDefaults({
    highlight: function (element) {
        $(element).closest('[class^=col]').addClass('has-error');
    },
    unhighlight: function (element) {
        $(element).closest('[class^=col]').removeClass('has-error');
    },
    errorElement: 'span',
    errorClass: 'help-block',
    errorPlacement: function (error, element) {
        if (element.parent('.form-group').length) {
            error.insertAfter(element.parent());
        }
        else if (element.parent('.input-group').length) {
            error.insertAfter(element.parent());
        }
        else if(element.hasClass("chosen-select")) {
            var id = element.attr('id');
            error.insertAfter("#" + id + "_chosen");
        }
        else {
            error.insertAfter(element);
        }
    },
    ignore: ":hidden:not(.chosen-select)"

});

$.validator.removeClassRules("number");


$.validator.methods.number = function(value, element) {
    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:[\s\.,]\d{3})+)(?:[\.,]\d+)?$/.test(value);
};


$.validator.methods.date = function (value, element) {
    return this.optional(element) || /^\d\d?\/\d\d?\/\d\d\d?\d?$/.test(value);
};