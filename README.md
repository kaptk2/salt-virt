salt-virt
=========
A web based front end to salt-api for managing virtual machines.

About
========
Salt-virt uses [saltstack.org](http://www.saltstack.org) to make creating and
controlling virtual machines easy. It is written in AngularJS and uses 
[salt-api](https://github.com/saltstack/salt-api) to comunitcate.

Features
========
+ Live migration using both shared and non-shared stoarge
+ Uses libvirt
	* Can talk to Xen, KVM, VMWare or anything else libvirt can talk to
+ Uses AngularJS for fast and responsive design.
+ Uses the [salt-virt runner](https://salt.readthedocs.org/en/latest/ref/runners/all/salt.runners.virt.html)


Insipred by Tor Hveem and his blog post at: http://hveem.no/saltvirt
