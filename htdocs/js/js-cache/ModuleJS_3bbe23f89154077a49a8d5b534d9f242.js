"use strict";var FAQ=FAQ||{};FAQ.Customer=FAQ.Customer||{};FAQ.Customer.FAQZoom=(function(TargetNS){TargetNS.IframeAutoHeight=function($Iframe){var NewHeight;if(isJQueryObject($Iframe)){$Iframe.width($Iframe.width()-2);NewHeight=$Iframe.contents().find('body').height();if(NewHeight===0){$Iframe.closest('.WidgetSimple').removeClass('Expanded').addClass('Collapsed');}else if(!NewHeight||isNaN(NewHeight)){NewHeight=Core.Config.Get('FAQ::Frontend::AgentHTMLFieldHeightDefault');}
else{if(NewHeight>Core.Config.Get('FAQ::Frontend::AgentHTMLFieldHeightMax')){NewHeight=Core.Config.Get('FAQ::Frontend::AgentHTMLFieldHeightMax');}}
if(NewHeight>0){NewHeight=parseInt(NewHeight,10)+25;}
$Iframe.height(NewHeight+'px');}};function ToggleMessage($Message){if($Message.hasClass('Visible')){$Message.removeClass('Visible');}
else{$Message.addClass('Visible');}}
TargetNS.Init=function(){var $Messages=$('#Messages > li'),$MessageHeaders=$('.MessageHeader',$Messages);$MessageHeaders.click(function(Event){ToggleMessage($(this).parent());Event.preventDefault();});if($('.FAQMessageBrowser').length){$('.FAQMessageBrowser a.Close').on('click',function(){var Data={Action:'CustomerFAQZoom',Subaction:'BrowserLinkMessage'};$('.FAQMessageBrowser').fadeOut("slow");Core.AJAX.FunctionCall(Core.Config.Get('CGIHandle'),Data,function(){});return false;});}
$('a.AsPopup').on('click',function(){Core.UI.Popup.OpenPopup($(this).attr('href'),'TicketAction');return false;});$('.RateButton').on('click',function(){var RateNumber=parseInt($(this).closest('div').attr('id').replace(/RateButton/,''),10);$('#RateValue').val(RateNumber);$('#RateSubmitButton').fadeIn(250);$('#FAQVoting').find('.RateButton').each(function(){var ItemRateNumber=parseInt($(this).closest('div').attr('id').replace(/RateButton/,''),10);if(ItemRateNumber<=RateNumber){$(this).addClass('RateChecked');$(this).removeClass('RateUnChecked');}
else{$(this).addClass('RateUnChecked');$(this).removeClass('RateChecked');}});});$("tbody tr").click(function(){window.location.href=$("a",this).attr("href");return false;});};Core.Init.RegisterNamespace(TargetNS,'APP_MODULE');return TargetNS;}(FAQ.Customer.FAQZoom||{}));
