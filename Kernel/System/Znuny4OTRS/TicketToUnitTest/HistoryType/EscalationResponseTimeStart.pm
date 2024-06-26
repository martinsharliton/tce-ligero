# --
# Copyright (C) 2012-2018 Znuny GmbH, http://znuny.com/
# --
# This software comes with ABSOLUTELY NO WARRANTY. For details, see
# the enclosed file COPYING for license information (AGPL). If you
# did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
# --
## nofilter(TidyAll::Plugin::OTRS::Perl::ObjectDependencies)

package Kernel::System::Znuny4OTRS::TicketToUnitTest::HistoryType::EscalationResponseTimeStart;

use strict;
use warnings;

our @ObjectDependencies = ();

use Kernel::System::VariableCheck qw(:all);
use parent qw( Kernel::System::Znuny4OTRS::TicketToUnitTest::Base );

sub Run {
    my ( $Self, %Param ) = @_;

    my $Output = <<OUTPUT;
\$GenericAgentObject->JobRun(
    Job    => 'trigger escalation events',
    Config => {
        Escalation => 1,
        New        => {
            Module => 'Kernel::System::GenericAgent::TriggerEscalationStartEvents',
        },
    },
    Limit  => 100_000_000,
    UserID => 1,
);

# trigger transaction events
\$Kernel::OM->ObjectsDiscard(
    Objects => ['Kernel::System::Ticket'],
);
\$TicketObject = \$Kernel::OM->Get('Kernel::System::Ticket');
OUTPUT

    return $Output;
}

1;
