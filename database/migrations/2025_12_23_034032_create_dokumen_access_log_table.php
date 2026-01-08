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
        Schema::create('dokumen_access_log', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->unsignedBigInteger('dokumen_id');
            $table->foreign('dokumen_id')->references('id')->on('dokumen_permohonan')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->integer("action");
            $table->string("ip_address");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_access_log');
    }
};
