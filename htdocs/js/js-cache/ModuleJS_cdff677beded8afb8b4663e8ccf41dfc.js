"use strict";var Core=Core||{};Core.Agent=Core.Agent||{};Core.Agent.Admin=Core.Agent.Admin||{};Core.Agent.Admin.RoleUser=(function(TargetNS){TargetNS.Init=function(){var RelationItems=Core.Config.Get('RelationItems');if(RelationItems){$.each(RelationItems,function(index){Core.Form.InitSelectAllCheckboxes($('table td input[type="checkbox"][name='+RelationItems[index]+']'),$('#SelectAll'+RelationItems[index]));$('input[type="checkbox"][name='+RelationItems[index]+']').click(function(){Core.Form.SelectAllCheckboxes($(this),$('#SelectAll'+RelationItems[index]));});});}
Core.UI.Table.InitTableFilter($("#Filter"),$("#UserRoles"));Core.UI.Table.InitTableFilter($("#FilterUsers"),$("#Users"));Core.UI.Table.InitTableFilter($("#FilterRoles"),$("#Roles"));};Core.Init.RegisterNamespace(TargetNS,'APP_MODULE');return TargetNS;}(Core.Agent.Admin.RoleUser||{}));

