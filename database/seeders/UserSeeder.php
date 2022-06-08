<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'atk',
            'email' => 'atk@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'hpe',
            'email' => 'hpe@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'sds',
            'email' => 'sds@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'ttm',
            'email' => 'ttm@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'mnw',
            'email' => 'mnw@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'hl',
            'email' => 'hl@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
