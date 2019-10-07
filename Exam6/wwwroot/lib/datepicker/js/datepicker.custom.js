$.fn.datepicker.defaults.format = "dd/mm/yyyy";
$.fn.datepicker.defaults.language = "pt-BR";
$.fn.datepicker.defaults.todayBtn = "linked";
$.fn.datepicker.defaults.forceParse = true;
$.fn.datepicker.defaults.keyboardNavigation = true;
$.fn.datepicker.defaults.autoclose = false;
$.fn.datepicker.defaults.changeMonth = true;
$.fn.datepicker.defaults.changeYear = true;
$.fn.datepicker.defaults.assumeNearbyYear = true;
$.fn.datepicker.defaults.todayHighlight = true;
$.fn.datepicker.defaults.immediateUpdates = true;
$.fn.datepicker.defaults.disableEntry = false;
$.fn.datepicker.defaults.ignoreReadonly = true;
$.fn.datepicker.defaults.updateViewDate = true;


var __picker = $.fn.datepicker;

$.fn.datepicker = function (options) {
    if (!options) {
        options = {};
    }

    if (typeof options === 'object') {

        for (var i = 0; i < this.length; i++) {
            var currentItem = $(this[i]);
            var currentOptions = options;

            var modal = currentItem.closest('.modal');
            if (modal.length) {
                currentOptions.container = modal;
            } else {
                currentOptions.container = '#wrapper';
            }

            __picker.apply(currentItem, [currentOptions]);
            var $self = currentItem;
            $self.mask("99/99/9999",
                    {
                        onComplete: function() {
                            document.getElementById("hide-content").className -= "hide";
                        }
                    });

            currentItem.data("datepicker-initialized", true);

            currentOptions.container = "#wrapper";
        }
    } else {
        for (var i2 = 0; i2 < this.length; i2++) {
            var currentItem2 = $(this[i2]);
            var args = Array.apply(null, arguments);
            args.shift();
            var $this = $(currentItem2);
            var data = $this.data('datepicker');
            data[options].apply(data, args);
        }
    }
}

