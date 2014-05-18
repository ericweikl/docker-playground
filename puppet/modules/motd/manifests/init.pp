# -*- mode: ruby -*-
# vi: set ft=ruby ts=2 sw=2:

class motd {

  tidy { '/etc/update-motd.d':
    recurse => true,
    matches => '.*', 
  }

  file { '/var/run/motd.dynamic':
    ensure => absent, 
  }

  file { '/etc/motd':
    source => 'puppet:///modules/motd/etc/motd',
    owner  => 'root',
    group  => 'root',
    mode   => 0644,
  }
}
