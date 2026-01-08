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
        Schema::create('permohonan_sarana', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('permohonan_id');
            $table->foreign('permohonan_id')->references('id')->on('permohonan')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->unsignedBigInteger('sarana_id');
            $table->foreign('sarana_id')->references('id')->on('sarana')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->integer("jumlah_sarana");
            $table->integer("durasi");
            $table->integer("tarif_satuan");
            $table->integer("subtotal");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permohonan_sarana');
    }
};
