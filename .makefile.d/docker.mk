MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
PARENT_DIR := $(shell dirname ${MAKEFILE_DIR})

define _docker_compose
	cd $(PARENT_DIR) && docker-compose $1 $2
endef

docker-compose_logs_f:
	@$(call _docker_compose, 'logs', '-f')

docker-compose_ps:
	@$(call _docker_compose, 'ps')

docker-compose_down:
	@$(call _docker_compose, 'down')

docker-compose_start:
	@$(call _docker_compose, 'start')

docker-compose_stop:
	@$(call _docker_compose, 'stop')

docker-compose_pause:
	@$(call _docker_compose, 'pause')

docker-compose_unpause:
	@$(call _docker_compose, 'unpause')

docker-compose_build:
	@$(call _docker_compose, 'build')

define _docker
	docker $1 $2
endef

docker_images:
	@$(call _docker, 'images')

docker_ps:
	@$(call _docker, 'ps')

docker_ps_-a:
	@$(call _docker, 'ps', '-a')

docker_network_ls:
	@$(call _docker, 'network', 'ls')

docker_volume_ls:
	@$(call _docker, 'volume','ls')
