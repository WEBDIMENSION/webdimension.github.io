MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
PARENT_DIR := $(shell dirname ${MAKEFILE_DIR})

define _l_docker_compose
	cd $(PARENT_DIR) && /usr/local/bin/docker-compose $1 $2 $3 $4 $5 $6
endef

python-main:
	@$(call _l_docker_compose, 'exec', 'python', 'python', 'main.py')

linkchecker:
	@echo 'Hello World2'

