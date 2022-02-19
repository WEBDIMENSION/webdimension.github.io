---
title: "汎用的なVagrant( CentOS7 )"
date: "2019-09-15 12:05:21"
post_modified: "2019-09-23 20:11:38"
description: " ' vagrant up' ワンコマンドで Git, Vimをインストール。ホスと側ssh-keyをコピー、.vimrcを git cloneする。'すぐに使える'がテーマ。設定ファイルを外部ファイル化し使い回しも楽。 "
categories: ["Linux"]
tags: ["CentOS7", "Vagrant", "開発環境"]
draft: false
---

# 汎用的な Vagrant( CentOS7 )

## おれおれ Vagrantfile

といっても特別なにかすごいことやってるわけでなく汎用的なテンプレートです。\
Docker のようなコンテナ型ではなくガチの CentOS 上で何か実験したい、遊びたい時などなど用途です。\
毎回一から構築するのは[めんどくさい]{.under_line}ので Vagrant の Provisioning で自動化します。

VirtualBOx,Vagrant はインストール済み前提です。
[Source](https://github.com/WEBDIMENSION/vagrant-centos7)

provision/provision/settings_local.yaml

```bash
vm:
 # Box名 なんでも可
 boxName: "centos7"
 # 元となるboxのURL
 boxURL: "https://vagrantcloud.com/centos/boxes/7/versions/1905.1/providers/virtualbox.box"
 # IPアドレスを指定
 localIP: "192.168.33.100"
sync:
 # 同期するディレクトリを配列で指定
  dir:
    - localPath: "../../workspace/http_doc"
      vmPath: "/var/www/html"
    - localPath: "../../workspace/mysql"
      vmPath: "/var/lib/mysql"
copyFiles:
 # Vagrantへコピーしたいファイル配列で指定
 # localPathで指定したファイルがVagrant上 /vagrant/に　fileNameに指定した名前でコピーされる。
 # command: に記述したコマンドを実行される。
 # 下記ではHost側のssh-keyをVagrantへコピー。sshやgit cloneなどHost側と同じ設定で行える
 # sshを多様する場合は ~/.ssh/config をコピーしてもよいかも。

  - fileName: "id_rsa.pub"
    localPath: "~/.ssh/id_rsa.pub"
    command: "cat /vagrant/id_rsa.pub >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys && rm /vagrant/id_rsa.pub"
  - fileName: "id_rsa"
    localPath: "~/.ssh/id_rsa"
    command: "cp /vagrant/id_rsa ~/.ssh/id_rsa && rm /vagrant/id_rsa"
  - fileName: ".bash_aliases"
    localPath: "~/.bash_aliases"
    command: "cp /vagrant/.bash_aliases ~/.bash_aliases && rm /vagrant/.bash_aliases"
```

Vagrantfile

```bash
# provision/settings-local.yml を load する
require 'yaml'
settings = YAML.load_file 'provision/settings_local.yaml'

# provision/settings-local.yml 内 copyFiles: をHost側の ~/vagrant/box名/ にコピーする。
# ここに置かれたファイルはVagrant 立ち上げ時Vagrant側 /vagrant/へコピーされる
settings['copyFiles'].each do |i|
  system('cp ' + i['localPath'] + ' ' + Dir.home + '/vagrant/' + settings['vm']['boxName']+ '/' + i['fileName'])
end

# provision/settings-local.yml 内の sync: の共有ディレクトリをマウント
# マウントタイプは デフォルトの virtualbox にしてますが Mac の場合は nfs もあり。
# nfs は早いがパーミッションにちょっと難あり? Win なら SMB?
settings['sync']['dir'].each do |i|
  #config.vm.synced_folder i['localPath'], i['vmPath'], type: "nfs", nfs_export: true
  config.vm.synced_folder i['localPath'], i['vmPath'], type: "virtualbox"
  end

# provision.sh では wget git をインストール しています。
  config.vm.provision :shell, :path => "provision/provision.sh"

# privileged: false はroot権限でなく一般ユーザー権限で実行
# ここでは bash_id, vim (lua,python3....)をインストール
  config.vm.provision :shell, privileged: false, :path => "provision/privileged.sh"

# provision/settings-local.yml 内 copyFiles: のコマンド実行
# run: "always" は Vagrant立ち上げ時 vagrant up --provision としなくても vagrant up でも実行される。
settings['copyFiles'].each do |i|
        $script = i['command']
        config.vm.provision :shell, run: "always", privileged: false, inline: $script
    end

# Vagrant側のHost名を設定
 $host_script = "hostnamectl set-hostname " + settings['vm']['hostName'].to_s
   config.vm.provision :shell, run: "always", inline: $host_script

# この場合は~/.ssh/configに
# host *
# 10     StrictHostKeyChecking no
# を追記。ssh接続の際の確認メッセージを無視する。
# vimrcをレポジトリからダウンロード をしてます。
config.vm.provision :shell, privileged: false, :path => "provision/custom_after.sh"
```

\~/vagrant/box_name に配置。

```bash
$ cd ~/vagrant/box_name/
$ vagrant up
```

でインストール開始。初回起動時は box を生成するため時間がかかります。\
壊れても

```bash
$ vagrant up --provision
```

すれば再生成されます。(時間かかるけど\...)
