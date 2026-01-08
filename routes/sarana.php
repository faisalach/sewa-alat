<?php

use App\Http\Controllers\SaranaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth','role:3'])->group(function () {
    Route::redirect('sarana', '/sarana');

    Route::get('sarana', [SaranaController::class, 'show'])->name('sarana.show');
    Route::get('sarana/get_data', [SaranaController::class, 'get_data'])->name('sarana.getData');
    Route::get('sarana/add', [SaranaController::class, 'add'])->name('sarana.add');
    Route::post('sarana/add', [SaranaController::class, 'store'])->name('sarana.store');
    Route::get('sarana/{id}/update', [SaranaController::class, 'edit'])->name('sarana.edit');
    Route::patch('sarana/{id}/update', [SaranaController::class, 'update'])->name('sarana.update');
    Route::delete('sarana/{id}/destroy', [SaranaController::class, 'destroy'])->name('sarana.destroy');
});

