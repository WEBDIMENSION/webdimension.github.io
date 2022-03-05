#############################################
# Copy local.mk.tpl to local.mk
# cp local.mk.tpl local.mk
#############################################

MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
PARENT_DIR := $(shell dirname ${MAKEFILE_DIR})
DT := $(shell date)

define l_docker_compose
	cd $(PARENT_DIR) && /usr/local/bin/docker-compose $1 $2 $3 $4
endef

gatsby_start:
	@$(call l_docker_compose, 'exec' 'gatsby' 'yarn' 'start')

gatsby_build:
	@$(call l_docker_compose, 'exec' 'gatsby' 'yarn' 'build')

gatsby_serve:
	@$(call l_docker_compose, 'exec' 'gatsby' 'yarn' 'serve')

act:
	cd $(PARENT_DIR) &&  act push -v --secret-file .env

vscode:
	cd $(PARENT_DIR) &&  code blog/.vscode/workspace.code-workspace
