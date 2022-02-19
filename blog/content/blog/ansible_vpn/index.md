---
title: "VPNサーバー(SoftEhter)をAnsibleでConoha-VPNサーバーへ構築"
date: "2020-12-14 12:21:24"
post_modified: "2020-12-14 12:23:08"
description: "Conoha API を使いVPN構築を簡略化　の備忘録"
categories: ["未分類", "Linux"]
tags: ["CentOS7", "Docker", "Python", "Ansible", "testinfra", "SoftEther VPN"]
draft: false
---

# VPN サーバー(SoftEhter)を Ansible で Conoha-VPN サーバーへ構築

[GitHub](https://github.com/WEBDIMENSION/ansible-softether-for-conoha)

## inventory_file での host の指定を動的にしたい

ローカルの Docker 上でのテスト, Act(GitHub actions のローカル版)を利用してのテスト、本番デプロイにおいて inventory_file での host の指定を動的にしたい。

```python
## vars-file for docker
mount_dir: '/softether'
project_name: 'Ansible-SoftEther-For-Conoha'
docker_server:
  hosts:
    - host_ip: "127.0.0.1"
      ssh_port: 2223
      image_tag: "softether_server"
      container_tag: "softether001"
      container_ip: ""
      dockerfile: "centos7"
  inventory_name: "docker_server"
docker_client:
  hosts:
    - host_ip: "127.0.0.1"
      ssh_port: 2222
      image_tag: "softether_client"
      container_tag: "softether_client"
      container_ip: ""
      dockerfile: "ubuntu20.04"
  inventory_name: "docker_client"
```

```python
# Create inventory
        hosts_text = ""
        for i in range(len(docker_server["hosts"])):
            cname = str(docker_server["hosts"][i]["container_tag"])
            ip = str(docker_server["hosts"][i]["container_ip"])
            port = str(docker_server["hosts"][i]["ssh_port"])
            hosts_text += str(cname + " ansible_host=" + ip) + "n"
        os.makedirs(pwd + "/hosts", exist_ok=True)
        with open(
            pwd + "/hosts/" + docker_server["inventory_name"] + "_root", "w"
        ) as f:
            f.write(SOFTETHER_INVENTORY_FILE)
        SOFTETHER_INVENTORY_FILE = (
            textwrap.dedent(
                """
        [softether]
        {hosts}
        [softether:vars]
        ansible_user={ansible_user}
        ansible_port={ansible_ssh_port}
        ansible_ssh_private_key_file={mount_dir}/roles/ansible_user/{key}\
        """
            )
            .format(
                hosts=hosts_text,
                ansible_user=self.vars_ansible_user["ansible_users"]["master"]["name"],
                ansible_ssh_port=self.vars_sshd["sshd_port"],
                mount_dir=self.vars_docker["mount_dir"],
                key=self.vars_ansible_user["ansible_users"]["master"]["secret_key"],
            )
            .strip()
        )
        os.makedirs(pwd + "/hosts", exist_ok=True)
        with open(
            pwd + "/hosts/" + docker_server["inventory_name"] + "_user", "w"
        ) as f:
            f.write(SOFTETHER_INVENTORY_FILE)
```

## nofity 設定反映するため Service を restart させる

Case in Firewalled

```python
# roles/firewalled/handlers/main.yml
- name: Restart firewalld
  become: yes
  systemd:
    state: restarted
    name: firewalld
    enabled: yes
```

```python
- name: Open port by firewalld
  become: yes
  firewalld:
    port: "{{ item.port }}"
    permanent: "{{ item.permanent }}"
    state: "{{ item.state }}"
  with_items: "{{ firewalld_ports }}"
  when: firewalld_ports is defined
  notify: Restart firewalld # <-  最終的にリスタートさせる
```

## Use dict for vars and loop

```python
#  dict で書くことにより
ansible_users:
  master:
    name: 'ansible'
    groups: 'wheel'
    append: 'yes'
    state: 'present'
    remove: 'no'
    password: "{{ secret.ansible_user_password }}"
    key: "files/ansible_rsa.pub"
    secret_key: "files/ansible_rsa"
    login_shell: '/bin/bash'
    create_home: 'yes'
    sudo: 'present'
    comment: 'ansible user'
    expires: '-1'
```

```python
#  指定しやすくなる
            .format(
                hosts=hosts_text,
                ansible_user=self.vars_ansible_user["ansible_users"]["master"]["name"],
                ansible_ssh_port=self.vars_sshd["sshd_port"],
                mount_dir=self.vars_docker["mount_dir"],
                key=self.vars_ansible_user["ansible_users"]["master"]["secret_key"],
            )
            .strip()
```

```python
# playbook では with_dict を使い item.value.xxxになる
- name: user-control
  become: true
  user:
    name: "{{ item.value.name }}"
    groups: "{{ item.value.groups }}"
    state:  "{{ item.value.state }}"
    remove:  "{{ item.value.remove }}"
    create_home: "{{ item.value.create_home }}"
    password: "{{ item.value.password | password_hash('sha512') }}"
    shell: "{{ item.value.login_shell }}"
    comment: "{{ item.value.comment }}"
    expires: "{{ item.value.expires }}"
  with_dict: "{{ ansible_users }}"
```

## ansible-lint shell command

```bash
# Default command
ansible-lint site.yml
```

```python
# docker execから ansible-lint
        subprocess.run(
            "docker exec -it "
            + docker_client["hosts"][0]["container_tag"]
            + " bash -c 'cd "
            + str(self.vars_docker["mount_dir"])
            + " && ansible-lint site.yml'",
            shell=True,
            check=True,
        )
```

## flake8

```bash
# Default command
flake8 [DIR_NAME FILE_NAME]
```

```python
# docker execから flake8
        subprocess.run(
            "docker exec -it "
            + docker_client["hosts"][0]["container_tag"]
            + " bash -c 'cd "
            + str(self.vars_docker["mount_dir"])
            + " && flake8 tests tests.py deploy deploy.py'",
            shell=True,
            check=True,
        )
```

## block

```bash
# default command
black [DIR_NAME FILE_NAME]
```

```python
# docker execから flake8
        subprocess.run(
            "docker exec -it "
            + docker_client["hosts"][0]["container_tag"]
            + " bash -c 'cd "
            + str(self.vars_docker["mount_dir"])
            + " && block tests tests.py deploy deploy.py'",
            shell=True,
            check=True,
        )
```

## testinfra for ansible

```python
        subprocess.run(
            "docker exec -it "
            + docker_client["hosts"][0]["container_tag"]
            + ' bash -c "cd '
            + str(self.vars_docker["mount_dir"])
            + " && py.test -v tests/testinfra.py"
            + " --connection=ssh"
            + " --hosts='ansible://softether'"
            + " --ansible-inventory='hosts/"
            + docker_server["inventory_name"]
            + "_user'"",
            shell=True,
            check=True,
        )
```

```python
# Service check
def test_sshd_running_and_enabled(host):
    """ Check service sshd  """
    service = host.service("sshd")
    assert service.is_running
    assert service.is_enabled

# Port check
def test_open_port(host):
    """ Check ports  """
    all_variables = host.ansible.get_variables()
    localhost = host.addr("localhost")
    # sshd
    assert localhost.port(all_variables["sshd_port"]).is_reachable
    if all_variables["sshd_port"] != 22:
        assert not localhost.port(22).is_reachable
    # vpnserver
    assert localhost.port(443).is_reachable
    assert localhost.port(5555).is_reachable
    assert localhost.port(1194).is_reachable
# user check
def test_ansible_user(host):
    """ Check exists ansible user  """
    all_variables = host.ansible.get_variables()
    for i in all_variables["ansible_users"].values():
        user = host.user(i["name"])
        assert user.exists
        assert user.name == i["name"]
        assert user.shell == i["login_shell"]
        assert user.home == "/home/" + i["name"]
```

## Docker for Ansible test

Enable ssh systemd

### CentOS7

```bash
FROM centos:centos7
VOLUME [ "/sys/fs/cgroup" ]
RUN yum -y update; yum clean all
RUN yum -y install openssh-server passwd; yum clean all
RUN yum install -y which
RUN yum install -y https://repo.ius.io/ius-release-el7.rpm
RUN yum install -y sudo
RUN yum install -y wget
RUN yum install -y curl
RUN yum install -y sshpass
RUN echo 'root:password' | chpasswd
RUN mkdir /root/.ssh
RUN touch /root/.ssh/config
RUN echo $'Host *\n\
 \tStrictHostKeyChecking no\n\
 \n\
ServerAliveInterval 60 \n\
ServerAliveCountMax 10 \n '  >> /root/.ssh/config

RUN chmod 700 /root/.ssh/
RUN chmod 600 /root/.ssh/*

RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key -N ''
ENTRYPOINT ["/sbin/init"]
```

### Ubuntu20.04

```bash
FROM ubuntu:20.04
RUN apt-get update && \
    apt-get install -y software-properties-common \
                       tzdata

RUN apt-add-repository -y ppa:git-core/ppa && \
    apt-get update && \
    apt-get install -y git \
                       curl \
                       openssh-server \
                       vim \
                       sudo \
                       sshpass \
                       python3-pip
RUN mkdir /root/.ssh
RUN echo '\n\
Host *\n\
    StrictHostKeyChecking no\n\
' >> /root/.ssh/config

RUN chmod 700 /root/.ssh
RUN chmod 600 /root/.ssh/*

RUN echo 'root:root' | chpasswd
EXPOSE 22
CMD [ "/sbin/init" ]
```
