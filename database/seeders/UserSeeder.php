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
            'name' => 'Aye Thi Khaing',
            'email' => 'atk@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Hlaine Poe Ei',
            'email' => 'hpe@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Sandar Su',
            'email' => 'sds@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Theint Theint Hmwe',
            'email' => 'ttm@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Myo Naing Winn',
            'email' => 'mnw@gmail.com',
            'password' => Hash::make('password'),
        ]);

        User::create([
            'name' => 'Htet Linn',
            'email' => 'hl@gmail.com',
            'password' => Hash::make('password'),
        ]);
    }
}
