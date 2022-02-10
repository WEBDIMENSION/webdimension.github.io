MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
PARENT_DIR := $(shell dirname ${MAKEFILE_DIR})

git_status:
	cd $(PARENT_DIR) && git status

git_branch_-a:
	cd $(PARENT_DIR) && git branch -a
