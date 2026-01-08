<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Verifikasi extends Model
{
    use SoftDeletes;
    public $table  = "verifikasi";
    public function permohonan(): BelongsTo
    {
        return $this->belongsTo(Permohonan::class, 'permohonan_id');
    }
    public function verifikator(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'permohonan_id');
    }
}
