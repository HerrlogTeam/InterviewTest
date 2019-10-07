
var ConcurencyManagerInterface = null;

var submitFormManager = {
    ConcurencyManagerInterface: null,

    bindRequestWithValidation: function (optionalForm, url) {
        var temp = '#akrual-form'
        if (optionalForm != undefined) {
            temp = optionalForm;
        }

        $(temp).validate({
            rules: {
                //Nome: { required: true},
                //DataReferencia: { required: true},
                //Periodicidade: { required: true},
                //GrupoMonitoramentoId: { required: true}
            },
            messages: {
                //Nome: {required: "O campo nome é obrigatorio."},
                //DataReferencia: {required: "O campo nome é obrigatorio."},
                //Periodicidade: {required: "O campo nome é obrigatorio."},
                //GrupoMonitoramentoId: {required: "O campo nome é obrigatorio."},
            },
            submitHandler: function (form) {
                var swalInfo = {
                    Title: "Deseja editar este recurso?",
                    Text: "",
                    Type: "info"
                }
                sendRequest(form, this, swalInfo, url);
            }
        });
    },
}

function ThreatServerErrorsFromResponse(response, validator) {
    try {
        if (response.status === 400) {
            var errors = {};
            try {
                var objectreturned = jQuery.parseJSON(response.responseText);
                for (var input in objectreturned) {
                    if (objectreturned.hasOwnProperty(input)) {
                        console.log(input);
                        if (objectreturned[input].hasOwnProperty("Errors")) {
                            var errors1 = objectreturned[input].Errors;
                            for (var error in errors1) {
                                if (errors1.hasOwnProperty(error)) {
                                    console.log(error);
                                    errors[input] = errors1[error].ErrorMessage;
                                }
                            }
                        }
                        if (objectreturned[input].hasOwnProperty("ErrorNotifications")) {
                            var errorsNot1 = objectreturned[input].ErrorNotifications;
                            for (var errorNot in errorsNot1) {
                                if (errorsNot1.hasOwnProperty(errorNot)) {
                                    console.log(errorNot);
                                    var message = errorsNot1[errorNot].Notification;
                                    $('#notificationMessages').append(
                                        "<div class=\"alert alert-danger alert-dismissible\" role=\"alert\"> \
                                        <button type=\"button\" class=\"close\" data-dismiss=\"alert\"><span aria-hidden=\"true\">&times;</span><span class=\"sr-only\">Close</span></button> \
                                        <strong>Falha!</strong>" +
                                        message +
                                        " \
                                    </div>");
                                }
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            }

            validator.showErrors(errors);
            console.log(errors);
            swal("Ocorreu algum Problema", "Verifique se as informações estão corretas. Informações incorretas estam com o campo marcado em vermelho.", "error");
        } else {
            swal("Ocorreu algum Problema", "Verifique se as informações estão corretas", "error");
        }
    } catch (e) {
        console.log(e);
    }
}

function sendRequestWithoutSwal(form, validator, posturl, callback, callbackAlways, contentWarper, callbackData) {
    // remove old data
    if (contentWarper) {
        try {
            contentWarper.modal('hide');
        } catch (e) {
        }
        try {
            contentWarper.html('');
        } catch (e) {
        }
    }

    var $form = $(form);
    // let's select and cache all the fields
    //var $inputs = $form.find("input, select, textarea");
    var $enabledinputs = $form.find("input:enabled, select:enabled, button:enabled, textarea:enabled");

    var broadCastInfo = $form.find('*').not("[name='SocketConnectionId']").not("[name='__RequestVerificationToken']").not("[name='Id']");
    // serialize the data in the form
    var serializedData = $form.serialize();

    var serializeBroadData = broadCastInfo.serialize();

    // let's disable the inputs for the duration of the ajax request
    $enabledinputs.prop("disabled", true);

    $.ajax({
        url: posturl,
        type: "POST",
        data: serializedData,

    }).done(function (response) {
        incomingData = response;
        //Redirect
        if (ConcurencyManagerInterface != null) {
            ConcurencyManagerInterface.BroadcastThisResourceState(serializeBroadData);
        }

        console.log(incomingData.RouteLink);
        if (typeof incomingData.RouteLink != "undefined") {
            setTimeout(function () {
                window.location.replace(incomingData.RouteLink);
            }, 1000);
        }

        $enabledinputs.prop("disabled", false);

        // Call Callback
        if (callback && typeof (callback) === "function") {
            callback(response, callbackData);
        }
    })
        .fail(function (response) {
            ThreatServerErrorsFromResponse(response, validator);
        })
        .always(function (response) {
            if (response.hasOwnProperty("responseText")) {
                setTimeout(function () { swal("Ocorreu algum Problema", "Verifique se as informações estão corretas", "error") }, 300);
                console.log(response.responseText);
            }
            //console.log(response);
            $enabledinputs.prop("disabled", false);
            // Call Callback
            if (callbackAlways && typeof (callbackAlways) === "function") {
                callbackAlways(response, callbackData);
            }
        });
}


function sendRequest(form, validator, swalInfo, posturl, callback, callbackData, callbackAlways) {
    swal(
        {
            title: swalInfo.Title,
            text: swalInfo.Text,
            type: swalInfo.Type,
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },
        function ()
        {
            // setup some local variables
            var $form = $(form);
            // let's select and cache all the fields
            //var $inputs = $form.find("input, select, textarea");
            var $enabledinputs = $form.find("input:enabled, select:enabled, button:enabled, textarea:enabled");
            // serialize the data in the form

            var broadCastInfo = $form.find('*').not("[name='SocketConnectionId']").not("[name='__RequestVerificationToken']").not("[name='Id']");

            // serialize the data in the form
            var serializedData = $form.serialize();
            console.log(serializedData);

            try {
                var actionname = $form.find('[name="action"]').val();
                serializedData = serializedData + '&' + $.param({ 'action': actionname });
            } catch (e) {
                console.log(e);
            }

            //try {
            //	$form.find('input[type=checkbox]').each(function (id, item) {
            //		var $item = $(item);
            //		var checkboxname = $item.attr('name');
            //		var checkedvalue = $item.is(":checked")
            //		serializedData = serializedData + '&' + $.param({ checkboxname: checkedvalue });
            //	});
            //} catch (e) {
            //	console.log(e);
            //}

            var serializeBroadData = broadCastInfo.serialize();

            // let's disable the inputs for the duration of the ajax request
            $enabledinputs.prop("disabled", true);
            console.log(serializedData);
            //Fire the request
            $.ajax({
                url: posturl,
                type: "POST",
                data: serializedData
            }).done(function (response) {
                incomingData = response;

                //Redirect
                if (incomingData.Message === "Success") {
                    swal("Sucesso", "Operação Bem Sucedida", "success");

                    if (ConcurencyManagerInterface != null) {
                        ConcurencyManagerInterface.BroadcastThisResourceState(serializeBroadData);
                    }

                    console.log(incomingData.RouteLink);
                    if (typeof incomingData.RouteLink != "undefined") {
                        setTimeout(function () {
                            window.location.replace(incomingData.RouteLink);
                        }, 1000);
                    }
                } else {
                    // Call Callback
                    if (callback && typeof (callback) === "function") {
                        callback(response, callbackData);
                    } else {
                        swal("Ocorreu algum Problema", "Verifique se as informações estão corretas", "error");
                    }
                }
            }).fail(function (response) {
                ThreatServerErrorsFromResponse(response, validator);
            })
                .always(function (response) {
                    if (response.hasOwnProperty("responseText")) {
                        setTimeout(function () { swal("Ocorreu algum Problema", "Verifique se as informações estão corretas", "error") }, 300);
                        console.log(response.responseText);
                    }
                    $enabledinputs.prop("disabled", false);

                    // Call Callback
                    if (callbackAlways && typeof (callbackAlways) === "function") {
                        callbackAlways(response, callbackData);
                    }
                });
        });
}



function sendRequestFromData(data, swalInfo, posturl, callback, contentWarper, callbackData, callbackAlways, callbackError) {
    swal(
        {
            title: swalInfo.Title,
            text: swalInfo.Text,
            type: swalInfo.Type,
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim!",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },
        function () {
            // remove old data
            if (contentWarper) {
                try {
                    contentWarper.modal('hide');
                } catch (e) {
                    try {
                        contentWarper.html('');
                    } catch (e) {
                    }
                }
            }

            //Fire the request
            $.ajax({
                url: posturl,
                type: "POST",
                data: data
            }).done(function (response) {
                incomingData = response;

                if (incomingData.Message === "Success") {
                    swal("Sucesso", "Operação Bem Sucedida", "success");

                    //Redirect
                    if (typeof incomingData.RouteLink != "undefined") {
                        setTimeout(function () {
                            window.location.replace(incomingData.RouteLink);
                        }, 1000);
                    }

                    // Call Callback
                    if (callback && typeof (callback) === "function") {
                        callback(response, callbackData);
                    }
                } else {
                    swal("Ocorreu algum Problema", "Verifique se as informações estão corretas", "error");
                }
            }).fail(function (response) {
				var errorTreated = false;
                if (callbackError && typeof (callbackError) === "function") {
                    errorTreated = callbackError(response, callbackData);
                }
				if(errorTreated !== true){
                    swal("Ocorreu algum Problema", "Verifique se as informações estão corretas", "error");
                }
            }).always(function (response) {
                if (response.hasOwnProperty("responseText")) {
                    swal("Ocorreu algum Problema", "Verifique se as informações estão corretas", "error");
                    console.log(response.responseText);
                }
                // Call Callback
                if (callbackAlways && typeof (callbackAlways) === "function") {
                    callbackAlways(response, callbackData);
                }
            });
        });
}

function sendRequestFromDataWithoutSwal(data, posturl, callback, contentWarper, callbackData, callbackAlways, callbackError) {
    // remove old data
    if (contentWarper) {
        try {
            contentWarper.modal('hide');
        } catch (e) {
            try {
                contentWarper.html('');
            } catch (e) {
            }
        }
    }

    //Fire the request
    $.ajax({
        url: posturl,
        type: "POST",
        data: data
    }).done(function (response) {
        // Call Callback
        if (callback && typeof (callback) === "function") {
            callback(response, callbackData);
        }
    }).fail(function (response) {
        var errorTreated = false;

        if (callbackError && typeof (callbackError) === "function") {
            errorTreated = callbackError(response, callbackData);
        }
        if (errorTreated !== true) {
            swal("Ocorreu algum Problema", "Verifique se as informações estão corretas", "error");
        }
    }).always(function (response) {
        // Call Callback
        if (callbackAlways && typeof (callbackAlways) === "function") {
            callbackAlways(response, callbackData);
        }
    });
}
