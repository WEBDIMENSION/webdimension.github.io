---
title: "Laravel login機能追加"
date: "2020-12-15 13:02:54"
post_modified: "2020-12-15 13:02:54"
description: "Laravelにログイン機能追加の一例"
categories: ["Programing"]
tags: ["PHP", "Laravel"]
draft: false
---

# Laravel login 機能追加

## Setup

### Create Model Dir

```bash
mkdir -p App/Models/Admin
```

### Create Controller Dir

```bash
mkdir -p App/Http/Controllers/
```

### Create Model and table

```bash
php artisan make:model Models/Admin/Admin -m
```

### Copy Auth

```bash
cp -rf App/Http/Controllers/auth App/Http/Controllers/Admin/auth
```

### Copy HomeController

```bash
cp App/Http/Controllers/HomeController.php App/Http/Controllers/Admin/HomeController.php
```

### Views

```bash
cp /resources/views/home.blade.php /resources/views/admin/home.blade.php
cp /resources/views/auth/login.blade.php /resources/views/admin/auth/login.blade.php
```

### Add admin-routing

```bash
touch /routes/admin.php
```

## Admin Login

### App/Models/Admin/Admin.php

```bash
# Table固有設定追記
    const CREATED_AT = 'reg_date';
    const UPDATED_AT = 'upd_date';
    protected $table = 'admin';
    protected $primaryKey = 'admin_id';

...
...
...
...
# Password カラム指定
    public function getAuthPassword()
    {
        return $this->pass;
    }
```

### App/Http/Controllers/Admin/HomeController.php

```bash
#middlewear auth.admin に設定
$this->middleware('auth:admin');
```

### App/Http/Controllers/Admin/Auth/LoginController.php

```bash
# Redirect URL when login success
protected $redirectTo = '/admin/home';
...
...
...
# Add middlewear admin
public function __construct()
    {
        $this->middleware('guest:admin')->except('logout'); //変更
    }
...
...
...
# 管理者認証のguardを指定
    protected function guard()
    {
        return \Auth::guard('admin');
    }
...
...
...
# View login-form
public function showLoginForm()
    {
        return view('admin.login');  //変更
    }
...
...
...
# Login logic
    public function login(Request $request)
    {
        // Validate the form data
        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required|min:3'
        ]);
        // Attempt to log the user in
        if (Auth::guard('admin')->attempt(['email' => $request->email, 'password' => $request->password], $request->remember)) {
            // if successful, then redirect to their intended location
            return redirect()->intended(route('admin.home'));
        }

        // if unsuccessful, then redirect back to the login with the form data
        return redirect()->back()->withInput($request->only('email', 'remember'));
    }
...
...
...
# Login-key column name
    public function username() // このメソッドを追記
    {
        return 'email';
    }
```

### config/auth.php

```bash
    'defaults' => [
      - 'guard' => 'web',
      + 'guard' => 'user',
        'passwords' => 'users',
    ],
...
...
...

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],
        'user' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
            'hash' => false,
        ],
    +   'admin' => [
    +       'driver' => 'session',
    +       'provider' => 'admins',
    +   ],
    ],

...
...
...

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\User::class,
        ],
    +    'admins' => [
    +        'driver' => 'eloquent',
    +        'model' => App\Models\Admin\Admin::class,
    +    ]
...
...
...

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,
            'throttle' => 60,
        ],
    +    'admins' => [
    +        'provider' => 'admins',
    +        'table' => 'password_resets',
    +        'expire' => 15
    +    ]
    ],
```

### app/Exceptions/Handler.php

```php
//追記
<?php
    /**
     * Convert an authentication exception into an unauthenticated response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Illuminate\Auth\AuthenticationException  $exception
     * @return \Illuminate\Http\Response
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }
        if (in_array('admin', $exception->guards(), true)) {
            return redirect()->guest(route('admin.login'));
        }

        return redirect()->guest(route('login'));
    }
```

## Admin Faker

```bash
php artisan make:factory AdminFactory
```

```php
// database/seeds/AdminsTableSeeder.php
    public function run()
    {
        //
        DB::table('admins')->insert([
            ['id' => '1',
                'email' => 'admin@sports-funding.com',
                'password' => Hash::make('password'),
                'name' => '管理者てすと',
                'name_kana' => 'かんりしゃてすと',
                'company_name' => '株式会社テスト',
                'created_at' => date('Y-m-d H:i:s'),
                'deleted_at' => null,
            ],
            ['id' => '2',
                'email' => 'admin2@sports-funding.com',
                'password' => Hash::make('password'),
                'name' => '山田太郎',
                'name_kana' => 'やまだたろう',
                'company_name' => '株式会社山田',
                'created_at' => date('Y-m-d H:i:s'),
                'deleted_at' => date('Y-m-d H:i:s'),
            ],
        ]);

      factory(App\Models\Admin\Admin::class, 30)->create();
    }
```

```php
// database/factories/AdminFactory.php
use App\Models\Admin\Admin;
use Illuminate\Support\Facades\Hash;
use Faker\Generator as Faker;

$factory->define(Admin::class, function (Faker $faker) {
    return [
        'email' => $faker->email,
            'password' => Hash::make('password'),
        'name' => $faker->name,
        'name_kana' => $faker->kanaName,
        'company_name' => $faker->company,
    ];
});
```
