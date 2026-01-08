<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Users;
use App\Models\Pemohon;
use Illuminate\Support\Facades\Hash;

class PemohonController extends Controller
{
	public function show()
	{
		return Inertia::render('pemohon/index');
	}
	public function get_data(Request $request)
	{
        // Model Eloquent
		$model = Users::class;

        // Query awal (Eloquent)
		$query = $model::query();
		$query->select("users.id","name","phone","email","instansi","alamat");
		$query->join("pemohon","pemohon.user_id","=","users.id");
		$query->where("role",1);

        // Total data sebelum search
		$recordsTotal = $model::join("pemohon","pemohon.user_id","=","users.id")->where("role",1)->count();

        // Handle search
		if ($search = $request->input('search.value')) {
			$query->where(function ($q) use ($search) {
				$q->where('name', 'like', "%{$search}%")
				->orWhere('phone', 'like', "%{$search}%")
				->orWhere('email', 'like', "%{$search}%")
				->orWhere('alamat', 'like', "%{$search}%")
				->orWhere('instansi', 'like', "%{$search}%");
			});
		}

        // Total data setelah search
		$recordsFiltered = $query->count();

        // Ordering
		$orderColIndex = $request->input('order.0.column', 0);
		$orderColName  = $request->input("columns.$orderColIndex.data", 'name');
		$orderDir      = $request->input('order.0.dir', 'asc');

		$query->orderBy($orderColName, $orderDir);

        // Paging
		$start  = $request->input('start', 0);
		$length = $request->input('length', 10);

		$data = $query->skip($start)->take($length)->get();

		return response()->json([
			'draw'            => intval($request->input('draw')),
			'recordsTotal'    => $recordsTotal,
			'recordsFiltered' => $recordsFiltered,
			'data'            => $data,
		]);
	}
	public function add(): Response
	{
		return Inertia::render('pemohon/add');
	}
	public function store(ProfileUpdateRequest $request): RedirectResponse
	{
		$data			= new Users;
		$data->role		= 1;
		$data->timja	= 0;
		$data->name		= $request->name;
		$data->password	= Hash::make($request->password);
		$data->phone	= $request->phone;
		$data->email	= $request->email;
		$save 			= $data->save();

		if ($save) {
			$pemohon			= new Pemohon;
			$pemohon->user_id	= $data->id;
			$pemohon->instansi	= $request->instansi;
			$pemohon->alamat	= $request->alamat;
			$pemohon->save();
		}

		return to_route('pemohon.show');
	}
	public function edit($id): Response
	{
		$data   = Users::with("pemohon")->find($id);
		return Inertia::render('pemohon/edit',compact("data"));
	}
	public function update(ProfileUpdateRequest $request,$id): RedirectResponse
	{
		$data 			= Users::find($id);
		$data->name     = $request->name;
		$data->phone	= $request->phone;
		$data->email    = $request->email;
		$data->save();

		$pemohon			= Pemohon::where("user_id",$id)->first();
		$pemohon->instansi	= $request->instansi;
		$pemohon->alamat	= $request->alamat;
		$pemohon->save();

		return to_route('pemohon.update',["id" => $id]);
	}
	public function destroy(Request $request,$id)
	{
		$data = Users::find($id);
		$data->delete();
        // return to_route('users.show');
		return response()->json([
			'status' => true
		]);
	}
}
