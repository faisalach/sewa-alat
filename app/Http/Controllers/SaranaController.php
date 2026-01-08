<?php

namespace App\Http\Controllers;

use App\Http\Requests\SaranaRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Sarana;
use Illuminate\Support\Facades\Hash;

class SaranaController extends Controller

{
	public function show()
	{
		return Inertia::render('sarana/index');
	}
	public function get_data(Request $request)
	{
        // Model Eloquent
		$model = Sarana::class;

        // Query awal (Eloquent)
		$query = $model::query();
		$query->select("id","nama_sarana","satuan_tarif","tarif_pnbp","status_ketersediaan","jumlah_sarana");

        // Total data sebelum search
		$recordsTotal = $model::count();

        // Handle search
		if ($search = $request->input('search.value')) {
			$query->where(function ($q) use ($search) {
				$q->where('nama_sarana', 'like', "%{$search}%")
				->orWhere('satuan_tarif', 'like', "%{$search}%")
				->orWhere('tarif_pnbp', 'like', "%{$search}%")
				->orWhere('status_ketersediaan', 'like', "%{$search}%")
				->orWhere('jumlah_sarana', 'like', "%{$search}%");
			});
		}

        // Total data setelah search
		$recordsFiltered = $query->count();

        // Ordering
		$orderColIndex = $request->input('order.0.column', 0);
		$orderColName  = $request->input("columns.$orderColIndex.data", 'nama_sarana');
		$orderDir      = $request->input('order.0.dir', 'asc');

		$query->orderBy($orderColName, $orderDir);

        // Paging
		$start  = $request->input('start', 0);
		$length = $request->input('length', 10);

		$data = $query->skip($start)->take($length)->get();

		foreach ($data as $row) {
			$row->tarif_pnbp = format_rupiah($row->tarif_pnbp);
			$row->satuan_tarif = format_name_satuan_tarif($row->satuan_tarif);
			$row->status_ketersediaan = format_name_status_ketersediaan_sarana($row->status_ketersediaan);
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
		$satuan_tarif_arr 					= satuan_tarif();
		$status_ketersediaan_sarana_arr 	= status_ketersediaan_sarana();
		return Inertia::render('sarana/add',compact("satuan_tarif_arr","status_ketersediaan_sarana_arr"));
	}
	public function store(SaranaRequest $request): RedirectResponse
	{
		$sarana							= new Sarana;
		$sarana->nama_sarana			= $request->nama_sarana;
		$sarana->satuan_tarif			= $request->satuan_tarif;
		$sarana->tarif_pnbp				= $request->tarif_pnbp;
		$sarana->status_ketersediaan	= $request->status_ketersediaan;
		$sarana->jumlah_sarana			= $request->jumlah_sarana;
		$sarana->save();

		return to_route('sarana.show');
	}
	public function edit($id): Response
	{
		$data   							= Sarana::find($id);
		$satuan_tarif_arr 					= satuan_tarif();
		$status_ketersediaan_sarana_arr 	= status_ketersediaan_sarana();
		return Inertia::render('sarana/edit',compact("data","satuan_tarif_arr","status_ketersediaan_sarana_arr"));
	}
	public function update(SaranaRequest $request,$id): RedirectResponse
	{
		$sarana 						= Sarana::find($id);
		$sarana->nama_sarana			= $request->nama_sarana;
		$sarana->satuan_tarif			= $request->satuan_tarif;
		$sarana->tarif_pnbp				= $request->tarif_pnbp;
		$sarana->status_ketersediaan	= $request->status_ketersediaan;
		$sarana->jumlah_sarana			= $request->jumlah_sarana;
		$sarana->save();

		return to_route('sarana.update',["id" => $id]);
	}
	public function destroy(Request $request,$id)
	{
		$data = Sarana::find($id);
		$data->delete();
        // return to_route('sarana.show');
		return response()->json([
			'status' => true
		]);
	}
}
