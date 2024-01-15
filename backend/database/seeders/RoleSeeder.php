<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'Administrator']);
        $client = Role::create(['name' => 'Client']);
        $adviser = Role::create(['name' => 'Adviser']);
        $manager = Role::create(['name' => 'GeneralManager']);

        Permission::create(['name' => 'user.index'])->syncRoles([$admin,$manager]);
        Permission::create(['name' => 'user.create'])->syncRoles([$admin,$manager]);
        Permission::create(['name' => 'user.show'])->syncRoles([$admin,$manager]);
        Permission::create(['name' => 'user.update'])->syncRoles([$admin]);
        Permission::create(['name' => 'user.delete'])->syncRoles([$admin]);

        Permission::create(['name' => 'application.create'])->syncRoles([$client]);
        Permission::create(['name' => 'application.show'])->syncRoles([$manager,$adviser,$client]);
        Permission::create(['name' => 'application.update'])->syncRoles([$manager,$adviser,$client]);
        Permission::create(['name' => 'application.showByRole'])->syncRoles([$manager,$adviser,$client]);

        Permission::create(['name' => 'credit.index'])->syncRoles([$manager,$adviser,$client]);
    }
}
