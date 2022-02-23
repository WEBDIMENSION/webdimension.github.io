---
title: "python templateエンジン jinjya2"
date: "2022-02-23 03:15:17"
post_modified: "2022-02-23 03:15:17"
description: "jinjya2の使い方"
categories: ["BackEnd"]
tags: ["Python", "Jinjya2"]
draft: false
---

## Install

requirement.txt

```txt
Jinja2
```

```python
path_tpl = (pathlib.Path(__file__).parent.parent / 'tpl').resolve()
# print(path_tpl)
env = Environment(loader=FileSystemLoader(str(path_tpl)))
tpl = env.get_template('format.j2')
print(row_val['post_title'])
expect = replace_nr(row_val['post_excerpt'])
rendered_s = tpl.render(
    post_title=row_val['post_title'],
    post_date=row_val['post_date'],
    post_expect=expect,
    post_content=row_val['post_content'],
    categories=categories_list,
    tags=tags_list
)

print(rendered_s)
```

## Template

```txt
<head>
    <meta charset="utf-8" />
</head>
---<br/>
title: "{{post_title}}"<br/>
date: "{{post_date}}"<br/>
description: "{{post_expect}}"<br/>
categories: {{categories}}<br/>
tags: {{tags}}<br/>
---<br/>

<h1>{{post_title}}</h1>
{{post_content}}
```
