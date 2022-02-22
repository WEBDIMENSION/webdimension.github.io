---
title: "Intellij IDEA connect to backlog"
date: "2022-02-23 00:44:01"
post_modified: "2022-02-23 00:44:01"
description: "Intellij IDEA を Backlog をつなぎ IDEA上で Issueなどかくk人"
categories: ["Tools"]
tags: ["Intellij IDEA", "Backlog"]
draft: false
---

## backlog task for Intellij IDEA

```bash
{serverUrl}/api/v2/issues?assigneeId%5B%5D={assigneeId}&apiKey={apiKey}
```

```bash
{serverUrl}/api/v2/issues{issueId}?apiKey={apiKey}
```

url="https://${SPACE}.backlog.jp/api/v2/issues/xxxxxxx?apiKey=${API_KEY}"
