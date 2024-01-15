<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Credit_typeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('credit_type')->insert([
            'description_type' => 'Libre inversion',
            'percentage_type' => (2.5/100)
        ]);

        DB::table('credit_type')->insert([
            'description_type' => 'Vivienda',
            'percentage_type' => (1.3/100)
        ]);
    }
}
