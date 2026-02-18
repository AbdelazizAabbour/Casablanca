<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Admin
        if (!User::where('email', 'admin@cabinethannit.ma')->exists()) {
            User::create([
                'name' => 'Admin',
                'email' => 'admin@cabinethannit.ma',
                'password' => Hash::make('password'),
                'is_admin' => true,
            ]);
        }

        $this->call([
            ServicesSeeder::class,
            DoctorsSeeder::class,
        ]);
    }
}
