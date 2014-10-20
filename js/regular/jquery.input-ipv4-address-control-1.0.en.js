/*
 * jQuery Input Ip Address Control : v1.0 (2014/09/21)
 * www.sepna.ir
 * https://github.com/sepnair/jquery-ipv4-text-input
 * info@sepna.ir
 * Licensed under the Apache license V2.0.
 * Author: Mahdi.Saberi.gmail.com
 */
(function ($) {
	ip_could_not_be_zero = 'First part could not be 0!';
	no_section_could_not_be_null = 'No part could not leave blank';
	wrong_ip = 'Wrong ip address';
	limit_between_0_255 = 'Number should be between 0 and 255';
    $.fn.getCursorPosition = function () {
        var input = this.get(0);
        if (!input) return; // No (input) element found
        if ('selectionStart' in input) {
            // Standard-compliant browsers
            return input.selectionStart;
        } else if (document.selection) {
            // IE
            input.focus();
            var sel = document.selection.createRange();
            var selLen = document.selection.createRange().text.length;
            sel.moveStart('character', -input.value.length);
            return sel.text.length - selLen;
        }
    }
    $.fn.setCursorPosition = function (position) {
        if (this.length == 0) return this;
        return $(this).setSelection(position, position);
    }

    $.fn.setSelection = function (selectionStart, selectionEnd) {
        if (this.length == 0) return this;
        input = this[0];

        if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        } else if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        }

        return this;
    }

    $.fn.focusEnd = function () {
        this.setCursorPosition(this.val().length);
        return this;
    }


