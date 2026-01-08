<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::firstOrCreate(
            [
                'name' => 'Super Admin',
                'email' => 'superadmin@gmail.com',
                'phone' => '081211112222',
                'password' => 'admin123',
                'role' => 3
                // 'email_verified_at' => now(),
            ]
        );
    }
}
