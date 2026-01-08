<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    /*return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);*/
    return redirect("/login");
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class,"dashboard"])->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/sarana.php';
require __DIR__.'/permohonan.php';
require __DIR__.'/pemohon.php';
require __DIR__.'/tagihan.php';
require __DIR__.'/users.php';
