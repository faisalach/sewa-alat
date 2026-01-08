<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PermohonanRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'tanggal_awal_penggunaan' => ['required', 'date', 'before_or_equal:tanggal_akhir_penggunaan', 'after_or_equal:today'],
            'tanggal_akhir_penggunaan' => ['required', 'date','after_or_equal:tanggal_awal_penggunaan'],
            'grandTotal' => ['required','numeric','min:1000'],
            'jumlah_sarana' => ['required','array'],
            'durasi' => ['required','array'],
            'jumlah_sarana.*' => ['required','min:1','numeric'],
            'durasi.*' => ['required','min:1','numeric'],
            'file_permohonan' => ['required_without:has_file_permohonan', 'file','mimes:pdf'],
            'surat_pernyataan' => ['required_without:has_surat_pernyataan', 'file','mimes:pdf'],
        ];
    }
}