paste = false;

    function IPV4() {
        $('.IPV4:not([ipv4])').each(function () {
            var ipv = ['', '', '', ''];
            if ($(this).val() != '') {
                a_ipv = $(this).val().split('.');
                if (a_ipv.length > 0)
                    $.each(a_ipv, function (i, v) {
                        ipv[i] = v;
                    });
            }
            var ip1 = $('<input/>', { class: 'ip1 ipv4', type: 'text', value: ipv[0] });
            var ip2 = $('<input/>', { class: 'ip2 ipv4', type: 'text', value: ipv[1] });
            var ip3 = $('<input/>', { class: 'ip3 ipv4', type: 'text', value: ipv[2] });
            var ip4 = $('<input/>', { class: 'ip4 ipv4', type: 'text', value: ipv[3] });

            var container = $('<span />', { class: 'ipv4-container' });
            container.append(ip1).append($('<span />', { text: '.' })).append(ip2).append($('<span />', { text: '.' })).append(ip3).append($('<span />', { text: '.' })).append(ip4);
            $(this).before(container).hide();
            $(this).attr('ipv4', 'true');
        });
    }

    $.fn.IPV4 = IPV4;
    /*
    
            $(document).delegate('.ip4','focusout',function(e){
                if($(this).val() == '') {
                    alert(no_section_could_not_be_null);
                    var element = $(this);
                    setTimeout(function(){
                        element.focus();
                    },100);
                }
            });*/

    $(document).delegate('.ipv4', 'focus', function (e) {
        if ($(this).hasClass('ip2') || $(this).hasClass('ip3') || $(this).hasClass('ip4')) {
            if ($(this).parent().find('.ip1').val() == '0' || $(this).parent().find('.ip1').val() == '00' || $(this).parent().find('.ip1').val() == '000') {
                $(this).parent().find('.ip1').focus();
                alert(ip_could_not_be_zero);
            }
        }
        /*
                    if($(this).hasClass('ip2') && $(this).parent().find('.ip1').val() == '') {
                        $(this).parent().find('.ip1').focus();
                        alert(no_section_could_not_be_null);
                    }
                    else if($(this).hasClass('ip3')  && $(this).parent().find('.ip2').val() == '') {
                        $(this).parent().find('.ip2').focus();
                        alert(no_section_could_not_be_null);
                    }
                    else if($(this).hasClass('ip4')  && $(this).parent().find('.ip3').val() == '') {
                        $(this).parent().find('.ip3').focus();
                        alert(no_section_could_not_be_null);
                    }
        */
    });

    $(document).delegate('.ipv4', 'keydown', function (e) {
        if (e.keyCode == 37) {
            if ($(this).getCursorPosition() == 0)
                if (!$(this).hasClass('ip1')) {
                    if ($(this).hasClass('ip4')) $(this).parent().find('.ip3').focus();
                    if ($(this).hasClass('ip3')) $(this).parent().find('.ip2').focus();
                    if ($(this).hasClass('ip2')) $(this).parent().find('.ip1').focus();
                    return;
                }
        }
        else if (e.keyCode == 39) {
            if ($(this).val().length == $(this).getCursorPosition())
                if (!$(this).hasClass('ip4')) {
                    if ($(this).hasClass('ip1')) $(this).parent().find('.ip2').focus();
                    if ($(this).hasClass('ip2')) $(this).parent().find('.ip3').focus();
                    if ($(this).hasClass('ip3')) $(this).parent().find('.ip4').focus();
                }

        }
        if (parseInt($(this).val()) > 255 || parseInt($(this).val()) < 0) {
            $(this).val('255');
            alert(limit_between_0_255);
        }
    });

    $(document).delegate('.ipv4', 'keyup', function (e) {
        if (e.keyCode == 8 && $(this).val() == '') {
            if (!$(this).hasClass('ip1')) {
                if ($(this).hasClass('ip4')) $(this).parent().find('.ip3').focus();
                if ($(this).hasClass('ip3')) $(this).parent().find('.ip2').focus();
                if ($(this).hasClass('ip2')) $(this).parent().find('.ip1').focus();
            }
        }
        if (paste)
            return;
        $(this).val($(this).val().replace('.', ''));
        $(this).val(parseInt($(this).val()).toString());
        if (!$.isNumeric($(this).val())) {
            $(this).val($(this).val().replace(/\D+$/, ''));
            return;
        }
        if (parseInt($(this).val()) > 255 || parseInt($(this).val()) < 0) {
            $(this).val('255');
        }
        if ((e.keyCode != 37 && e.keyCode != 39 && e.keyCode != 8) && (e.keyCode == 0 || e.keyCode == 32 || e.keyCode == 110 || e.keyCode == 190 || $(this).val().length == 3)) {
            $(this).val($(this).val().trim());
            if (!$(this).hasClass('ip4')) {
                if ($(this).hasClass('ip1')) $(this).parent().find('.ip2').focus();
                if ($(this).hasClass('ip2')) $(this).parent().find('.ip3').focus();
                if ($(this).hasClass('ip3')) $(this).parent().find('.ip4').focus();
            }
        }

        $(this).parent().next().val($(this).parent().find('.ip1').val() + '.' + $(this).parent().find('.ip2').val() + '.' + $(this).parent().find('.ip3').val() + '.' + $(this).parent().find('.ip4').val());
    });

    $(document).delegate('.ipv4', 'paste', function (e) {
        paste = true;
        e.stopPropagation();
        var element = $(this);
        setTimeout(function () {
            var ipv4 = $(element).val();
            if (ipv4.split('.').length == 4) {
                ipv4 = ipv4.split('.');
                $(element).parent().find('.ip1').val(ipv4[0]);
                $(element).parent().find('.ip2').val(ipv4[1]);
                $(element).parent().find('.ip3').val(ipv4[2]);
                $(element).parent().find('.ip4').val(ipv4[3]);
            }
            else if (ipv4.split('.').length >= 1) {
                $(element).val('');
                alert(wrong_ip);
            }
            paste = false;
            $(element).parent().next().val($(element).parent().find('.ip1').val() + '.' + $(element).parent().find('.ip2').val() + '.' + $(element).parent().find('.ip3').val() + '.' + $(element).parent().find('.ip4').val());

        }, 100);
    });

    $(document).ready(function () {
        IPV4();
    });
})(jQuery);
