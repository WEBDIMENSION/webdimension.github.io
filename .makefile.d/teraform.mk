MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
PARENT_DIR := $(shell dirname ${MAKEFILE_DIR})

terraform_init:
	cd $(PARENT_DIR) && terraform init

terraform_plan:
	cd $(PARENT_DIR) && terraform plan

terraform_apply:
	cd $(PARENT_DIR) && terraform apply

terraform_destroy:
	cd $(PARENT_DIR) && terraform destroy
