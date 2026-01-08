<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Users extends Model
{
    use SoftDeletes;
    public function pemohon(): HasOne
    {
        return $this->hasOne(Pemohon::class,"user_id");
    }
    public function verifikator(): HasMany
    {
        return $this->hasMany(Verfiikasi::class,"verifikator_id");
    }
    public function dokumen_access_log(): HasMany
    {
        return $this->hasMany(DokumenAccessLog::class,"user_id");
    }
    public function permohonanHistory(): HasMany
    {
        return $this->hasMany(PermohonanHistory::class,"actor_id");
    }
}
