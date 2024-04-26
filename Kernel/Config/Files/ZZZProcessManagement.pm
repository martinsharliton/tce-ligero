# OTRS config file (automatically generated)
# VERSION:1.1
package Kernel::Config::Files::ZZZProcessManagement;
use strict;
use warnings;
no warnings 'redefine'; ## no critic
use utf8;
sub Load {
    my ($File, $Self) = @_;
$Self->{'Process'} = {};

$Self->{'Process::State'} = {
  'S1' => 'Active',
  'S2' => 'Inactive',
  'S3' => 'FadeAway'
};

$Self->{'Process::Activity'} = {};

$Self->{'Process::ActivityDialog'} = {};

$Self->{'Process::Transition'} = {};

$Self->{'Process::TransitionAction'} = {};

    return;
}
1;
