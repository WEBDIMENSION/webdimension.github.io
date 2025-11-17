---
title: "Mac us キーボードでのParallelsDesktop(win)の日本語入力切り替え"
date: "2025-11-17 01:10:44"
post_modified: "2025-11-17 01:10:44"
description: "Mac us キーボードでのParallelsDesktop(win)の日本語入力切り替え"
categories: ["Tools"]
tags: ["MAC"]
draft: false
---

##  ParallelsDesktopのWindowsの日本語入力をMACと合わせたい。

環境 
- mac usキーボード
- parallelsDesktop(win)

Mac上では
- 右cmd -> 日本語
- 左cmd -> 英数

としている。

Parallels上のWindowsでは `SHIFT + Space` で　
 日本語、英語を切り替えていたが Window上でも同じ操作でありたい。

- 右win -> 日本語
- 左win -> 英数

必須アプリ
Mac側 karabiner-elements
Windows側 AutoHotKey (ver2)


karabiner.json 追記

```json
          {
            "description": "コマンドキーを単体で押したときに、英数・かなキーを送信する。（左コマンドキーは英数、右コマンドキーはかな）",
            "manipulators": [
              {
                "type": "basic",
                "from": {
                  "key_code": "left_command",
                  "modifiers": {
                    "optional": [
                      "any"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "left_command"
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "japanese_eisuu"
                  }
                ],
                "conditions": [
                  {
                    "type": "frontmost_application_unless",
                    "bundle_identifiers": [
                      "^com\\.parallels\\.desktop$",
                      "^com\\.parallels\\.vm$",
                      "^com\\.parallels\\.desktop\\.console$",
                      "^com\\.parallels\\.winapp\\."
                    ]
                  }
                ]
              },
              {
                "type": "basic",
                "from": {
                  "key_code": "right_command",
                  "modifiers": {
                    "optional": [
                      "any"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "right_command"
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "japanese_kana"
                  }
                ],
                "conditions": [
                  {
                    "type": "frontmost_application_unless",
                    "bundle_identifiers": [
                      "^com\\.parallels\\.desktop$",
                      "^com\\.parallels\\.vm$",
                      "^com\\.parallels\\.desktop\\.console$",
                      "^com\\.parallels\\.winapp\\."
                    ]
                  }
                ]
              },
              {
                "type": "basic",
                "from": {
                  "key_code": "left_command",
                  "modifiers": {
                    "optional": [
                      "any"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "left_command"
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "f9",
                    "modifiers": [
                      "left_shift",
                      "left_control"
                    ]
                  }
                ],
                "conditions": [
                  {
                    "type": "frontmost_application_if",
                    "bundle_identifiers": [
                      "^com\\.parallels\\.desktop$",
                      "^com\\.parallels\\.vm$",
                      "^com\\.parallels\\.desktop\\.console$",
                      "^com\\.parallels\\.winapp\\."
                    ]
                  }
                ]
              },
              {
                "type": "basic",
                "from": {
                  "key_code": "right_command",
                  "modifiers": {
                    "optional": [
                      "any"
                    ]
                  }
                },
                "to": [
                  {
                    "key_code": "left_command"
                  }
                ],
                "to_if_alone": [
                  {
                    "key_code": "f11",
                    "modifiers": [
                      "left_shift",
                      "left_control"
                    ]
                  }
                ],
                "conditions": [
                  {
                    "type": "frontmost_application_if",
                    "bundle_identifiers": [
                      "^com\\.parallels\\.desktop$",
                      "^com\\.parallels\\.vm$",
                      "^com\\.parallels\\.desktop\\.console$",
                      "^com\\.parallels\\.winapp\\."
                    ]
                  }
                ]
              }
            ]
          },
```

autoHotKey.ahk

```txt
/*** Parallels Windows ***/
+^F9::Send "{vk1D}"
+^F11::Send "{vk1C}"
```

これでMacもWindowsも同じ操作で快適。