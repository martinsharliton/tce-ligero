# --
# Copyright (C) 2001-2018 OTRS AG, http://otrs.com/
# --
# This software comes with ABSOLUTELY NO WARRANTY. For details, see
# the enclosed file COPYING for license information (AGPL). If you
# did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
# --

package Kernel::GenericInterface::Operation::GeneralCatalogLigero::GeneralCatalogGetValues;

use strict;
use warnings;

use Kernel::System::VariableCheck qw( :all );

use base qw(
    Kernel::GenericInterface::Operation::Common
);

our $ObjectManagerDisabled = 1;

=head1 NAME

Kernel::GenericInterface::Operation::GeneralCatalogLigero::GeneralCatalogGetValues - GenericInterface General Catalog Values Get

=head1 PUBLIC INTERFACE

=over 4

=cut

=item new()

usually, you want to create an instance of this
by using Kernel::GenericInterface::Operation->new();

=cut

sub new {
    my ( $Type, %Param ) = @_;

    my $Self = {};
    bless( $Self, $Type );

    # check needed objects
    for my $Needed (qw(DebuggerObject WebserviceID)) {
        if ( !$Param{$Needed} ) {
            return {
                Success      => 0,
                ErrorMessage => "Got no $Needed!",
            };
        }

        $Self->{$Needed} = $Param{$Needed};
    }

    # get config for this screen
    #$Self->{Config} = $Kernel::OM->Get('Kernel::Config')->Get('GenericInterface::Operation::GeneralCatalogGetValues');

    return $Self;
}
=pod
@api {post} /generalcatalog/get List itens inside a class from GeneralCatalog.
@apiName Get
@apiGroup General Catalog
@apiVersion 1.0.0

@apiExample Example usage:
  {
    "SessionID": "560b2vVuwffhpoADg5RcpZiqJHcxpM4I",
    "ClassName": "ITSM::ConfigItem::Class"
  }

@apiParam (Request body) {String} [UserLogin] User login to create sesssion.
@apiParam (Request body) {String} [Password] Password to create session.
@apiParam (Request body) {String} SessionID session id generated by session create method.
@apiParam (Request body) {String} ClassName Class name from General Catalog

@apiErrorExample {json} Error example:
  HTTP/1.1 200 Success
  {
    "Error": {
      "ErrorCode": "GeneralCatalogGetValues.AuthFail",
      "ErrorMessage": "GeneralCatalogGetValues: Authorization failing!"
    }
  }
@apiSuccessExample {json} Success example:
  HTTP/1.1 200 Success
  {
    "Items": [
      {
        "Key": "26",
        "Value": "Software"
      },
      {
        "Key": "135",
        "Value": "PortalService"
      },
      {
        "Key": "25",
        "Value": "Network"
      },
      {
        "Key": "22",
        "Value": "Computer"
      },
      {
        "Key": "23",
        "Value": "Hardware"
      },
      {
        "Key": "24",
        "Value": "Location"
      }
    ]
  }

@apiSuccess {Array} Items List of Items found.
=cut
sub Run {
    my ( $Self, %Param ) = @_;

    my ( $UserID, $UserType ) = $Self->Auth(
        %Param,
    );

    my $GeneralCatalogObject = $Kernel::OM->Get('Kernel::System::GeneralCatalog');

    return $Self->ReturnError(
        ErrorCode    => 'GeneralCatalogGetValues.AuthFail',
        ErrorMessage => "GeneralCatalogGetValues: Authorization failing!",
    ) if !$UserID;

    return $Self->ReturnError(
        ErrorCode    => 'GeneralCatalogGetValues.ParamFail',
        ErrorMessage => "GeneralCatalogGetValues: Param ClassName is Required!",
    ) if !$Param{Data}->{ClassName};

    my $HashRef = $GeneralCatalogObject->ItemList(
       Class         => $Param{Data}->{ClassName},
       Valid         => 1,
    );

    my @values = ();

    if($HashRef){

        while (my ($key, $value) = each (%$HashRef)){
            push @values,{Key=>$key,Value=>$value};
        }

        return {
            Success => 1,
            Data    => {
                Items => \@values
            },
        };
    }

    return {
        Success => 1,
        Data    => {},
    };
    
}

1;

=back

=head1 TERMS AND CONDITIONS

This software is part of the OTRS project (L<http://otrs.org/>).

This software comes with ABSOLUTELY NO WARRANTY. For details, see
the enclosed file COPYING for license information (AGPL). If you
did not receive this file, see L<http://www.gnu.org/licenses/agpl.txt>.

=cut