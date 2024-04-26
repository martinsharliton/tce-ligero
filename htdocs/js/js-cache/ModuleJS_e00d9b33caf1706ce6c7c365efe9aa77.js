"use strict";var Core=Core||{};Core.Agent=Core.Agent||{};Core.Agent.Admin=Core.Agent.Admin||{};Core.Agent.Admin=(function(TargetNS){TargetNS.Init=function(){var Favourites=Core.Config.Get('Favourites');window.setTimeout(function(){$('.SidebarColumn #Filter').focus();},100);$('.AddAsFavourite').off('click.AddAsFavourite').on('click.AddAsFavourite',function(Event){var $TriggerObj=$(this),Module=$(this).data('module'),ModuleName=$TriggerObj.closest('a').find('span.Title').clone().children().remove().end().text();ModuleName=ModuleName.replace(/^\s*(.*?)\s*$/,"$1");if($TriggerObj.hasClass('Clicked')){return false;}
Event.stopPropagation();$(this).addClass('Clicked');Favourites.push(Module);Core.Agent.PreferencesUpdate('AdminNavigationBarFavourites',JSON.stringify(Favourites),function(){var FavouriteHTML='',RowIndex,FavouriteRows=[ModuleName];$TriggerObj.addClass('Clicked');FavouriteHTML=Core.Template.Render('Agent/Admin/Favourite',{'Link':$TriggerObj.closest('a').attr('href'),'Name':ModuleName,'Module':Module});$TriggerObj.find('i').fadeOut(function(){$(this).closest('li').find('.AddAsFavourite').append('<i class="fa fa-check" style="display: none;"></i>').find('i.fa-check').fadeIn().delay(1000).fadeOut(function(){$(this)
.closest('.AddAsFavourite')
.hide()
.find('i.fa-check')
.remove();$('.ItemListGrid').find('[data-module="'+Module+'"]').addClass('IsFavourite');});$(this).hide();});$('.DataTable.Favourites tbody tr').each(function(){FavouriteRows.push($(this).find('td:first a').html());});FavouriteRows.sort(function(a,b){return a.localeCompare(b);});RowIndex=FavouriteRows.indexOf(ModuleName);if(RowIndex<0){$('.DataTable.Favourites').append($(FavouriteHTML));}
else if(RowIndex==0){$('.DataTable.Favourites').prepend($(FavouriteHTML));}
else{$(FavouriteHTML).insertAfter($(".DataTable.Favourites tbody tr")[RowIndex-1]);}
$('.DataTable.Favourites').show();});return false;});$('.DataTable.Favourites').on('click','.RemoveFromFavourites',function(){var Module=$(this).data('module'),Index=Favourites.indexOf(Module),$TriggerObj=$(this),$ListItemObj=$('.ItemListGrid').find('[data-module="'+Module+'"]');if($ListItemObj.hasClass('IsFavourite')&&Index>-1){Favourites.splice(Index,1);Core.Agent.PreferencesUpdate('AdminNavigationBarFavourites',JSON.stringify(Favourites),function(){$TriggerObj.closest('tr').fadeOut(function(){var $TableObj=$(this).closest('table');$(this).remove();if(!$TableObj.find('tr').length){$TableObj.hide();}
$ListItemObj.removeClass('IsFavourite').removeClass('Clicked').show().find('i.fa-star-o').show();});});}
return false;});Core.UI.Table.InitTableFilter($('#Filter'),$('.Filterable'),undefined,true);};Core.Init.RegisterNamespace(TargetNS,'APP_MODULE');return TargetNS;}(Core.Agent.Admin||{}));

"use strict";var Core=Core||{};Core.UI=Core.UI||{};Core.UI.AllocationList=(function(TargetNS){if(!Core.Debug.CheckDependency('Core.UI.AllocationList','$([]).sortable','jQuery UI sortable')){return false;}
TargetNS.GetResult=function(ResultListSelector,DataAttribute){var $List=$(ResultListSelector),Result=[];if(!$List.length||!$List.find('li').length){return[];}
$List.find('li').each(function(){var Value=$(this).data(DataAttribute);if(typeof Value!=='undefined'){Result.push(Value);}});return Result;};TargetNS.Init=function(ListSelector,ConnectorSelector,ReceiveCallback,RemoveCallback,SortStopCallback){var $Lists=$(ListSelector);if(!$Lists.length){return;}
$Lists
.find('li').removeClass('Even').end()
.sortable({connectWith:ConnectorSelector,receive:function(Event,UI){if($.isFunction(ReceiveCallback)){ReceiveCallback(Event,UI);}},remove:function(Event,UI){if($.isFunction(RemoveCallback)){RemoveCallback(Event,UI);}},stop:function(Event,UI){if($.isFunction(SortStopCallback)){SortStopCallback(Event,UI);}}}).disableSelection();};return TargetNS;}(Core.UI.AllocationList||{}));

