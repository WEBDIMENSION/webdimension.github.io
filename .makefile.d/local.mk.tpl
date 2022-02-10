#############################################
# Copy local.mk.tpl to local.mk
# cp local.mk.tpl local.mk
#############################################

MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))
PARENT_DIR := $(shell dirname ${MAKEFILE_DIR})

hello_world:
	echo 'Hello World'
