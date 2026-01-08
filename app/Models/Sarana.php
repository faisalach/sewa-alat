<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Sarana extends Model
{
    use SoftDeletes;
    public $table  = "sarana";
    public function permohonanSarana(): HasOne
    {
        return $this->hasOne(PermohonanSarana::class,"sarana_id");
    }
}
