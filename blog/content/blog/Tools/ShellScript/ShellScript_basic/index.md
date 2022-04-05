---
title: "ShellScript よく使うパターン"
date: "2022-02-23 03:02:51"
post_modified: "2022-02-23 03:02:51"
description: "ShellScript ソースコピペ用"
categories: ["Tools"]
tags: ["Shell Script"]
draft: false
---

## 特殊パラメータ

| 変数名 | 内容                                                |
| ------ | --------------------------------------------------- |
| $#     | パラメータ数                                        |
| $?     | 直前のコマンドのステータス                          |
| $$     | プロセス ID                                         |
| $!     | 最後に実行したバックグラウンドコマンドのプロセス ID |

## declare

| オプション | 属性         |
| ---------- | ------------ |
| -r         | 読み取り専用 |
| -i         | 整数         |
| -a         | 配列         |
| -A         | 連想配列     |

```bash
# 等価
declare -r var1
readonly var1
```

## 連想配列

```bash
declare -A user=([id]=1 [name]=yamada [class]=A-1)
echo ${user[id]}
echo ${user[name]}
echo ${user[class]}
```

### 値の取得

```bash
echo "${user[@]}"
```

### キーの取得

```bash
echo "${!user[@]}"
```

## 変数の初期化

```bash
echo ${name:-yamada}
name=suzuki
echo ${name:-yamada}
```

## 算術

```bash
declare -i sum
sum=5+3
echo $sum
# 8
or

echo $((sum=5+3))
#8
```

## noclobber

```bash
set -o noclobber
touch abc.txt
ps > abc.txt
# Eror
```

```bash
set -o noclobber
touch abc.txt
ps >| abc.txt
# overwrite
```


## Get parameter

```bash
read -p $'\e[93mInstall(i) or Uninstall(u): ' action
if [ $action = 'i' ]; then
...
eactionlse
	echo 'Your iput is missig'
	read -p $'\e[93mInstall(i) or Uninstall(u): ' action
fi
```

## Loop

```bash
files=(.bashrc .zshrc .bash_profile)
	for file in ${files[@]}; do
	  if [ -e $HOME/$file ]; then
			for f in *.alias; do
				...
		  done < <(ls *)
		  echo ${END} >> $HOME/$file
	  fi
	done
```

## Replace between start and end

```bash
files=(.zshrc)
START="# import aliases start"
END="# import aliases end"
	 sed -i -e "/^${START}/,/^${END}/d" $HOME/$file
```

## Function

```bash
START="# import aliases start"
END="# import aliases end"
func_remove_text(){
	sed -i -e "/^${START}/,/^${END}/d" $1
}
	func_remove_text $HOME/$file
```

### 引数の数チェック

```bash
if [ $# != 1 ]; then
    echo "Please specify param"
    echo "ls: dump list"
    echo "rm: remove dumpfiles"
    exit 1
fi
```

## Specify enxtensin and loop

```bash
	for f in `find $DIR -maxdepth 1 -type f -name "*.alias"`; do
  		#echo "source $DIR/"${f%.*}"" >> $HOME/$file
			echo $f
  		echo "source $f" >> $HOME/$file
  done < <(ls *)
```

## Exec file path

```bash
#Drive$B!J%"!<%+%$%V!K(B/This path
DIR=$(cd $(dirname $0); pwd)
```

## OS 判定

```bash
if [ "$(uname)" == 'Darwin' ]; then
CONTAINER_PATH=~/Library/Containers/com.docker.docker/Data/vms/0/data/Docker.raw
elif [ "$(expr substr $(uname -s) 1 5)" == 'Linux' ]; then
CONTAINER_PATH=/var/lib/docker
elif [ "$(expr substr $(uname -s) 1 10)" == 'MINGW32_NT' ]; then
CONTAINER_PATH=
else
echo "Your platform ($(uname -a)) is not supported."
exit 1
fi
```

## color

```bash
echo -e $'\e[96m'
```

## 表示㝮整形

```bash
docker ps --format 'table {{.Image}} {{.Names}} {{.Status}}' | column -t
```

## 指定間隔㝧実行

```bash
while true;do
  func_docker_disk_used;sleep 30;echo ""
done
```

## 実行絝果を変数へ保存

```bash
func_docker_disk_used(){
 somue
}
result=$(ls -klsh $CONTAINER_PATH)
used_total=`echo $result | awk '{ print $1 }'`
}
```

## Progress

```bash
prog() {
    local w=80 p=$1;  shift
    clear
    # create a string of spaces, then change them to dots
    printf -v dots "%*s" "$(( $p*$w/100 ))" ""; dots=${dots// /.};
    # print those dots on a fixed-width space plus the percentage etc.
    printf "\r\e[K|%-*s| %3d %% %s" "$w" "$dots" "$p" "$*";
}
# test loop

func_after_exec(){
  for x in {1..100} ; do
      prog "$x"  working...
      sleep 0.04   # do some work here
  done ; echo
  clear
  globalIp
}
```

## 変換

```bash
# " を削除
ip=$(echo $result | jq '.ip' | sed 's/"//g')
```

## Exists チェック

### Dir

```bash
  if [ ! -d $SOME_PATH ]; then

  fi
```

### File

```bash
  if [ ! -f $SOME_PATH ]; then

  fi
```

## Path

```bash
# 現在のPATHを絶対PATHへ
cd $(cd $(dirname $0); pwd)
# 現在のPATHを絶対PATHへ から移動
cd $(cd $(dirname $0)/../../../; pwd)
```

## env ファイル読み込み

```bash
source ./.env
```

## ディレクトリ内のファイルをループ

```bash
for file in "$HTML_DIR"/*.html; do
```

## ファイル名から拡張子を除去

```bash
filename=$(basename "$file" | cut -f 1 -d '.')
```
