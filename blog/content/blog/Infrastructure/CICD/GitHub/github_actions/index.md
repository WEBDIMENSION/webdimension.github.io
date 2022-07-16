---
title: "Github Actions 基本"
date: "2020-12-14 13:59:44"
post_modified: "2020-12-14 13:59:44"
description: "Github Actions, Act (GitHub Actions の local実行)"
categories: ["Infrastructure"]
tags: ["Linux", "Docker", "GitHub Actions"]
draft: false
---

## Github Actions 基本

### GitHub Actions

Project top dir に .github/workflows を作る

```bash
mkdir -p .github/workflows
```

workflow ファイルを作成

```bash
vim tests.yml
```

\*参照\
[VPN サーバー(SoftEhter)を Ansible で Conoha-VPN サーバーへ構築](https://github.com/WEBDIMENSION/ansible-softether-for-conoha)

```yaml
name: softeher_tests
on:
  push:
    branches: [ develop ] # Branch:develop へpush時に実行
  pull_request:
    branches: [ master ] # Branch:maser へプルリクエスト時に実行

jobs:
  build:
    runs-on: ubuntu-1804 # Ubuntu18.04イメージを使用
    steps:
      - uses: actions/checkout@v2
      - name: docker server start
        run: |
          docker build -f dockerfiles/centos7/Dockerfile . -t softether_server
          docker run -itd --privileged --name softether_server softether_server
          sleep 5
          container_ip=$(docker inspect --format "{{ .NetworkSettings.IPAddress }}" softether_server)
          echo "server ip :  $container_ip"
          echo "
          [softether]
          $container_ip
          [softether:vars]
          ansible_user=root
          ansible_ssh_pass=password
          " >> hosts/act_root

          echo "
          [softether]
          $container_ip
          [softether:vars]
          ansible_user=ansible
          ansible_port=50022
          ansible_ssh_private_key_file=roles/ansible_user/files/ansible_rsa
          " >> hosts/act_user

          ls -ls hosts/*

          mkdir /github/home/.ssh
          chmod 700 /github/home/.ssh
          echo "Host *
                StrictHostKeyChecking no

          ServerAliveInterval 60
          ServerAliveCountMax 10"  >> /github/home/.ssh/config

          chmod 600 /github/home/.ssh/config
          cat /github/home/.ssh/config

          apt -y install make build-essential libssl-dev zlib1g-dev libbz2-dev \
          libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
          xz-utils tk-dev libffi-dev liblzma-dev

          curl -L https://github.com/pyenv/pyenv-installer/raw/master/bin/pyenv-installer | bash
          export PATH="/github/home/.pyenv/bin:$PATH"
          pyenv install 3.6.7
          pyenv global 3.6.7
          /github/home/.pyenv/shims/pip install -r requirements.txt

          /github/home/.pyenv/shims/ansible-lint site.yml
          /github/home/.pyenv/shims/black tests tests.py deploy deploy.py
          /github/home/.pyenv/shims/flake8 tests tests.py deploy deploy.py

          echo 'password' >> vaultpass
          /github/home/.pyenv/shims/ansible-playbook site.yml -i hosts/act_root -t softether
          /github/home/.pyenv/shims/ansible-playbook site.yml -i hosts/act_user -t tools

          /github/home/.pyenv/shims/py.test -v tests/testinfra.py \
          --connection=ssh \
          --hosts='ansible://softether' \
          --ansible-inventory='hosts/act_user' \
          --ssh-config='/github/home/.ssh/config'

# todo: variable from vars_file
```

### Matirx

```yaml
# Example
name: tests
on:
  push:
    branches: [ develop ]
  pull_request:
    branches: [ master ]

jobs:
  build:
    strategy:
      matrix:
        docker_image: [ ubuntu18.04, ubuntu20.04 ] # <- 指定したイメージで実行
    runs-on: ${{ matrix.docker_image }}-latest
    env:
      DOCKER_USER: "vagrant"
    steps:
      - uses: actions/checkout@v2
      - name: docker build
        run: |
          docker build -f dockerfiles/${{ matrix.docker_image }}/Dockerfile . -t ${{ matrix.docker_image }}
          docker run -itd --privileged --name ${{ matrix.docker_image }} ${{ matrix.docker_image }}
          sleep 5

      - name: Ansible
        run: |
          container_ip=$(docker inspect --format "{{ .NetworkSettings.IPAddress }}" ${{ matrix.docker_image }})
          echo "ssh :  ${{ env.DOCKER_USER }}@$container_ip"
          chmod 600 .ssh/ansible_rsa
          ssh -o StrictHostKeyChecking=no ${{ env.DOCKER_USER }}@$container_ip -i .ssh/ansible_rsa "cd  ~/ansible && \
          pip3 install -r requirements.txt && \
          source ~/.profile && \
          ansible-lint site.yml && \
          black && \
          flake8 tests && \
          ansible-playbook -i hosts/develop site.yml -l ${{ matrix.docker_image }}"
```

### ACT ( Exec Github Actions on local )

Install for Linux , Mac

```bash
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

Ansible tasks

```yaml
---
# tasks file for roles/act
- name: check installed act
  command: bash -lc "act --version"
  register: act_exists
  changed_when: False
  ignore_errors: yes

- name: Install act
  become: yes
  shell: |
    bash -lc "curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash"
  when: act_exists is failed
```
