VAGRANT_DIR := ~/workspace/develop/vagrant

vagrant_status:
	cd $(VAGRANT_DIR) && vagrant status

vagrant_up_develop:
	cd $(VAGRANT_DIR) && vagrant up develop

vagrant_up_halt_develop:
	cd $(VAGRANT_DIR) && vagrant halt develop

vagrant_up_reload_develop:
	cd $(VAGRANT_DIR) && vagrant reload develop

