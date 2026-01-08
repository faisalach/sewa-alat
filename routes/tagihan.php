<?php
use App\Http\Controllers\TagihanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
	Route::redirect('tagihan', '/tagihan');
	Route::get('tagihan', [TagihanController::class, 'show'])->name('tagihan.show');
	Route::get('tagihan/get_data', [TagihanController::class, 'get_data'])->name('tagihan.getData');
	Route::middleware(['role:2,3'])->group(function () {
		Route::post('tagihan/{permohonan_id}/add', [TagihanController::class, 'store'])->name('tagihan.store');
		Route::post('tagihan/{id}/verifikasi', [TagihanController::class, 'verifikasi'])->name('tagihan.verifikasi');

		Route::get('tagihan/{id}/edit', [TagihanController::class, 'edit'])->name('tagihan.edit');
		Route::post('tagihan/{id}/update', [TagihanController::class, 'update'])->name('tagihan.update');
	});
	Route::middleware(['role:1'])->group(function () {
		Route::post('tagihan/{id}/upload_bukti_pembayaran', [TagihanController::class, 'upload_bukti_pembayaran'])->name('tagihan.upload_bukti_pembayaran');
	});
});


