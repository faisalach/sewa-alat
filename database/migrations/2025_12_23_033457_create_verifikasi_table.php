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
        Schema::create('verifikasi', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('permohonan_id');
            $table->foreign('permohonan_id')->references('id')->on('permohonan')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->unsignedBigInteger('verifikator_id');
            $table->foreign('verifikator_id')->references('id')->on('users')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->integer("status_verifikasi");
            $table->string("catatan")->nullable();
            $table->datetime("tanggal_verifikasi")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('verifikasi');
    }
};
