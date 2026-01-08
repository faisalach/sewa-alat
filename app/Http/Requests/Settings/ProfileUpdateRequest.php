<?php

namespace App\Http\Requests\Settings;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user_id = !empty($this->route('id')) ? $this->route('id') : $this->user()->id;
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($user_id),
            ],
            'phone' => [
                'required',
                'string',
                'digits_between:10,13',
                Rule::unique(User::class)->ignore($user_id)
            ],
        ];

        if (auth()->user()->id == 1) {
            $rules["instansi"]  = ['required', 'string', 'max:255'];
            $rules["alamat"]  = ['required', 'string', 'max:255'];
        }
        if (auth()->user()->id == 2) {
            $rules["timja"]  = ['required'];
        }

        return $rules;
    }
}
