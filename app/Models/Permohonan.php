<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Permohonan extends Model
{
    use SoftDeletes;
    public $table   = "permohonan";
    public function permohonanHistory(): HasMany
    {
        return $this->hasMany(PermohonanHistory::class,"permohonan_id");
    }
    public function permohonanSarana(): HasMany
    {
        return $this->hasMany(PermohonanSarana::class,"permohonan_id");
    }
    public function verifikasi(): HasOne
    {
        return $this->hasOne(Verifikasi::class,"permohonan_id");
    }
    public function tagihan(): HasOne
    {
        return $this->hasOne(Tagihan::class,"permohonan_id");
    }
    public function dokumenPermohonan(): HasMany
    {
        return $this->hasMany(DokumenPermohonan::class,"permohonan_id");
    }
    public function pemohon(): BelongsTo
    {
        return $this->belongsTo(Pemohon::class, 'pemohon_id');
    }
}
