# --
# Copyright (C) 2001-2020 OTRS AG, https://otrs.com/
# --
# This software comes with ABSOLUTELY NO WARRANTY. For details, see
# the enclosed file COPYING for license information (GPL). If you
# did not receive this file, see https://www.gnu.org/licenses/gpl-3.0.txt.
# --

package Kernel::GenericInterface::Operation::Session::SessionGet;

use strict;
use warnings;

use Kernel::System::VariableCheck qw(IsStringWithData IsHashRefWithData);

use parent qw(
    Kernel::GenericInterface::Operation::Common
    Kernel::GenericInterface::Operation::Session::Common
);

our $ObjectManagerDisabled = 1;

=head1 NAME

Kernel::GenericInterface::Operation::Session::SessionGet - GenericInterface Session Get Operation backend

=head1 PUBLIC INTERFACE

=head2 new()

usually, you want to create an instance of this
by using Kernel::GenericInterface::Operation->new();

=cut

sub new {
    my ( $Type, %Param ) = @_;

    my $Self = {};
    bless( $Self, $Type );

    # check needed objects
    for my $Needed (
        qw(DebuggerObject WebserviceID)
        )
    {
        if ( !$Param{$Needed} ) {

            return {
                Success      => 0,
                ErrorMessage => "Got no $Needed!"
            };
        }

        $Self->{$Needed} = $Param{$Needed};
    }

    return $Self;
}

=head2 Run()

Get session information.

    my $Result = $OperationObject->Run(
        Data => {
            SessionID => '1234567890123456',
        },
    );
    $Result = {
        Success      => 1,                                # 0 or 1
        ErrorMessage => '',                               # In case of an error
        Data         => {
            UserSessionStart    => '1293801801',
            UserRemoteAddr      => '127.0.0.1',
            UserRemoteUserAgent => 'Some User Agent x.x',
            UserLastname        => 'SomeLastName',
            UserFirstname       => 'SomeFirstname',
            # and other preferences values
        },
    };

=cut

=pod
@api {post} /session/get Get session information.
@apiName Get
@apiGroup Session
@apiVersion 1.0.0

@apiExample Example usage:
  {
    "SessionID": "a0uShqmDGXkiSyPRjmFnPH2vRH4yPc8J"
  }

@apiParam (Request body) {String} SessionID session id generated by session create method.

@apiErrorExample {json} Error example:
  HTTP/1.1 200 Success
  {
    "Error": {
      "ErrorCode": "SessionGet.AuthFail",
      "ErrorMessage": "SessionGet: Authorization failing!"
    }
  }
