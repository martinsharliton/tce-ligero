"use strict";
var Core = Core || {};
var titulo = document.querySelector('#Login>h2');

Core.Customer = Core.Customer || {};
Core.Customer.Login = (function (TargetNS) {
    titulo.innerHTML = '<i class="fas fa-exclamation-circle" style="color: #fab633"></i> Utilize o mesmo usuário e senha do computador';
    if (!Core.Debug.CheckDependency('Core.Customer.Login', 'Core.UI', 'Core.UI')) {
        return false;
    }

    function ToggleLabel(PopulatedInput) {
        var $PopulatedInput = $(PopulatedInput),
            $Label = $PopulatedInput.prev('label');
        if ($PopulatedInput.val() !== "" || $PopulatedInput[0] === document.activeElement) {
            $Label.hide();
        } else {
            $Label.show();
        }
    }
    TargetNS.Init = function () {
        var $Inputs = $('input:not(:checked, :hidden, :radio)'),
            $LocalInputs, Location, Now = new Date(),
            Diff = Now.getTimezoneOffset(),
            $Label, $SliderNavigationLinks = $('#Slider a'),
            LoginFailed = Core.Config.Get('LoginFailed'),
            SignupError = Core.Config.Get('SignupError');
        if (!Core.Customer.SupportedBrowser) {
            $('#Login').hide();
            $('#Reset').hide();
            $('#Signup').hide();
            $('#PreLogin').hide();
            $('#OldBrowser').show();
            return false;
        }
        Core.Form.EnableForm($('#Login form, #Reset form, #Signup form'));
        $('#TimeZoneOffset').val(Diff);
        if ($('#PreLogin').length) {
            $('#PreLogin form').submit();
            return false;
        }
        $Inputs
            .focus(function () {
                $Label = $(this).prev('label');
                $(this).prev('label').addClass('Focused');
                if ($(this).val()) {
                    $Label.hide();
                }
            })
            .on('keyup change', function () {
                ToggleLabel(this);
            })
            .blur(function () {
                $Label = $(this).prev('label');
                if (!$(this).val()) {
                    $Label.show();
                }
                $Label.removeClass('Focused');
            });
        $('#User').blur(function () {
            if ($(this).val()) {
                $('#ResetUser').val('').prev('label').hide();
            }
        });
        window.setInterval(function () {
            $.each($Inputs, function (Index, Input) {
                if ($(Input).val()) {
                    ToggleLabel(Input);
                }
            });
        }, 250);
        $('#User').blur(function () {
            if ($(this).val()) {
                $('#ResetUser').val($(this).val()).prev('label').hide();
            }
        });
        Location = '#Login';
        if (document.location.toString().match('#')) {
            Location = '#' + document.location.toString().split('#')[1];
        }
        $LocalInputs = $(Location).find('input:not(:checked, :hidden, :radio)');
        $LocalInputs.first().focus();
        $LocalInputs.add($(Location + ' a, button'));
        $Inputs.add('a, button').not($LocalInputs).attr('tabindex', -1);
        $SliderNavigationLinks.click(function () {
            var I = 0,
                TargetID, $TargetInputs;
            TargetID = $(this).attr('href');
            $TargetInputs = $(TargetID + ' input:not(:checked, :hidden, :radio), ' + TargetID + ' a, ' + TargetID + ' button');
            $(this).parentsUntil('#SlideArea').last().find('input:not(:checked, :hidden, :radio), a, button').attr('tabindex', -1);
            for (I; I < $TargetInputs.length; I++) {
                $TargetInputs.eq(I).attr('tabindex', I + 1);
            }
        });
        if (typeof LoginFailed !== 'undefined' && parseInt(LoginFailed, 10) === 1) {
            Core.UI.Animate($('#Login'), 'Shake');
        }
        if (typeof SignupError !== 'undefined' && parseInt(SignupError, 10) === 1) {
            window.location.hash = 'Signup';
        }
    };
    Core.Init.RegisterNamespace(TargetNS, 'APP_MODULE');
    return TargetNS;
}(Core.Customer.Login || {}));