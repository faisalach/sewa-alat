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
        Schema::create('permohonan', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('pemohon_id');
            $table->foreign('pemohon_id')->references('id')->on('pemohon')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->datetime("tanggal_permohonan");
            $table->datetime("tanggal_awal_penggunaan");
            $table->datetime("tanggal_akhir_penggunaan");
            $table->integer("status");
            $table->integer("total_tarif");
            $table->string("catatan");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permohonan');
    }
};
