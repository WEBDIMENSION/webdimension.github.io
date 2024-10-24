# Frontmatter

## vscode

```json
    "vsnote_template_blog": {
"prefix": "blog_frontmatter",
"body": [
"---",
"title: \"$1\"",
"date: \"$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND\"",
"post_modified: \"$CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND\"",
"description: \"\"",
"categories: [\"\"]",
"tags: [\"\", \"\", \"\"]",
"topics: \"\"",
"draft: true",
"---",
"",
"",
"## ",
"",
],
"description": "blog Template",
},
```

## Idea

```markdown
---
title: ""
date: "$DATE$"
post_modified: "$DATE$"
description: ""
categories: [""]
tags: [""]
draft: false
---

##     

```

Variable $DAT$ : date("Y-MM-dd hh:mm:ss")

---
