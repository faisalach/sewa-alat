<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class DokumenPermohonan extends Model
{
    use SoftDeletes;
    public $table  = "dokumen_permohonan";
    public function permohonan(): BelongsTo
    {
        return $this->belongsTo(Permohonan::class, 'permohonan_id');
    }
    public function dokumenAccessLog(): HasMany
    {
        return $this->hasMany(DokumenAccessLog::class,"dokumen_id");
    }
}
