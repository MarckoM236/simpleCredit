<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('credit_applications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->decimal('credit_value',12,2);
            $table->integer('dues');
            $table->string('description')->nullable();
            $table->enum('status',['filed','rejected','pending_approval','cancelled','approved'])->default('filed');
            $table->unsignedBigInteger('credit_type_id');
            $table->string('advisor_observations')->nullable();
            $table->timestamps();

            //relaciones
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('credit_type_id')->references('id')->on('credit_type');
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_applications');
    }
};
