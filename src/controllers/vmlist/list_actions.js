function ListActions(action){
	var cases = {
		'virt.shutdown': {
			title: 'Warning: Power Off',
			msg: 'You are about to power off ' + arg + '. Are you sure you want to continue?',
			btns: [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}],
		},

		'virt.reboot': {
			title: 'Warning: Reboot',
			msg: 'You are about to reboot ' + arg + '. Are you sure you want to continue?',
			btns: [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}],
		},

		'virt.reset': {
			title: 'Warning: Power Cycle',
			msg: 'You are about to power cycle ' + arg + '. Are you sure you want to continue?',
			btns: [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'Yes', cssClass: 'btn-primary'}],
		},

		'virt.destroy':{
			title: 'Warning: Force Off ',
			msg: 'Warning you are about to force off ' + arg + '. Are you sure you want to continue?',
			btns: [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'Yes', cssClass: 'btn-danger'}],
		},

		'virt.purge': {
			title: 'Warning: Purge',
			msg: 'Warning you are about to purge ' + arg + '. This operation unable to be reversed. Are you sure you want to continue?',
			btns: [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'DANGER!', cssClass: 'btn-danger'}],
		},

		'cmd.run': {
			title: 'Warning!',
			msg: 'You are about to '+ arg +' a hypervisor, this may effect a large number of virtual machines. Are you sure you want to continue?',
			btns: [{result:'cancel', label: 'Cancel'}, {result:'yes', label: 'DANGER!', cssClass: 'btn-danger'}],
		},
	}
	
	return cases[action] || {
		title: 'Invalid Action',
		msg: 'The requested action: ' + action + 'is not defined.',
		btns: [{result:'cancel', label: 'Cancel'}],
	};
}