"use strict";var Core=Core||{};Core.Agent=Core.Agent||{};Core.Agent.TableFilters=(function(TargetNS){if(!Core.Debug.CheckDependency('Core.Agent.TableFilters','Core.UI.AllocationList','Core.UI.AllocationList')){return false;}
TargetNS.InitCustomerIDAutocomplete=function($Input){var AutoCompleteConfig=Core.Config.Get('CustomerIDAutocomplete');if(typeof AutoCompleteConfig==='undefined'){return;}
$Input.autocomplete({minLength:AutoCompleteConfig.MinQueryLength,delay:AutoCompleteConfig.QueryDelay,open:function(){$(this).autocomplete('widget').addClass('ui-overlay-autocomplete');return false;},source:function(Request,Response){var URL=Core.Config.Get('Baselink'),Data={Action:'AgentCustomerSearch',Subaction:'SearchCustomerID',IncludeUnknownTicketCustomers:parseInt(Core.Config.Get('IncludeUnknownTicketCustomers'),10),Term:Request.term,MaxResults:AutoCompleteConfig.MaxResultsDisplayed};if($Input.data('AutoCompleteXHR')){$Input.data('AutoCompleteXHR').abort();$Input.removeData('AutoCompleteXHR');Response({});}
$Input.data('AutoCompleteXHR',Core.AJAX.FunctionCall(URL,Data,function(Result){var ValueData=[];$Input.removeData('AutoCompleteXHR');$.each(Result,function(){ValueData.push({label:this.Label+' ('+this.Value+')',value:this.Value});});Response(ValueData);}));},select:function(Event,UI){$(Event.target)
.parent()
.find('select')
.append('<option value="'+UI.item.value+'">SelectedItem</option>')
.val(UI.item.value)
.trigger('change');}});};TargetNS.InitCustomerUserAutocomplete=function($Input){var AutoCompleteConfig=Core.Config.Get('CustomerUserAutocomplete');if(typeof AutoCompleteConfig==='undefined'){return;}
$Input.autocomplete({minLength:AutoCompleteConfig.MinQueryLength,delay:AutoCompleteConfig.QueryDelay,open:function(){$(this).autocomplete('widget').addClass('ui-overlay-autocomplete');return false;},source:function(Request,Response){var URL=Core.Config.Get('Baselink'),Data={Action:'AgentCustomerSearch',IncludeUnknownTicketCustomers:parseInt(Core.Config.Get('IncludeUnknownTicketCustomers'),10),Term:Request.term,MaxResults:AutoCompleteConfig.MaxResultsDisplayed};if($Input.data('AutoCompleteXHR')){$Input.data('AutoCompleteXHR').abort();$Input.removeData('AutoCompleteXHR');Response({});}
$Input.data('AutoCompleteXHR',Core.AJAX.FunctionCall(URL,Data,function(Result){var ValueData=[];$Input.removeData('AutoCompleteXHR');$.each(Result,function(){ValueData.push({label:this.Label+" ("+this.Value+")",value:this.Label,key:this.Value});});Response(ValueData);}));},select:function(Event,UI){$(Event.target)
.parent()
.find('select')
.append('<option value="'+UI.item.key+'">SelectedItem</option>')
.val(UI.item.key)
.trigger('change');}});};TargetNS.InitUserAutocomplete=function($Input,Subaction){var AutoCompleteConfig=Core.Config.Get('UserAutocomplete');if(typeof AutoCompleteConfig==='undefined'){return;}
$Input.autocomplete({minLength:AutoCompleteConfig.MinQueryLength,delay:AutoCompleteConfig.QueryDelay,open:function(){$(this).autocomplete('widget').addClass('ui-overlay-autocomplete');return false;},source:function(Request,Response){var URL=Core.Config.Get('Baselink'),Data={Action:'AgentUserSearch',Subaction:Subaction,Term:Request.term,MaxResults:AutoCompleteConfig.MaxResultsDisplayed};if($Input.data('AutoCompleteXHR')){$Input.data('AutoCompleteXHR').abort();$Input.removeData('AutoCompleteXHR');Response({});}
$Input.data('AutoCompleteXHR',Core.AJAX.FunctionCall(URL,Data,function(Result){var ValueData=[];$Input.removeData('AutoCompleteXHR');$.each(Result,function(){ValueData.push({label:this.UserValue+" ("+this.UserKey+")",value:this.UserValue,key:this.UserKey});});Response(ValueData);}));},select:function(Event,UI){$(Event.target)
.parent()
.find('select')
.append('<option value="'+UI.item.key+'">SelectedItem</option>')
.val(UI.item.key)
.trigger('change');}});};TargetNS.Init=function(){TargetNS.SetAllocationList();};function UpdateAllocationList(Event,UI){var $ContainerObj=$(UI.sender).closest('.AllocationListContainer'),Data={},FieldName;if(Event.type==='sortstop'){$ContainerObj=$(UI.item).closest('.AllocationListContainer');}
Data.Columns={};Data.Order=[];$ContainerObj.find('.AvailableFields').find('li').each(function(){FieldName=$(this).attr('data-fieldname');Data.Columns[FieldName]=0;});$ContainerObj.find('.AssignedFields').find('li').each(function(){FieldName=$(this).attr('data-fieldname');Data.Columns[FieldName]=1;Data.Order.push(FieldName);});$ContainerObj.closest('form').find('.ColumnsJSON').val(Core.JSON.Stringify(Data));}
TargetNS.SetAllocationList=function(Name){var AllocationListArray=[];if(typeof Name!=='undefined'){AllocationListArray.push($('#Widget'+Name+' .AllocationListContainer'));}
else{$('.AllocationListContainer').each(function(){AllocationListArray.push($(this));});}
$.each(AllocationListArray,function(){var $ContainerObj=$(this),DataEnabledJSON=$ContainerObj.closest('form.WidgetSettingsForm').find('input.ColumnsEnabledJSON').val(),DataAvailableJSON=$ContainerObj.closest('form.WidgetSettingsForm').find('input.ColumnsAvailableJSON').val(),DataEnabled,DataAvailable,Translation,$FieldObj,IDString='#'+$ContainerObj.find('.AssignedFields').attr('id')+', #'+$ContainerObj.find('.AvailableFields').attr('id');if(DataEnabledJSON){DataEnabled=Core.JSON.Parse(DataEnabledJSON);}
if(DataAvailableJSON){DataAvailable=Core.JSON.Parse(DataAvailableJSON);}
$.each(DataEnabled,function(Index,Field){Translation=Core.Config.Get('Column'+Field)||Field;$FieldObj=$('<li />').attr('title',Translation).attr('data-fieldname',Field).text(Translation);$ContainerObj.find('.AssignedFields').append($FieldObj);});$.each(DataAvailable,function(Index,Field){Translation=Core.Config.Get('Column'+Field)||Field;$FieldObj=$('<li />').attr('title',Translation).attr('data-fieldname',Field).text(Translation);$ContainerObj.find('.AvailableFields').append($FieldObj);});Core.UI.AllocationList.Init(IDString,$ContainerObj.find('.AllocationList'),'UpdateAllocationList','',UpdateAllocationList);Core.UI.Table.InitTableFilter($ContainerObj.find('.FilterAvailableFields'),$ContainerObj.find('.AvailableFields'));});};TargetNS.RegisterUpdatePreferences=function($ClickedElement,ElementID,$Form){if(isJQueryObject($ClickedElement)&&$ClickedElement.length){$ClickedElement.click(function(){var URL=Core.Config.Get('Baselink')+Core.AJAX.SerializeForm($Form);Core.AJAX.ContentUpdate($('#'+ElementID),URL,function(){Core.UI.ToggleTwoContainer($('#'+ElementID+'-setting'),$('#'+ElementID));});return false;});}};return TargetNS;}(Core.Agent.TableFilters||{}));
