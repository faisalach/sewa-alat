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
        Schema::create('permohonan_history', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('permohonan_id');
            $table->foreign('permohonan_id')->references('id')->on('permohonan')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->integer("status");
            $table->string("keterangan");
            $table->unsignedBigInteger('actor_id');
            $table->foreign('actor_id')->references('id')->on('users')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->integer("actor_role");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permohonan_history');
    }
};
