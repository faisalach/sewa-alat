<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DokumenAccessLog extends Model
{
    use SoftDeletes;
    public $table  = "dokumen_access_log";
    public function user(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'user_id');
    }
    public function DokumenPermohonan(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'dokumen_id');
    }
}
