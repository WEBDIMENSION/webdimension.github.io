#!/bin/bash
source ./.env

echo "#################################"
echo "Create network $NET_WORK_NAME"
echo "#################################"
LINES=$(docker network ls | grep "$NET_WORK_NAME" | wc -l)
if [ $LINES > '0' ]; then
  docker network remove "$NET_WORK_NAME"
fi
docker network create --driver=bridge --subnet="$NET_WORK_SUBNET" "$NET_WORK_NAME"
echo "#################################"
echo "Docker network  ls"
echo "#################################"
docker network ls
echo "#################################"
echo "Docker network  inspect $NET_WORK_NAME"
echo "#################################"
docker network inspect "$NET_WORK_NAME"
