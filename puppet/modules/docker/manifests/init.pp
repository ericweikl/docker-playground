# -*- mode: ruby -*-
# vi: set ft=ruby ts=2 sw=2:

class docker {

  package { 'docker.io':
    ensure => installed,
  }

  service { 'docker.io':
    ensure => running,
    enable => true,
    require => Package['docker.io'],
  }
  
  file { '/usr/bin/docker':
    ensure => link,
    target => '/usr/bin/docker.io',
    require => Package['docker.io'],
  }

  exec { 'add vagrant to docker group':
    unless  => "/bin/grep -q 'docker\\S*vagrant' /etc/group",
    command => '/usr/sbin/usermod -aG docker vagrant',
    require => Package['docker.io'],
  }
}
