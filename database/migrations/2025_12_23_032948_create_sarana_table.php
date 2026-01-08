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
        Schema::create('sarana', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->string("nama_sarana");
            $table->string("satuan_tarif");
            $table->integer("tarif_pnbp");
            $table->integer("status_ketersediaan");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sarana');
    }
};
