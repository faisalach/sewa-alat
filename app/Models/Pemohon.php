<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pemohon extends Model
{
	use SoftDeletes;
	public $table   = "pemohon";
	public function permohonan(): HasMany
	{
		return $this->hasMany(Permohonan::class,"pemohon_id");
	}
	public function user(): BelongsTo
	{
		return $this->belongsTo(User::class, 'user_id');
	}
	public function users(): BelongsTo
	{
		return $this->belongsTo(Users::class, 'user_id');
	}
}
