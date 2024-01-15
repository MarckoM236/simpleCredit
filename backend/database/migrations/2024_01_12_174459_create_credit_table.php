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
        Schema::create('credit', function (Blueprint $table) {
            $table->id();
            $table->string('account_number', 10)->unique();
            $table->decimal('credit_value',12,2);
            $table->integer('dues');
            $table->decimal('due_value',12,2);
            $table->unsignedBigInteger('client_id');
            $table->date('approval_date');
            $table->unsignedBigInteger('approver_id');
            $table->unsignedBigInteger('credit_type_id');
            $table->timestamps();

            //relaciones
            $table->foreign('client_id')->references('id')->on('users');
            $table->foreign('approver_id')->references('id')->on('users');
            $table->foreign('credit_type_id')->references('id')->on('credit_type');
        });
    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit');
    }
};
