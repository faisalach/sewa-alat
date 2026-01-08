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
        Schema::create('dokumen_permohonan', function (Blueprint $table) {
            $table->bigIncrements("id");
            $table->unsignedBigInteger('permohonan_id');
            $table->foreign('permohonan_id')->references('id')->on('permohonan')
            ->cascadeOnDelete()
            ->cascadeOnUpdate();
            $table->integer("jenis_dokumen");
            $table->string("file_path");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokumen_permohonan');
    }
};
