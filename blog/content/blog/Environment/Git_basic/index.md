---
title: "Git 基本コマンド"
date: "2022-02-23 00:49:30"
post_modified: "2022-02-23 00:49:30"
description: "Gitコマンド カンニング用"
categories: ["Environment"]
tags: ["Git"]
draft: false
---

## Git Submodule

### Add submodule

```bash
git submodule add git@github.com:xxxxxxxxx
```

### Confirm submodule

```bash
git submodul
```

### Operetion

_Edit_
In submodule

```bash
git add .
git commit -m ''
git push
```

In Parent

```bash
git add .
git commit -m ''
git push
```

_other woker_

```bash
git pull
git submodule update -i
```

### Delete submodule

```bash
git submodule deinit repository
git rm -rf repository
vi .gitmodule
```

delete submodule

```bash
.git/config
```

delete submodule

```bash
rm -rf .git/modules/SUBMODULE
```

## Git stash

Save

```bash
git stash save
```

List

```bash
git stash list
```

Rstore

```bash
git stash apply stash@{0}
git stash apply stash@{0} --index
```

Delete

```bash
git stash drop stash@{0}
```

## Git commit

Reset 1 previous

```bash
git reset --hard HEAD^
git reset --soft HEAD^
```

## Change commit massage

```bash
git commit --amend
```

## Commit clearup

```bash
# when not commit
git commit --fixup <target hash>
git rebase -i --autosquash <the on before target hash >
# when commited
git rebase -i  <the on before target hash >

tppkgit rebase -i --autosquash c441d237826d5f90d3cbebcaf741c7edaf06ce90
```

## Git branch

```bash
# list
git branch -a
# Create
git checkout -b
```

## Git log

```bash
# all
git log
# lines
git log -5
# Date
git log --since=2017-12-1
git log --until=2017-12-1
# Branch

git log ex
```

## git rebase

```bash
# git rebase
git rebase -i <hush_num>
#git rebase delete
git rebase --abort
```
