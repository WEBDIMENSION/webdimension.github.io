---
title: "Laravel Varidation"
date: "2020-12-15 13:24:38"
post_modified: "2020-12-15 13:24:38"
description: "Laravel varidationの一例"
categories: ["BackEnd"]
tags: ["PHP", "Laravel"]
draft: false
---

# Laravel Varidation

_Controler 内_

```php
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'last_name' => ['required', 'string', 'max:32'],
            'first_name' => ['required', 'string', 'max:32'],
            'last_name_kana' => ['required', 'string', 'max:32','katakana'],
            'first_name_kana' => ['required', 'string', 'max:32','katakana'],
            'email' => ['required', 'string', 'email', 'max:128', 'unique:players'],
            'new_password' => ['required', 'string', 'min:8','same:password_confirm'],
        ]);
    }
```

_Example login_

```php
    public function login(Request $request)
    {
        // Validate the form data
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:3'
        ]);
//        echo $request->email;
        // Attempt to log the user in
        if (Auth::guard('player')->attempt(['email' => $request->email, 'password' => $request->password,'deleted_at' => null], $request->remember)) {
            // if successful, then redirect to their intended location
            return redirect()->intended(route('player.home'));
        }

        // if unsuccessful, then redirect back to the login with the form data
        return redirect()->back()->withInput($request->only('email', 'remember'));
    }
```
