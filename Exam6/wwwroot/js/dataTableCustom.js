jQuery.fn.createDataTable = function (order, ignoreTextsOrder, callbackOnRedraw, deleteUrl, dataTableOptions) {
    if (typeof dataTableOptions === "undefined" || dataTableOptions == null) {

        var isFixedHeader = true;
        var isMobile = detectmob();
        console.log(isMobile);
        if (isMobile == true) {

            isFixedHeader = false;

        }

        dataTableOptions = {
            "lengthMenu": [[10, 25, -1], [10, 25, "All"]],
            "scrollX": true,
            "columnDefs": [
                { type: 'sort-numbers-ignore-text', targets: ignoreTextsOrder }
            ],
            "order": order,
            fixedHeader: isFixedHeader
        };
    }

    var table = this.DataTable(dataTableOptions);


    $(window).on("load resize scroll", function (e)
    {
        if (table != null) {
            table.fixedHeader.adjust();
        }
    });

    $('.dataTables_scrollBody').on('scroll',
        function (e) {
            table.fixedHeader.adjust();
        });

    $('.dataTables_scrollBody').floatingScrollbar();


    if (typeof callbackOnRedraw === "undefined" || callbackOnRedraw == null) {
        var that = this;
        this.on('draw.dt', function () {
            bindButton(deleteUrl,that);
        });
        bindButton(deleteUrl,that);
    }
    else if (callbackOnRedraw && typeof (callbackOnRedraw) === "function") {
        this.on('draw.dt', function () {
            callbackOnRedraw();
        });
        callbackOnRedraw();
    }
  
    return this; // This is needed so others can keep chaining off of this
};

function rowDeleted(response, callbackData) {
    callbackData.table.find('tr').each(function (index, element) {
        var rowid = $(element).attr('dataid');
        console.log(rowid);
        console.log("buscando: " + callbackData.userId + ", achei: " + rowid);
        if (rowid === callbackData.id) {
            console.log("match, vou deletar");
            element.remove();
        }
    });
}

function detectmob() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    }
    else {
        return false;
    }
}

function warnBeforeRedirect(id, deleteUrl, table) {
    var data = {};
    data.id = id;
    var swalInfo = {
        Title: "Confirma a Remoção?",
        Text: "Esta ação é irreversível.",
        Type: "warning"
    }
    
    var callbackData = {};
    callbackData.id = id;
    callbackData.table = table;

    sendRequestFromData(data, swalInfo, deleteUrl, rowDeleted, null, callbackData);
}

function bindButton(deleteUrl, table) {
    $('.confirmation').unbind();
    $('.confirmation').click(function (e) {
        e.preventDefault(); // Prevent the href from redirecting directly
        var eventId = $(this).attr("id");
        warnBeforeRedirect(eventId,deleteUrl,table);
    });
}
