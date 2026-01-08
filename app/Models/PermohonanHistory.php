<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class PermohonanHistory extends Model
{
    use SoftDeletes;
    public $table  = "permohonan_history";
    
    protected $appends = ['actor_role_name','status_text'];
    public function getActorRoleNameAttribute()
    {
        return format_name_role($this->actor_role);
    }
    public function getStatusTextAttribute()
    {
        return format_name_status_permohonan($this->status);
    }

    public function permohonan(): BelongsTo
    {
        return $this->belongsTo(Permohonan::class, 'permohonan_id');
    }
    public function actor(): BelongsTo
    {
        return $this->belongsTo(Users::class, 'actor_id');
    }
}