@apiSuccessExample {json} Success example:
  HTTP/1.1 200 Success
  {
    "SessionData": [
      {
        "Key": "AdminCommunicationLogPageShown",
        "Value": "25"
      },
      {
        "Value": "2000",
        "Key": "AdminDynamicFieldsOverviewPageShown"
      },
      {
        "Value": "2021-05-26 14:48:07",
        "Key": "ChangeTime"
      },
      {
        "Key": "CreateTime",
        "Value": "2021-05-26 14:48:07"
      },
      {
        "Value": "GenericInterface",
        "Key": "SessionSource"
      },
      {
        "Key": "UserAuthBackend",
        "Value": ""
      },
      {
        "Key": "UserChangeOverviewSmallPageShown",
        "Value": "25"
      },
      {
        "Value": "25",
        "Key": "UserConfigItemOverviewSmallPageShown"
      },
      {
        "Key": "UserCreateNextMask",
        "Value": ""
      },
      {
        "Key": "UserCreateWorkOrderNextMask",
        "Value": "AgentITSMWorkOrderZoom"
      },
      {
        "Key": "UserEmail",
        "Value": "root@localhost"
      },
      {
        "Value": "25",
        "Key": "UserFAQJournalOverviewSmallPageShown"
      },
      {
        "Value": "25",
        "Key": "UserFAQOverviewSmallPageShown"
      },
      {
        "Value": "Admin",
        "Key": "UserFirstname"
      },
      {
        "Key": "UserFullname",
        "Value": "Admin LigeroSmart"
      },
      {
        "Value": "1",
        "Key": "UserID"
      },
      {
        "Value": "Yes",
        "Key": "UserIsGroupRo[admin]"
      },
      {
        "Key": "UserIsGroupRo[itsm-change-builder]",
        "Value": "Yes"
      },
      {
        "Key": "UserIsGroupRo[itsm-change-manager]",
        "Value": "Yes"
      },
      {
        "Key": "UserIsGroupRo[itsm-change]",
        "Value": "Yes"
      },
      {
        "Key": "UserIsGroupRo[itsm-configitem]",
        "Value": "Yes"
      },
      {
        "Key": "UserIsGroupRo[itsm-service]",
        "Value": "Yes"
      },
      {
        "Key": "UserIsGroupRo[stats]",
        "Value": "Yes"
      },
      {
        "Key": "UserIsGroupRo[users]",
        "Value": "Yes"
      },
      {
        "Value": "Yes",
        "Key": "UserIsGroup[admin]"
      },
      {
        "Value": "Yes",
        "Key": "UserIsGroup[itsm-change-builder]"
      },
      {
        "Key": "UserIsGroup[itsm-change-manager]",
        "Value": "Yes"
      },
      {
        "Key": "UserIsGroup[itsm-change]",
        "Value": "Yes"
      },
      {
        "Value": "Yes",
        "Key": "UserIsGroup[itsm-configitem]"
      },
      {
        "Value": "Yes",
        "Key": "UserIsGroup[itsm-service]"
      },
      {
        "Value": "Yes",
        "Key": "UserIsGroup[stats]"
      },
      {
        "Key": "UserIsGroup[users]",
        "Value": "Yes"
      },
      {
        "Value": "1622315527",
        "Key": "UserLastLogin"
      },
      {
        "Key": "UserLastLoginTimestamp",
        "Value": "2021-05-29 19:12:07"
      },
      {
        "Value": "1622315528",
        "Key": "UserLastRequest"
      },
      {
        "Value": "LigeroSmart",
        "Key": "UserLastname"
      },
      {
        "Key": "UserLogin",
        "Value": "root@localhost"
      },
      {
        "Key": "UserLoginFailed",
        "Value": "0"
      },
      {
        "Key": "UserRefreshTime",
        "Value": "0"
      },
      {
        "Value": "127.0.0.1",
        "Key": "UserRemoteAddr"
      },
      {
        "Value": "insomnia/2021.3.0",
        "Key": "UserRemoteUserAgent"
      },
      {
        "Value": "1622315528",
        "Key": "UserSessionStart"
      },
      {
        "Key": "UserStoredFilterColumns-AgentTicketQueue",
        "Value": "{}"
      },
      {
        "Value": "25",
        "Key": "UserSurveyOverviewSmallPageShown"
      },
      {
        "Key": "UserTicketOverviewAgentTicketQueue",
        "Value": "Preview"
      },
      {
        "Key": "UserTicketOverviewMediumPageShown",
        "Value": "20"
      },
      {
        "Value": "15",
        "Key": "UserTicketOverviewPreviewPageShown"
      },
      {
        "Value": "25",
        "Key": "UserTicketOverviewSmallPageShown"
      },
      {
        "Value": null,
        "Key": "UserTitle"
      },
      {
        "Value": "User",
        "Key": "UserType"
      },
      {
        "Value": "1",
        "Key": "ValidID"
      }
    ]
  }

@apiSuccess {Array} SessionData List of items found.
=cut
sub Run {
    my ( $Self, %Param ) = @_;

    if ( !IsHashRefWithData( $Param{Data} ) ) {

        return $Self->ReturnError(
            ErrorCode    => 'SessionGet.MissingParameter',
            ErrorMessage => "SessionGet: The request is empty!",
        );
    }

    if ( !$Param{Data}->{SessionID} ) {
        return $Self->ReturnError(
            ErrorCode    => 'SessionGet.MissingParameter',
            ErrorMessage => "SessionGet: SessionID is missing!",
        );
    }

    my $SessionObject = $Kernel::OM->Get('Kernel::System::AuthSession');

    # Honor SessionCheckRemoteIP, SessionMaxIdleTime, etc.
    my $Valid = $SessionObject->CheckSessionID(
        SessionID => $Param{Data}->{SessionID},
    );
    if ( !$Valid ) {
        return $Self->ReturnError(
            ErrorCode    => 'SessionGet.SessionInvalid',
            ErrorMessage => 'SessionGet: SessionID is Invalid!',
        );
    }

    my %SessionDataRaw = $SessionObject->GetSessionIDData(
        SessionID => $Param{Data}->{SessionID},
    );

    # Filter out some sensitive values
    delete $SessionDataRaw{UserPw};
    delete $SessionDataRaw{UserChallengeToken};

    my $JSONObject = $Kernel::OM->Get('Kernel::System::JSON');

    my @SessionData;
    for my $DataKey ( sort keys %SessionDataRaw ) {

        my $Value = $SessionDataRaw{$DataKey};
        my %Data  = (
            Key   => $DataKey,
            Value => $Value,
        );

        if ( ref $Value ) {
            $Data{Value} = $JSONObject->Encode(
                Data     => $Value,
                SortKeys => 1,
            );
            $Data{Serialized} = 1;
        }

        push @SessionData, \%Data;
    }

    return {
        Success => 1,
        Data    => {
            SessionData => \@SessionData,
        },
    };

}

1;

=head1 TERMS AND CONDITIONS

This software is part of the OTRS project (L<https://otrs.org/>).

This software comes with ABSOLUTELY NO WARRANTY. For details, see
the enclosed file COPYING for license information (GPL). If you
did not receive this file, see L<https://www.gnu.org/licenses/gpl-3.0.txt>.

=cut