<?php

use App\Http\Controllers\PemohonController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','role:3'])->group(function () {
    Route::redirect('pemohon', '/pemohon');

    Route::get('pemohon', [PemohonController::class, 'show'])->name('pemohon.show');
    Route::get('pemohon/get_data', [PemohonController::class, 'get_data'])->name('pemohon.getData');
    Route::get('pemohon/add', [PemohonController::class, 'add'])->name('pemohon.add');
    Route::post('pemohon/add', [PemohonController::class, 'store'])->name('pemohon.store');
    Route::get('pemohon/{id}/update', [PemohonController::class, 'edit'])->name('pemohon.edit');
    Route::patch('pemohon/{id}/update', [PemohonController::class, 'update'])->name('pemohon.update');
    Route::delete('pemohon/{id}/destroy', [PemohonController::class, 'destroy'])->name('pemohon.destroy');
});
