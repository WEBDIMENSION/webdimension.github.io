---
title: "laravel middleware で access履歴"
date: "2020-12-15 11:56:02"
post_modified: "2020-12-15 11:56:02"
description: "Laravel middleware を実践してみる"
categories: ["Programing"]
tags: ["PHP", "Laravel"]
draft: false
---

# laravel middleware で access 履歴

## Model Middleware 登録

```bash
// Model 作成
php artisan make:model Models/Admin/AccessReport -m
// Middleware 作成
php artisan make:middleware AccessReportMiddleware
```

### Models/Admin/AccessReport.php

```php
namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Model;

class AccessReport extends Model
{
    // カラム CREATED_AT を 'access_datetime'に変更
    const CREATED_AT = 'access_datetime';
    const UPDATED_AT = null;
    // Table名を'access_report'と指定
    protected $table = 'access_report';
    // primary key を admin_id と指定
    protected $primaryKey = 'admin_id';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        // 変更許可カラム
        'staff_id', 'execution_file', 'from_ipaddress', 'project_id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
    ];

}
```

## laravel/app/Http/Middleware/AccessReportMiddleware.php

```php
namespace App\Http\Middleware;

use Closure;
use App\Models\Admin\AccessReport;
use \Route;

class AccessReportMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        $this->accessReport($request, $response->status());

        return $response;
//        return $next($request);
    }
    public function accessReport($request, $status)
    {
        $user = $request -> user();
        $data = [
//            'staff_id' => $user ? $user->id : 0,
            'staff_id' => 1,
            'execution_file' => $request -> path(), // URIを格納
            'from_ipaddress' => $request -> ip(), //アクセス元IPを格納
            'project_id' => 0,
        ];
        AccessReport::create($data);
    }
}
```

## App/Http/Kernel.php

```php
    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        // Middleware へ 登録
        'acr' => \App\Http\Middleware\AccessReportMiddleware::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'bindings' => \Illuminate\Routing\Middleware\SubstituteBindings::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
    ];
```

## database/migrations/[DATETIME]\_create_access_reports_table.php

```php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAccessReportsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('access_report', function (Blueprint $table) {
            $table->bigIncrements('report_id');
            $table->bigInteger('staff_id');
            $table->text('execution_file');
            $table->char('from_ipaddress', 15);
            $table->dateTime('access_datetime');
            $table->bigInteger('project_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('access_report');
    }
}
```

-
