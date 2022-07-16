---
title: "multipass nfs"
date: "2022-07-16 12:06:25"
post_modified: "2022-07-16 12:06:25"
description: "multipassのディレクトリ共有をnfsに変更"
categories: ["Tools"]
tags: ["multipass", "Vagrant", "ShellScript"]
draft: false
---

## Multipass の mount を sshfs から nfs へ変更

理由

- ssh ログイン後 特定のディレクトリでレスポンスが悪い 。
  `ls` `pwd` などでも １分かかる場合がある。

- `.git`ディレクトリのあるディレクトリでこの事象が起こる。  
  全てではない。 原因不明

ということで 以前の Vagrant + vmware のレスポンスがほしいため mount の方法を変える。

multipass デフォルトは sshfs で接続する。  
multipass の mount のコマンドは使わない。

### 振る舞い

#### --cloud-init で nfs-common

これをインストールしないと nfs の mount ができない。

```bash
packages:
  - nfs-common
```

#### 作成された VM の IP から `/etc/exports/`へ追記

```bash
sudo sed -i "" "/${vm_ip}/d" /etc/exports
sudo sh -c "echo '${MOUNT_WORKSPACE_HOST} alldirs -mapall=${USER_ID}:${GROUP_ID}  ${vm_ip}' >> /etc/exports"
```

#### multipass exec コマンドで mount ディレクトリ作成

```bash
multipass exec ${VM_NAME} -- mkdir ${MOUNT_WORKSPACE_VM}
```

#### multipass exec コマンドで `/etc/fstab` へ追記、マウント

```bash
multipass exec ${VM_NAME} -- sudo sh -c "echo '${NFS_HOST_IP}:/${MOUNT_WORKSPACE_HOST} ${MOUNT_WORKSPACE_VM} nfs auto,nofail,noatime,nolock,intr,tcp,actimeo=1800 0 0' >> /etc/fstab"
multipass exec ${VM_NAME} -- sudo sh -c "mount ${NFS_HOST_IP}:/${MOUNT_WORKSPACE_HOST} ${MOUNT_WORKSPACE_VM}"
```

## multipass vm 作成スクリプト

```bash
#!/usr/bin/env bash

echo -e -n "\n"
echo "###################################"
echo "###       cloud-config          ###"
echo "###################################"
AUTHORIZED_KEYS_ID_RSA=$(cat "$RSA_PUB_FILE_NAME")
AUTHORIZED_KEYS_ANSIBLE_RSA=$(cat "$ANSIBLE_RSA_PUB_FILE_NAME")
cat >./cloud-config.yaml <<_EOF_
---
locale: en_US.UTF8
timezone: Asia/Tokyo
packages:
  - nfs-common
users:
  - name: ubuntu
    ssh-authorized-keys:
      - ${AUTHORIZED_KEYS_ID_RSA}
      - ${AUTHORIZED_KEYS_ANSIBLE_RSA}
_EOF_
cat ./cloud-config.yaml

echo -e -n "\n"
echo "###################################"
echo "###         Create VM           ###"
echo "###################################"
multipass launch -c "${CPU}" -m "${MEMORY}" -d "${DISK_SIZE}" -n "${VM_NAME}" "${VM_VERSION}" --cloud-init "${CLOUD_INIT}"
sleep 30

#echo -e -n "\n"
#echo "###################################"
#echo "###        Mount Dir            ###"
#echo "###################################"
#multipass mount "${MOUNT_WORKSPACE_HOST}" "${VM_NAME}":"${MOUNT_WORKSPACE_VM}"
#echo "mount ${MOUNT_WORKSPACE_HOST} ${VM_NAME}:${MOUNT_WORKSPACE_VM}"

echo -e -n "\n"
echo "###################################"
echo "###      VM IP address          ###"
echo "###################################"
vm_ip=$(multipass info develop | grep IPv4 | awk '{ print $2 }')
echo "ipv4 : ${vm_ip}"

echo -e -n "\n"
echo "###################################"
echo "###  Create ansible inventory   ###"
echo "###################################"
cat >./hosts/multipass <<_EOF_
[multipass]
multipass ansible_host=$vm_ip ansible_user=ubuntu ansible_ssh_private_key_file=$RSA_FILE_NAME ansible_ssh_common_args='-o StrictHostKeyChecking=no'

[ubuntu20]
multipass
_EOF_
cat ./hosts/multipass

echo -e -n "\n"


echo -e -n "\n"
echo "###################################"
echo "###           NFS               ###"
echo "###################################"


sudo sed -i "" "/${vm_ip}/d" /etc/exports
sudo sh -c "echo '${MOUNT_WORKSPACE_HOST} alldirs -mapall=${USER_ID}:${GROUP_ID}  ${vm_ip}' >> /etc/exports"
multipass exec ${VM_NAME} -- mkdir ${MOUNT_WORKSPACE_VM}
multipass exec ${VM_NAME} -- sudo sh -c "echo '${NFS_HOST_IP}:/${MOUNT_WORKSPACE_HOST} ${MOUNT_WORKSPACE_VM} nfs auto,nofail,noatime,nolock,intr,tcp,actimeo=1800 0 0' >> /etc/fstab"
multipass exec ${VM_NAME} -- sudo sh -c "mount ${NFS_HOST_IP}:/${MOUNT_WORKSPACE_HOST} ${MOUNT_WORKSPACE_VM}"

echo "###################################"
echo "###   Exec ansible playbook     ###"
echo "###################################"

echo "$DEVELOP_INIT"
if [ "$DEVELOP_INIT" == 'true' ]; then
 ansible-playbook -i hosts/multipass site.yml -l multipass
# ansible-playbook -i hosts/multipass site.yml -l multipass -t tests
else
 ansible-playbook -i hosts/multipass site.yml -l multipass --skip-tags develop_init
fi

```

## sshfs から nfs に変更しての結果

上記の症状は全くなし。通常のターミナル操作もレスポンスが早くなった気がする。  
デフォルトで `nfs` 接続だったらいいのに・・・
