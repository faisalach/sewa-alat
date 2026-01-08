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
        Schema::create('tagihan_pnbp', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('permohonan_id');
            $table->foreign('permohonan_id')->references('id')->on('permohonan')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->string("nomor_billing");
            $table->integer("nominal");
            $table->datetime("tanggal_terbit");
            $table->datetime("tanggal_kadaluarsa");
            $table->integer("status_bayar");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tagihan_pnbp');
    }
};
