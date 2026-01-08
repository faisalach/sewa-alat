<?php

namespace App\Http\Controllers;

use App\Http\Requests\Settings\ProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Users;
use Illuminate\Support\Facades\Hash;

class UsersController extends Controller
{
	public function show()
	{
		return Inertia::render('users/index');
	}
	public function get_data(Request $request)
	{
        // Model Eloquent
		$model = Users::class;

        // Query awal (Eloquent)
		$query = $model::query();
		$query->select("users.id","name","phone","email","timja");
		$query->where("role",2);

        // Total data sebelum search
		$recordsTotal = $model::where("role",2)->count();

        // Handle search
		if ($search = $request->input('search.value')) {
			$query->where(function ($q) use ($search) {
				$q->where('name', 'like', "%{$search}%")
				->orWhere('phone', 'like', "%{$search}%")
				->orWhere('email', 'like', "%{$search}%")
				->orWhere('timja', 'like', "%{$search}%");
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

		foreach ($data as $row) {
			$row->timja = format_name_timja($row->timja);
		}

		return response()->json([
			'draw'            => intval($request->input('draw')),
			'recordsTotal'    => $recordsTotal,
			'recordsFiltered' => $recordsFiltered,
			'data'            => $data,
		]);
	}
	public function add(): Response
	{
		$timja_arr 	= timja();
		return Inertia::render('users/add',compact("timja_arr"));
	}
	public function store(ProfileUpdateRequest $request): RedirectResponse
	{
		$data			= new Users;
		$data->role		= 2;
		$data->timja	= $request->timja;
		$data->name		= $request->name;
		$data->password	= Hash::make($request->password);
		$data->phone	= $request->phone;
		$data->email	= $request->email;
		$save 			= $data->save();

		return to_route('users.show');
	}
	public function edit($id): Response
	{
		$data   = Users::find($id);
		$timja_arr 	= timja();
		return Inertia::render('users/edit',compact("data","timja_arr"));
	}
	public function update(ProfileUpdateRequest $request,$id): RedirectResponse
	{
		$data 			= Users::find($id);
		$data->name     = $request->name;
		$data->phone	= $request->phone;
		$data->email    = $request->email;
		$data->timja	= $request->timja;
		$data->save();

		return to_route('users.update',["id" => $id]);
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
