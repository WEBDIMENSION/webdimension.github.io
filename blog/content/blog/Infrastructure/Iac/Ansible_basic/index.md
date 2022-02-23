---
title: "インフラ構成ツール Ansible の基本知識"
date: "2022-02-23 01:06:13"
post_modified: "2022-02-23 01:06:13"
description: "IAS ( Infrastructure As Code )。インフラ構成をコード化して効率アップ"
categories: ["Infrastructure"]
tags: ["Ansible", "IaC"]
draft: false
---

### Create Role

```bash
ansible-galaxy init (your_role_name)
#example
ansible-galaxy init roles/nginx
```

```bash
# tree
defaults/
  - main.yml #varriable
files/  # fileモジュールで使用するファイル格納用ディレクトリ
handlers/
  - main.yml # restart nginx などのhandle
meta/
  - main.yml #依存関係dependencies:[pyenv]
tasks/
  - main.yml # mainのタスクを記述
templates/ #「template」というモジュールでファイルを転送する際に使うファイル
tests/  # travisCi で使用する
  - inventory
  - test.yml
vars/
  - main.yml #variable
```

#### varriable の優先順位 低い順

```txt
role defaults
inventory file or script group vars
inventory group_vars/all
playbook group_vars/all
inventory group_vars/*
playbook group_vars/*
inventory file or script host vars
inventory host_vars/*
playbook host_vars/*
host facts / cached set_facts
play vars
play vars_prompt
play vars_files
role vars (defined in role/vars/main.yml)
block vars (only for tasks in block)
task vars (only for the task)
include_vars
set_facts / registered vars
role (and include_role) params
include params
extra vars (always win precedence)
```

### Exec

```bash
# All
ansible-playbook -i hosts/develop site.yml -l vagrant_ubuntu20
# Tag
ansible-playbook -i hosts/develop site.yml -l vagrant_ubuntu20 -t tag
# Skip tag
ansible-playbook -i hosts/develop site.yml -l vagrant_ubuntu18 --skip-tags tag
```

#### hosts/develop

```yaml
[ develop ]
  vagrant_ubuntu20 ansible_host=127.0.0.1 ansible_connection=local ansible_python_interpreter=/usr/bin/python3
  [ ubuntu20 ]
  vagrant_ubuntu20
```

`vagrant_ubuntu20` は`[develop]` `ubuntu200` に所属するため以下が適応される

- group_vars/develop.yml
- group_vars/ubuntu20.yml
- host_vars/ubuntu20.yml

#### site.yml

```yaml
---
- name: develop
  hosts: develop

  roles:
    - role: common
      tags:
        - common
    - role: ssh_config
      tags:
        - ssh_config
```

### ansible-lint

```bash
ansible-lint site.yml

```

#### .ansible.int

```yaml
parseable: true
quiet: true
skip_list:
  - metadata
  - "208"
  - "204"
  - "306"
  - "401"
use_default_rules: true
verbosity: 1
```

### .ansible.cfg

```ini
[defaults]
deprecation_warnings = False
display_skipped_hosts = no
timeout = 300
```
