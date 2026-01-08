<?php
use App\Http\Controllers\PermohonanController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
	Route::redirect('permohonan', '/permohonan');
	Route::get('permohonan', [PermohonanController::class, 'show'])->name('permohonan.show');
	Route::get('permohonan/get_data', [PermohonanController::class, 'get_data'])->name('permohonan.getData');
	Route::middleware(['role:1'])->group(function () {
		Route::get('permohonan/add', [PermohonanController::class, 'add'])->name('permohonan.add');
		Route::post('permohonan/add', [PermohonanController::class, 'store'])->name('permohonan.store');
		Route::get('permohonan/{id}/update', [PermohonanController::class, 'edit'])->name('permohonan.edit');
		Route::patch('permohonan/{id}/update', [PermohonanController::class, 'update'])->name('permohonan.update');
		Route::delete('permohonan/{id}/destroy', [PermohonanController::class, 'destroy'])->name('permohonan.destroy');
	});
	Route::middleware(['role:2,3'])->group(function () {
		Route::get('permohonan/prioritas', [PermohonanController::class, 'prioritas'])->name('permohonan.prioritas');
		
		Route::post('permohonan/{id}/update_verifikasi', [PermohonanController::class, 'update_verifikasi'])->name('permohonan.update_verifikasi');
		Route::post('permohonan/{id}/update_selesai', [PermohonanController::class, 'update_selesai'])->name('permohonan.update_selesai');
	});

	Route::post('permohonan/{dokumen_id}/document_access_log', [PermohonanController::class, 'document_access_log'])->name('permohonan.document_access_log');
	Route::get('/preview/{path}', [PermohonanController::class, 'preview_dokumen'])
	->where('path', '.*')
	->name('dokumen.preview');
	Route::get('permohonan/{id}', [PermohonanController::class, 'detail'])->name('permohonan.detail');
});


