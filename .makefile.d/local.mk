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

hello_world:
	@echo 'Hello World'

hello_world2:
	@echo 'Hello World2'

my_target:
	@echo $(DT)
	@sleep 10
	@echo $(DT)

gatsby_start:
	@$(call l_docker_compose, 'exec' 'gatsby' 'yarn' 'start')

gatsby_build:
	cd $(PARENT_DIR) && docker-compose exec gatsby yarn build

act:
	cd $(PARENT_DIR) &&  act push -v
