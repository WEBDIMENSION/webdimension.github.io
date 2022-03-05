MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
#PARENT_DIR := $(shell #dirname ${MAKEFILE_DIR})

define _l_docker_compose
	/usr/local/bin/docker-compose -f $(MAKEFILE_DIR)docker-compose.yml $1 $2 $3 $4 $5 $6
endef

python-main:
	@$(call _l_docker_compose, 'exec', 'python', 'python', 'main.py')

linkchecker:
	@$(call _l_docker_compose, 'run', 'linkchecker')
