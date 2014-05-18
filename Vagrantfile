# -*- mode: ruby -*-
# vi: set ft=ruby ts=2 sw=2:

PUPPET_MODULES = 'puppet/modules'

Vagrant.configure('2') do |config|
  config.vm.box = 'trusty64'
  config.vm.box_url = 'https://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box'

  config.vm.hostname = 'dockerhost'
  config.vm.network 'forwarded_port', guest: 8080, host: 8080

  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = 'puppet'
    puppet.module_path = PUPPET_MODULES
    puppet.manifest_file = 'init.pp'
    puppet.options = [ '--summarize' ]
  end
end
