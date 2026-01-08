<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaranaRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama_sarana' => ['required', 'string', 'max:25'],
            'satuan_tarif' => ['required'],
            'tarif_pnbp' => ['required', 'numeric'],
            'status_ketersediaan' => ['required'],
            'jumlah_sarana' => ['required', 'numeric'],
        ];
    }
}
