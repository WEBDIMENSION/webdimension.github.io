---
title: "Laravel migration seed facker"
date: "2020-12-15 13:11:09"
post_modified: "2020-12-15 13:11:09"
description: "Seeder , Fackerを使ってテスト様データを生成"
categories: ["BackEnd"]
tags: ["PHP", "Laravel"]
draft: false
---

## Laravel migration seed facker

___データ再生時によく使う___

```bash
php artisan migrate:refresh --seed
```

### faker,seeder

```php
    public function run()
    {
        // 以下の userを作成
        DB::table("users")->insert([
            'name' => 'hogehoge',
            'email' => 'hoge@hogehoge.com',
            'email_verified_at' => now(),
            'password' => Hash::make('pass'),
            'remember_token' => Str::random(10),
            'created_at' => now(),
            'updated_at' => now()
        ]);
         // database/factories/UserFactory.php を 10回実行
        factory(App\User::class, 10)->create();
```

```php
// database/factories/UserFactory.php
$factory->define(User::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'remember_token' => Str::random(10),
    ];
});
```

### seedr relation 例

```php
    public function run()
    {
        $test_player = [
            ['id' => '1',
                'last_name' => 'Yamada',
                'first_name' => 'Taro',
                'last_name_kana' => 'ヤマダ',
                'first_name_kana' => 'タロウ',
                'email' => 'yamada@hoge.com',
                'password' => Hash::make('password'),
                'type' => '1',
                'introduction' => 'Yamada Taroのテストイントロダクション',
                'player_image' => 'YamadaTaro.jpg',
                'organization' => 'Yamada Taro所属のテスト',
                'publish' => '0',
                'created_at' => date('Y-m-d H:i:s'),
                'deleted_at' => null,
            ],
            ['id' => '2',
                'last_name' => 'Tanaka',
                'first_name' => 'Ichiro',
                'last_name_kana' => 'タナカ',
                'first_name_kana' => 'Ichiro',
                'email' => 'tanaka@hoge.com',
                'password' => Hash::make('password'),
                'type' => '2',
                'introduction' => 'Tanaka Ichiroのテストイントロダックション',
                'player_image' => 'TanakaIchiro.jpg',
                'organization' => 'TanakaIchiro所属のテスト',
                'publish' => '1',
                'created_at' => date('Y-m-d H:i:s'),
                'deleted_at' => date('Y-m-d H:i:s'),
            ],
        ];

        for ($i = 0; $i < count($test_player); $i++) {
            // Create　User
            DB::table('players')->insert(
                $test_player[$i]
            );

            factory(Project::class, 1)->create(  // Project model 1回実行
                [
                    'player_id' => $test_player[$i]['id'],
                    'name' => $test_player[$i]['last_name'] . $test_player[$i]['first_name'] . ' - testProject',
                    'type' => 2,
                ]
            )
                // Reration
                ->each(function ($project) {
                    // reword
                    $project->rewards()->savemany(factory(Reward::class, 1)->create(
                        [
                            'admin_id' => $project->admin_id,
                            'project_id' => $project->id,
                        ]
                    ))->each(
                // Reration
                        function ($reward) {
                            $reward->orders()->savemany(factory(Order::class, rand(1, 3))->create(
                                [
                                    'reward_id' => $reward->id,
                                    'amount' => $reward->amount,
                                ]
                            ))->each(
                                function ($order) {
                                    $order->orderLog()->save(factory(OrderLog::class)->create(
                                        [
                                            'id' => $order->id,
                                            'amount' => $order->amount,
                                        ]
                                    ));
                                }
                            );
                        }
                    );
                    // article
                    $project->articles()->savemany(factory(Article::class, rand(1, 5))->create(
                        [
                            'project_id' => $project->id,
                        ]
                    ))
                        ->each(
                            function ($article) {
                                // article image
                                $article->articleImages()->savemany(factory(ArticleImage::class, rand(1, 3))->create(
                                    [
                                        'article_id' => $article->id,
                                    ]
                                ));
                            }
                        );
                });
            // project
            factory(Project::class, rand(1, 5))->create(
                [
                    'name' => $test_player[$i]['last_name'] . $test_player[$i]['first_name'] . ' - testProject2',
                    'player_id' => $test_player[$i]['id'],

                ]
            )
                ->each(function ($project) {
                    // reword
                    $project->rewards()->savemany(factory(Reward::class, rand(1, 3))->create(
                        [
                            'admin_id' => $project->admin_id,
                            'project_id' => $project->id,
                        ]
                    ))->each(
                        function ($reward) {
                            $reward->orders()->savemany(factory(Order::class, rand(1, 3))->create(
                                [
                                    'reward_id' => $reward->id,
                                    'amount' => $reward->amount,
                                ]
                            ))->each(
                                function ($order) {
                                    $order->orderLog()->save(factory(OrderLog::class)->create(
                                        [
                                            'id' => $order->id,
                                            'amount' => $order->amount,
                                        ]
                                    ));
                                }
                            );
                        }
                    );
                    // article
                    $project->articles()->savemany(factory(Article::class, rand(1, 5))->create(
                        [
                            'project_id' => $project->id,
                        ]
                    ))
                        ->each(
                            function ($article) {
                                // article image
                                $article->articleImages()->savemany(factory(ArticleImage::class, rand(1, 3))->create(
                                    [
                                        'article_id' => $article->id,
                                    ]
                                ));
                            }
                        );
                });

        }

        factory(Player::class, 50)->create()
            ->each(function ($player) {

                // funclub
                $player->projects()->savemany(factory(Project::class, 1)->create(
                    [
                        'player_id' => $player->id,
                        'name' => $player->last_name . $player->first_name . ' - testProject',
                        'type' => 2,
                    ]
                ))
                    ->each(function ($project) {
                        // reword
                        $project->rewards()->savemany(factory(Reward::class, 1)->create(
                            [
                                'admin_id' => $project->admin_id,
                                'project_id' => $project->id,
                            ]
                        ))->each(
                            function ($reward) {
                                $reward->orders()->savemany(factory(Order::class, rand(1, 3))->create(
                                    [
                                        'reward_id' => $reward->id,
                                        'amount' => $reward->amount,
                                    ]
                                ))->each(
                                    function ($order) {
                                        $order->orderLog()->save(factory(OrderLog::class)->create(
                                            [
                                                'id' => $order->id,
                                                'amount' => $order->amount,
                                            ]
                                        ));
                                    }
                                );
                            }
                        );
                        // article
                        $project->articles()->savemany(factory(Article::class, rand(1, 5))->create(
                            [
                                'project_id' => $project->id,
                            ]
                        ))
                            ->each(
                                function ($article) {
                                    // article image
                                    $article->articleImages()->savemany(factory(ArticleImage::class, rand(1, 3))->create(
                                        [
                                            'article_id' => $article->id,
                                        ]
                                    ));
                                }
                            );
                    });

                // project
                $player->projects()->savemany(factory(Project::class, rand(1, 5))->create(
                    [
                        'player_id' => $player->id,
                        'name' => $player->last_name . $player->first_name . ' - testProject2',
                    ]
                ))
                    ->each(function ($project) {
                        // reword
                        $project->rewards()->savemany(factory(Reward::class, rand(1, 3))->create(
                            [
                                'admin_id' => $project->admin_id,
                                'project_id' => $project->id,
                            ]
                        ))->each(
                            function ($reward) {
                                $reward->orders()->savemany(factory(Order::class, rand(1, 3))->create(
                                    [
                                        'reward_id' => $reward->id,
                                        'amount' => $reward->amount,
                                    ]
                                ))->each(
                                    function ($order) {
                                        $order->orderLog()->save(factory(OrderLog::class)->create(
                                            [
                                                'id' => $order->id,
                                                'amount' => $order->amount,
                                            ]
                                        ));
                                    }
                                );
                            }
                        );
                        // article
                        $project->articles()->savemany(factory(Article::class, rand(1, 5))->create(
                            [
                                'project_id' => $project->id,
                            ]
                        ))
                            ->each(
                                function ($article) {
                                    // article image
                                    $article->articleImages()->savemany(factory(ArticleImage::class, rand(1, 3))->create(
                                        [
                                            'article_id' => $article->id,
                                        ]
                                    ));
                                }
                            );
                    });
            });
    }
```
