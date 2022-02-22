---
title: "Docker 基本コマンド"
date: "2022-02-23 00:25:17"
post_modified: "2022-02-23 00:25:17"
description: "Dockerのコマンドは長くなりがち"
categories: ["Environment"]
tags: ["Docker", "開発環境"]
draft: false
---

## Doker build

```bash
    docker build . -t <tag_name>
```

## Docker run

```bash
docker run -itd --privileged -v <host_dir>:<container_dir> -p <host_port>:<container_port> --name <container_name> <image_tag>
```

```bash
#example
docker run -itd --privileged -v /home/vagrant/workspace/develop/ansible/Develop_on_ubuntu/ansible:/ansible  -p 2223:22 --name dev dev
```

## Container stop remove

```bash
docker stop $(docker ps -q)
docker rm -f  <container_name>
docker rm $(docker ps -q -a)  # all container
docker rmi $(docker images -q) # all image
```

## Docker exec

```bash
# basic
docker exec -it <container_name> bash
```

### Options

- -u 'username'
- -d 'background'
- -e 'env'
- --privileged
- -w 'workdir'

## Create Network

```bash
docker network create <network_name>
# subnet
docker network create --driver=bridge --subnet=172.30.0.0/24 dev
```

## Volumes

```bash
docker volume ls
```

## Remove Volumes

```bash
docker volume rm <volume_name>
```

## Get IP from container

```bash
docker inspect <コンテナID>
```

## Clean UP

### Imagge

```bash
docker image prune
```

### container

```bash
docker container prune
```
