define _l_docker_compose
	docker-compose $1 $2 $3 $4
endef

python-main:
	@$(call _l_docker_compose, 'exec', 'python', 'python', 'main.py')
